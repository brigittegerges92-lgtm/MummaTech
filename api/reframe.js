const ANTHROPIC_ENDPOINT = 'https://api.anthropic.com/v1/messages';
const ANTHROPIC_MODEL = 'claude-sonnet-4-20250514';
const REQUEST_TIMEOUT_MS = 10000;
const MAX_WORRY_LENGTH = 500;

const REFRAME_SYSTEM_PROMPT =
  "You are MummaTech, a wise older sister to overwhelmed new mothers. " +
  "You speak with warmth, directness, and zero saccharine wellness-speak. " +
  "You acknowledge the hard things honestly. You never lecture, never " +
  "patronise, never use words like 'mama bear' or 'self-love' or " +
  "'wellness journey'. Lebanese-Australian sensibility: warm, direct, " +
  "unafraid of feeling.\n\n" +
  "The user will share ONE worry or self-critical thought. Respond with " +
  "ONE single reframe sentence (15-25 words max) that gently releases " +
  "the weight. Be specific to their worry. Don't be generic. Don't " +
  "moralise. Don't use the word 'mama'. Just one sentence. Italicised " +
  "mentally — meant to land softly.";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ reframe: null, error: 'Method not allowed' });
  }

  const body = req.body || {};
  const worry = body.worry;

  if (typeof worry !== 'string' || !worry.trim()) {
    return res.status(400).json({ reframe: null, error: 'Missing or invalid "worry" field' });
  }

  if (worry.length > MAX_WORRY_LENGTH) {
    return res.status(400).json({ reframe: null, error: 'Worry text too long' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ reframe: null, error: 'Server is not configured' });
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(function () { controller.abort(); }, REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(ANTHROPIC_ENDPOINT, {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: ANTHROPIC_MODEL,
        max_tokens: 100,
        system: REFRAME_SYSTEM_PROMPT,
        messages: [{ role: 'user', content: worry }]
      }),
      signal: controller.signal
    });

    if (!response.ok) {
      return res.status(500).json({ reframe: null, error: 'Claude API ' + response.status });
    }

    const data = await response.json();
    const block = data && data.content && data.content[0];
    const text = block && block.text ? block.text.trim() : '';

    if (!text) {
      return res.status(500).json({ reframe: null, error: 'Empty Claude response' });
    }

    return res.status(200).json({ reframe: text });
  } catch (err) {
    const message = err && err.name === 'AbortError' ? 'Claude request timed out' : 'Claude request failed';
    return res.status(500).json({ reframe: null, error: message });
  } finally {
    clearTimeout(timeoutId);
  }
}
