# DissOLinK's // DISSOVERSE Neural Network

> Sovereign Deep Link Generator. Break the walled garden.

![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)
![Hosted: GitHub Pages](https://img.shields.io/badge/Hosted-GitHub%20Pages-black.svg)
![Backend: None](https://img.shields.io/badge/Backend-None-red.svg)
![Logs: Zero](https://img.shields.io/badge/Logs-Zero-brightgreen.svg)

## What Is This?

**DissOLinK's** is a static, serverless deep link generator that forces URLs out of social media in-app browsers (Instagram, TikTok, Facebook, Twitter, Snapchat, LinkedIn) and into the user's native OS browser (Safari/Chrome).

Social media apps trap users inside walled-garden webviews. DissOLinK's breaks the cage.

## How It Works

1. **DETECT** -- User-agent sniffing identifies the in-app browser on contact
2. **BYPASS** -- Platform-specific escape techniques deploy automatically:
   - **Android**: Intent URI scheme (`intent://...#Intent;scheme=https;end`)
   - **iOS**: Safari force-open via `window.open` and location assignment
   - **Universal**: Direct redirect fallback with manual escape instructions
3. **DELIVER** -- Destination loads in the native browser. No tracking. No middleman.

## Detected In-App Browsers

| Platform   | Detection Pattern                        |
|------------|------------------------------------------|
| Instagram  | `Instagram` in UA                        |
| TikTok     | `musical_ly`, `BytedanceWebview`, `TikTok` |
| Facebook   | `FBAN`, `FBAV`, `FB_IAB`                |
| Twitter/X  | `Twitter` in UA                          |
| Snapchat   | `Snapchat` in UA                         |
| LinkedIn   | `LinkedInApp` in UA                      |
| Pinterest  | `Pinterest` in UA                        |
| LINE       | `Line` in UA                             |
| WeChat     | `MicroMessenger` in UA                   |

## Architecture

```
DissOLinK's
|
|-- index.html          # Complete application (single file, zero deps)
|-- README.md           # This file
|-- LICENSE             # MIT License
|
|-- Generated Output:
    |-- dissolink-escape.html   # Standalone escape page (downloaded per-link)
```

**Zero backend. Zero database. Zero server fees. Zero logs.**

All link data is encoded client-side via Base64 and embedded directly in the output HTML. Nothing is transmitted anywhere.

## Tech Stack

- **Vanilla JavaScript** -- No frameworks, no build step, no node_modules
- **Tailwind CSS (CDN)** -- Lightweight utility styling, fully portable
- **Base64 Encoding** -- Link data lives in the URL/file itself
- **Static HTML** -- Deployable to any free host on earth

## Deployment

### GitHub Pages (Recommended)

1. Fork or clone this repository
2. Go to **Settings > Pages**
3. Set source to `main` branch, root directory
4. Your generator lives at `https://yourusername.github.io/dissolinks/`

### Any Static Host

Upload `index.html` to: Vercel, Netlify, Cloudflare Pages, Surge, a Raspberry Pi, a USB drive -- anywhere that serves HTML.

### Custom Domain

1. Add a `CNAME` file with your domain (e.g., `links.dissoverse.com`)
2. Configure DNS to point to GitHub Pages
3. Enable HTTPS in repository settings

## Usage

1. Open the generator
2. Clear the age gate
3. Paste your destination URL
4. (Optional) Add a label for the escape page
5. Select bypass mode or leave on AUTO-DETECT
6. Click GENERATE
7. Either:
   - **Copy** the data URI for instant testing
   - **Export** the standalone HTML file
   - **Preview** the escape page in a new tab

### For Production Use

Export the generated HTML file and host it at a stable URL. Share *that* URL on social media. When users tap it inside Instagram/TikTok/etc., the escape logic fires automatically.

## Bypass Modes

| Mode       | Behavior                                              |
|------------|-------------------------------------------------------|
| AUTO-DETECT| Detects OS and IAB, selects best escape method        |
| ANDROID INTENT | Forces Android Intent URI scheme                 |
| SAFARI FORCE | Targets iOS Safari-specific window.open techniques |
| UNIVERSAL  | Direct redirect, works everywhere                     |

## Design Language

- **Aesthetic**: 1996 Cypherpunk / early Matrix / BBS terminal
- **Colors**: Lime-green (#00ff41) on deep black (#0a0a0a)
- **Typography**: Share Tech Mono + VT323 (monospaced terminal fonts)
- **Effects**: CRT scanlines, matrix rain, terminal boot sequences
- **UI**: Glassmorphic panels with neon borders

## Privacy

- No cookies
- No analytics
- No server-side processing
- No data collection
- No external API calls
- Everything executes in the browser, on the user's device

## License

MIT License. Do whatever you want with it.

## Credits

Built by **DISSOVERSE** // 2026

---

*ZERO LOGS // ZERO FEES // ZERO COMPROMISE*
