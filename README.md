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

## Automatic deployment to free-hosting.org

Every push to `main` runs `.github/workflows/deploy.yml`. The workflow validates the static site, collects only the public files in `dist/`, and uploads them to the hosting account over FTP. It can also be started manually from the repository's **Actions** tab.

In the GitHub repository, open **Settings > Secrets and variables > Actions** and add these repository secrets:

- `FTP_SERVER`: the FTP hostname shown in the hosting control panel; enter only the hostname, without `ftp://`
- `FTP_USERNAME`: the hosting account's FTP username
- `FTP_PASSWORD`: the hosting account's FTP password
- `FTP_SERVER_DIR`: the domain's document-root directory, including a trailing slash (commonly `/htdocs/` or `/public_html/`; use the exact directory shown by the control panel)

Do not commit the FTP credentials to this repository. The workflow exposes them only to the deployment action. The first deployment may take longer; later deployments synchronize only changed files. Files removed from the site source are also removed from the remote deployment directory, so `FTP_SERVER_DIR` must point only to this site's web root.

The workflow uses standard FTP because that is the service advertised by free-hosting.org. If the account's FTP settings explicitly support FTPS, change `protocol: ftp` to `protocol: ftps` in the workflow so credentials are encrypted in transit.

## Manual publishing

Upload all public files and folders, keeping paths unchanged, to a static hosting provider. Use HTTPS for the published website.

SEO metadata uses the production URL `https://devicecheck.yzz.me/`. If the site moves to another URL, replace that base URL in `.html`, `robots.txt`, and `sitemap.xml`. Canonical and social URLs must match the public production URL exactly.

Add your verified site to Google Search Console and submit `sitemap.xml`. Publish accurate contact details and update the privacy policy if adding analytics, advertising or other third-party code.

## Notes
- Camera/microphone require browser permissions; HTTPS or localhost is recommended.
- Most tests run in-browser. Network test downloads a 5 MB file from Cloudflare's speed endpoint. Endpoint availability / CORS support can change. The speed test measures download only, not upload or precise ping.
- Keyboards can send browser-intercepted or OS-intercepted events; keyboard visuals approximate standard layouts, not exact custom PCBs.
- Speaker/headphone output cannot be measured physically by browsers; user's hearing determines success.
- Google AdSense is loaded on the homepage and device-tool pages. Keep the privacy disclosure and any consent controls required for the site's audience up to date.
