# Secret Chungus

Short, silly description
------------------------

Secret Chungus is a delightfully chaotic Secret Santa-style web toy where the star is The Big Chungus and everything from heartfelt (and wildly specific) wishlists to Morbius-themed jumpscares is on the menu. The project contains an admin page that generates a secret, base64-encoded link for each participant and a participant-facing page that reveals a lovingly absurd 'chungee' assignment, complete with story, avatar, slot-machine reveal, confetti, and cinematic drum-roll.

Why this repo exists (honest answer)
-----------------------------------

- Because someone wanted to combine Secret Santa, giant rabbits, weird micro-stories, slot machines, and slightly questionable taste in memes.
- Because the `PARTICIPANTS` list in `config.js` holds the whole personality buffet — messages, stories, avatars, and images for each person.
- Because the admin can generate per-person links (copy/paste and DM) via `admin.html` (see `admin.js`) and because the site loves dramatic reveals more than it loves security.

Quick features
--------------

- Admin page: `admin.html` — click "Sortear agora" to shuffle participants and produce one secret link per person.
- Participant page: `participant.html` — opens the secret link, shows the story, runs the slot-machine reveal, pops confetti, and may show a Morbius jumpscare if you press the wrong button.
- Config: `config.js` — edit the `PARTICIPANTS` array to add/remove people, change avatars, stories and wishlist links.
- Visuals: `style.css`, lots of images in `images/` (avatars, banners, balloons, chungus art, etc.).

Important developer notes (read this first)
-----------------------------------------

- Admin password: `admin.js` currently contains a literal `ADMIN_PASSWORD` set to `"chungus2024"`. It's used with a simple `prompt()` and `sessionStorage` gating on the admin view. Change it or remove it if you don't want that lying around.
- Link generation: admin creates a JSON payload like `{ giverId, receiverId }`, base64-encodes it, and appends it to `participant.html?data=...`. Do not use this for secrets — it's just a cute toy.
- Images: the README assumes the `images/` folder is present with the paths referenced from `config.js` and the HTML files.

How to run (local, simple)
--------------------------

Open the files directly in a browser (double-click `index.html` or `participant.html`/`admin.html`) for quickest testing. For a slightly more realistic local server (recommended), from the repo root run one of these in PowerShell:

```powershell
# with Python 3 (if installed)
python -m http.server 8000

# then open http://localhost:8000/admin.html in your browser
```

Or use any static file server you like (Node's `serve`, `http-server`, etc.).

How to use
----------

1. (Optional) Edit `config.js` to change participant names, messages, avatars, or story images.
2. Open `admin.html` in your browser.
3. If prompted, enter the admin password (default: `chungus2024`).
4. Click `Sortear agora`. A list of participant links will be generated. Copy each link and DM it to the corresponding person.
5. When recipients open their link, they go through the steps (confirm name, drum-roll, story, slot machine, reveal). Expect confetti and memes.

Security / privacy tips
-----------------------

- This is a party toy: secrets are client-side and links contain base64 payloads. Don't put real secrets (passwords, personal data, tokens) into `config.js`.
- Consider rotating/removing the hard-coded `ADMIN_PASSWORD` before sharing the repo publicly.

Customization ideas
-------------------

- Replace `ADMIN_PASSWORD` prompt with a proper server-side auth if you want real security.
- Add a small server to create the shuffle and deliver links via email instead of copy/paste.
- Add a feature to mark someone as 'sent' so the admin doesn't DM the same link twice.

Credits & thanks
-----------------

This repo's content is lovingly ridiculous. All participant messages and stories come from entries in `config.js`. The site uses plain HTML/CSS/vanilla JS and a strong dose of whimsy.

Want me to also:
- run the site locally and verify reveals? (I can run a tiny static server and open a browser-preview)
- sanitize or auto-format `config.js` and add a small script to add participants?

Have fun, and may your Chungus be generous.
