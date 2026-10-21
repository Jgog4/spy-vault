# Spy Vault

An offline iPad passcode app for a treasure hunt. The agents solve paper clues, each clue gives one digit, and they punch the digits into the vault.

## Getting it onto the iPad

The app is a "Home Screen web app": a web page that installs like an app and then runs with no internet.

1. Put this folder on any HTTPS web host (GitHub Pages, Netlify, and so on). The secret code is **not** in these files. You set it on the iPad, so the host can be public.
2. On the iPad, open the link in **Safari**.
3. Tap **Share → Add to Home Screen**.
4. Open **Spy Vault from the Home Screen icon** (not from Safari) while you're still online. The Home Screen app keeps its own storage, separate from Safari's, so do the setup in there.
5. Do the mission setup (below). In the setup screen, check that **Offline mode: READY ✓** shows. If it says "downloading", wait a few seconds and reopen setup.
6. Test it: turn on Airplane Mode, close the app, and reopen it from the icon.

## Mission setup (grown-ups)

- On first launch the **Mission setup** screen opens by itself.
- To get back to it later: **tap the shield marked HQ** (top-left, on every screen) and enter your 4-digit PIN. That opens **HQ admin**, with Mission controls (Restart mission, End lockdown now) at the top and the code and other settings below.
- **Secret code:** one digit per clue, in order (Clue 1 = first digit). 4 to 12 digits. Changing it restarts the mission.
- **Final message:** shown when the vault opens. Use it to tell them where the treasure is.
- **HQ hint button / Hint message:** turn the red-star hint on or off and change its wording.
- **Lockdown:** how long the vault locks after a wrong code. It doubles each time, up to 8× the starting time.
- **Restart mission** (tap twice) resets progress. **End lockdown now** lets you skip a lockdown.

## How the game plays

1. **Mission briefing:** a typewritten dossier with a lit fuse. After **Accept mission** (or by itself 15 seconds after the briefing finishes), it counts down "This message will self-destruct" and the dossier burns away.
2. **Vault terminal:** 10 clue boxes. Tap a box, punch in the digit. Progress is saved, so closing the app doesn't lose anything (or skip a lockdown).
3. **Intel check (one use):** pick one clue and get up to 3 guesses at it. Once they've transmitted a guess, the line stays locked to that clue. A correct guess locks the digit in green.
4. **HQ hint (unlimited):** the ★ HQ HINT button in the top bar shows a glowing red star, your photo of the real star sticker, and the hint message. It works during a lockdown too.
5. **Open vault:**
   - All correct: the vault door spins open, with confetti, a fanfare and your final message.
   - At least half correct: "ACCESS DENIED", and the wrong digits turn red with a big X and a WRONG tag.
   - Fewer than half correct: "ACCESS DENIED", with no hint about which digits are wrong.
   - Every wrong code starts a security lockdown countdown, if lockdown is turned on.

## Tips for hunt day

- **Guided Access** (Settings → Accessibility → Guided Access, then triple-click the top button) locks the iPad to this app.
- Turn the volume up and make sure the iPad isn't in silent mode. All the sound effects are generated in the app.
- Don't clear Safari website data on the iPad before the hunt. That would wipe the setup.

## Updating the app later

Change the files and re-upload. Whenever the iPad is online, the app loads the latest version (and saves it for offline use). If you add or rename files, also bump `CACHE` in `sw.js` (for example `spyvault-v4` → `spyvault-v5`).
