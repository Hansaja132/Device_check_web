# DeviceCheck — Standalone multi-page static website

## Structure
- `index.html`: homepage
- `camera.html`, `microphone.html`, `speakers.html`, `headphones.html`, `keyboard.html`, `mouse.html`, `screen.html`, `internet.html`: individual tools
- `privacy.html`: privacy information
- `css/style.css`: shared styling
- `js/common.js`: shared navigation/theme code
- `js/camera.js`, `microphone.js`, `audio.js`, `keyboard.js`, `mouse.js`, `screen.js`, `internet.js`: separate tool modules. Speaker and headphone pages share `audio.js`.
- `assets/favicon.png`: browser favicon
- `assets/logo.png`: responsive header wordmark
- `site.webmanifest`: install and browser metadata
- `robots.txt`, `sitemap.xml`: crawling helpers

## Launch locally
In this folder run `python -m http.server 8000`, then visit `http://localhost:8000`.

## Publish
Upload ALL the files and folders, keeping paths unchanged, to a static hosting provider such as Cloudflare Pages, Netlify, or GitHub Pages. Use HTTPS.

SEO metadata currently uses the GitHub Pages URL inferred from this repository: `https://hansaja132.github.io/Device_check_web/`. If the site is deployed at another URL or a custom domain, replace that base URL in `.html`, `robots.txt`, and `sitemap.xml` before launch. Canonical and social URLs must match the public production URL exactly.

Add your verified site to Google Search Console and submit `sitemap.xml`. Publish accurate contact details and update the privacy policy if adding analytics, advertising or other third-party code.

## Notes
- Camera/microphone require browser permissions; HTTPS or localhost is recommended.
- Most tests run in-browser. Network test downloads a 5 MB file from Cloudflare's speed endpoint. Endpoint availability / CORS support can change. The speed test measures download only, not upload or precise ping.
- Keyboards can send browser-intercepted or OS-intercepted events; keyboard visuals approximate standard layouts, not exact custom PCBs.
- Speaker/headphone output cannot be measured physically by browsers; user's hearing determines success.
- No third-party trackers, ads, or analytics are included.
