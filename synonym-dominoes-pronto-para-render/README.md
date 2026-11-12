# Synonym Dominoes: Actions & Reuse

Multiplayer synonym dominoes game. Players open the same public URL on a phone or computer and join with a nickname.

## Deploy on Render (GitHub)

1. Create a **public or private** GitHub repository (for example, `synonym-dominoes`).
2. Upload the contents of this folder to the repository root. `package.json`, `server.js`, `render.yaml`, and `public/` must be at the root.
3. In Render, choose **New + → Blueprint** and connect the GitHub repository.
4. Render reads `render.yaml`; review and create the service.
5. When deployment finishes, open the `onrender.com` URL and share it with players.

If you prefer a manual Web Service instead of Blueprint:
- Build Command: `npm install`
- Start Command: `npm start`
- Runtime: Node
- Plan: Free

## Important notes

- The server uses WebSockets and automatically switches to `wss://` when the page is served over HTTPS.
- The free Render service may sleep when idle. The first visit after inactivity can take a little while; open the game before your class presentation.
- This project stores lobby/game/ranking data in a local `data.json` file. Render's free filesystem is ephemeral, so data may reset after a restart or redeploy. This is suitable for a classroom activity, but persistent rankings require a database or persistent disk.
- No player account is required; use a nickname.
