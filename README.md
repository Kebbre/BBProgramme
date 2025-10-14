Architecture Project Planner — Microsoft Teams packaging

What I changed for Teams
- Updated `manifest.json` with a personal static tab entry pointing at `index.html`. You must replace the `{HOSTNAME}` placeholder with your HTTPS host (see below).
- Added placeholder icon files `color.png` (192x192) and `outline.png` (32x32). Replace these with proper PNG icons before packaging.

Quick checklist before packaging
1. Host `index.html` and the project files on an HTTPS host (Teams requires HTTPS). Examples: a public web host, a small Node/Python server exposed via ngrok, or a static hosting service (GitHub Pages, Netlify, Vercel).
2. Replace `{HOSTNAME}` in `manifest.json` with your host's domain (for local testing with ngrok use the generated ngrok hostname, e.g. `abc123.ngrok.io`).
3. Ensure `manifest.json`, `color.png`, and `outline.png` exist at the ZIP root when packaging.
4. Validate the manifest with Microsoft Developer Portal or the schema: https://learn.microsoft.com/microsoftteams/platform/

Local testing (quick)
If you just want to run locally for development (not directly usable by Teams unless you expose it over HTTPS):

- Serve locally on port 8080 (Python 3):

```bash
# from project root
python3 -m http.server 8080
```

- Or use a simple Node static server (if you have npm):

```bash
npm install --global http-server
http-server -p 8080
```

Expose to the internet using ngrok (recommended for quick Teams testing):

```bash
# install ngrok separately from https://ngrok.com
ngrok http 8080
# ngrok will print an https://... hostname which you should copy
```

Update the manifest
- Open `manifest.json` and replace every occurrence of `{HOSTNAME}` with your HTTPS host. Example:

```json
"contentUrl": "https://abc123.ngrok.io/index.html",
"websiteUrl": "https://abc123.ngrok.io/index.html",
"validDomains": ["abc123.ngrok.io", "localhost"]
```

Package the Teams app
1. From the project root create a ZIP that contains these three files at the root:
   - `manifest.json`
   - `color.png`
   - `outline.png`

Example (macOS / zsh):

```bash
# make sure manifest.json is updated and icons are present
cd /Users/a.pescher/Desktop/ARTHUR/Innovation/Developper/Planner Teams
zip -r architecture-planner-teams.zip manifest.json color.png outline.png
```

2. Go to the Microsoft Teams Developer Portal (https://aka.ms/teamsdevportal) -> Apps -> Manage apps -> Upload a custom app (or open your organization's App Catalog) and upload the ZIP file.

Notes and gotchas
- Teams tabs must be served over HTTPS and the manifest's `validDomains` must include the host domain.
- The app in `manifest.json` is configured as a personal (static) tab. If you want a team or channel tab, change `scopes` to include `team` and supply a `supportedPlatform` or `context` changes and update `contentUrl` handling.
- If your app needs authentication, you'll need to add OAuth configuration, `webApplicationInfo` in the manifest, and implement the OAuth flow.

Next steps I can do for you
- Replace `{HOSTNAME}` in `manifest.json` with a domain you give me (or an ngrok URL) and create the ZIP package for upload.
- Generate simple icons (placeholder PNGs) if you want me to create minimal ones now.
- Convert the app into a Teams tab with an embedded Teams SDK experience (message extension, auth etc.).

If you want me to proceed with any of the next steps, tell me which hostname to use (or say "use ngrok" and I'll create a ZIP with a README and help you run ngrok locally).