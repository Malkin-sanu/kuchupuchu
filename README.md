# One Little Website, One Big Sorry 💌

A beautiful, interactive, emotional apology website crafted for a best friend. Designed to feel personally handmade with dreamy pastel aesthetics, smooth animations, interactive feelings check-in, and genuine heartfelt words.

---

## ✨ Features

1. **Dreamy Handmade Aesthetic**:
   - Palette: Pastel pink (`#FF6B8B`), soft lavender (`#A78BFA`), warm cream (`#FFFDF9`), and gentle purple tints.
   - Elegant typography featuring Google Fonts `Caveat` (warm handwritten letter style), `Outfit` (stylish modern headings), and `Plus Jakarta Sans` (ultra-readable body font).
   - Glassmorphism effects with soft shadows, subtle glowing borders, and washi-tape accents.

2. **Interactive 3D Envelope Opening**:
   - Wax seal with pulsing heart (`💌`).
   - Clicking either the wax seal, envelope, or the primary button flips the envelope flap open with 3D perspective, raises the letter, triggers celebratory sparkles, and smoothly scrolls down to the letter.

3. **Heartfelt Apology Section**:
   - Authentic, respectful letter written in natural conversational Hindi/Hinglish:
     > *"Pata hai, tum mujhse gussa ho… aur shayad tumhari jagah main hota toh main bhi upset hota..."*
   - Subtle glowing and animated highlights on key sincere phrases.
   - Signed personally by you.

4. **"Ab batao, kitna gussa ho? 😭" Interactive Choice**:
   - **Button A: "Achha theek hai, maaf kiya ❤️"**
     - Triggers an instant multi-colored pastel confetti celebration and soft chime sound.
     - Displays: *"YAYYY 😭❤️ Ab meri dost wapas smile kar de bas!"* with a 100% Friendship Shield Restored badge.
   - **Button B: "Nahi, abhi bhi gussa hoon 😤"**
     - Respectful and gentle response: *"Achha baba 😭, time le lo… main yahin hoon jab tum baat karna chaho."*
     - Offers a secondary button: *"Ek last cute message? 🥺"* which expands a sweet comforting note promising chai, momos, and no rush.
     - Fully respectful: never traps or forces the user, allows toggling choices naturally.

5. **Friendship Appreciation Section**:
   - *"Har friendship mein kabhi na kabhi misunderstandings ho jaati hain..."*
   - Bespoke animated SVG illustration of two cute best friend characters sitting on a cloud under twinkling stars with a glowing floating heart.
   - Reminders of cherished memories (chai rants, dumb jokes, unconditional support).

6. **Final Night-Sky Screen**:
   - Dreamy midnight sky with twinkling stars and an animated shooting star.
   - Pulsing neon-rose glowing heart.
   - Warm, pressure-free conclusion:
     > *“Sorry, meri dost. No pressure, no expectations. Bas dil se ek sorry. ❤️”*
     > *“Made with a little guilt, lots of care, and too much coding 😭💗”*
   - Personalized footer celebrating your friendship.

7. **Native Web Audio API Ambient Music**:
   - Built-in soft kalimba / music box melody using the browser's native Web Audio API synthesizer.
   - Requires zero external audio files, zero bandwidth, works 100% offline, and avoids autoplay restrictions.
   - Toggle button located conveniently in the top navigation bar.

8. **Tap/Click Floating Hearts**:
   - Tapping or clicking anywhere on the screen generates lovely floating pastel hearts and sparkles (`💖`, `✨`, `🌸`).

---

## 🚀 How to Run

No complicated build steps or node server required!

1. Open `index.html` directly in any web browser (Chrome, Edge, Safari, Firefox).
2. Or use any local static server (e.g. VS Code Live Server or `npx serve .`).

---

## ✏️ How to Personalize

There are 2 super easy ways to customize the website:

### Method 1: Using the On-Screen "Customize" Button (Easiest)
1. Open the website.
2. Click the **✏️ Customize** button in the top-right corner.
3. Enter your friend's name and your name.
4. Click **Save Changes 💾** (saved to your browser).
5. Click **Copy Shareable Link 🔗** — this generates a link like:
   `index.html?friend=Simran&sender=Rahul`
   When your friend opens this link, all names are automatically customized for them!

### Method 2: In `script.js`
Open `script.js` and edit the `CONFIG` object at the very top:
```javascript
const CONFIG = {
  DEFAULT_FRIEND_NAME: "Meri Best Friend",
  DEFAULT_YOUR_NAME: "Tumhara Dost"
};
```

---

## 📱 Mobile & Desktop Compatibility
- Fully responsive across mobile phones (iPhone, Android), tablets, laptops, and ultra-wide displays.
- Respects `prefers-reduced-motion` for accessibility.
- Zero analytics, zero cookies, zero external API tracking.
