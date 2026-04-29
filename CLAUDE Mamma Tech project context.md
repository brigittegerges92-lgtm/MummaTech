# MummaTech — Project Context

## What I'm Building
MummaTech is a mobile web app for new mums returning to work. They brain-dump everything on their mind and see it sorted into a calm, prioritised view with AI-powered reframes for worries they need to let go. There is also a Recovery Corner with postpartum exercises by birth type.

## Target User
First-time mums returning to work after maternity leave. Overwhelmed by mental load. Australian. 30s. Educated. Time-poor.

## Tech Stack
- Vanilla HTML, CSS, JavaScript (no frameworks)
- Single index.html file initially; can split into modules if needed
- Anthropic Claude API for Let Go reframes (one serverless function on Vercel)
- localStorage for name persistence and birth type selection
- Google Fonts: DM Serif Display + DM Sans
- Deployed on Vercel from a public GitHub repo

## Design System
- Background: #FFF8F0 (warm cream)
- Primary accent: #D4A574 (soft gold)
- Text primary: #3D3229 (warm charcoal — NEVER pure black)
- Text secondary: #8B7E74 (warm grey)
- Self-care nudge: #F0F5ED bg + #5A7052 text (sage)
- Border radius: 12px cards, 24px buttons, 8px inputs
- Box shadow: 0 2px 8px rgba(61, 50, 41, 0.06)
- Max width: 430px, mobile-first

## Typography
- Headings/hero: DM Serif Display 400
- Body/buttons: DM Sans 400 + 500
- Hero stat (71%): 56px serif
- Headings: 22px serif
- Body: 13px sans
- Small print: 10-11px sans

## Tone of Voice
Warm. Nurturing. Australian (use "Mumma" not "Mom"). Affirming without being patronising. Like a supportive friend, never clinical or corporate. Acknowledges difficulty without dwelling.

## Illustration Style
Minimal botanical line art. Single-weight continuous line drawings. Gold (#D4A574). 1.5px stroke. fill: none. stroke-linecap: round. Organic curves, never straight lines. Vary leaf size and angle slightly — no two identical.

## Hard Rules
- NEVER use pure black (#000000) anywhere — use #3D3229 instead
- NEVER use cool greys, blues, purples, or pinks
- NEVER use generic emoji where SVG illustrations should go
- NEVER use heavy shadows or harsh borders
- NEVER use Inter, Roboto, Arial, or other generic system fonts for headings
- ALL animations must respect @media (prefers-reduced-motion: no-preference)
- ALWAYS use semantic HTML (button for buttons, not div)
- ALWAYS include aria-labels on interactive elements

## App Structure
- Screen 1: Landing page with name capture and 71% hero stat
- Screen 2: Brain dump text area with live thought counter
- Screen 3: Calm View with sorted categories, AI reframes, priorities, self-care nudge
- Screen 4: Recovery Corner with postpartum exercises by birth type (vaginal/C-section)
- Bottom nav: 4 tabs (Home, Brain dump, Calm view, Recovery)

## Build Window Compliance
Build window opens 25 April 2026 at 5:00 AM AEST (24 April 3:00 PM EST). All code generation begins after this point. Pre-build planning, this CLAUDE.md file, account creation, and tool installation are allowed beforehand per official Build-A-Thon rules.

## Communication Style
- Always show test checkpoint output after each prompt
- If something breaks, fix it before adding new features
- Speak to me like a beginner who is also smart — explain what you're doing and why, but don't condescend.

## Goal
Win the Women Build AI Build-A-Thon 2026 in the Solo + First Timer track.
