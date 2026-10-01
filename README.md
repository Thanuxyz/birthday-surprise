# 💕 Birthday Surprise Website

A romantic, interactive, mobile-first birthday surprise built with React + Vite.

## 1. Install
```bash
npm install
```

## 2. Run locally
```bash
npm run dev
```
Open the localhost URL shown by Vite.

## 3. Personalize
Open `src/main.jsx`. At the very top, edit the section marked:
`PERSONALIZATION — EDIT ONLY THIS SECTION FIRST`

Change:
- `boyfriendName`
- `birthdayMessage`
- `secretMessage`
- `surpriseMessage`
- `finalMessage`
- `memories`
- `reasons`
- `timeline`

## 4. Add photos
Put your photos inside `public/photos/` and name them:
- `memory-1.jpg`
- `memory-2.jpg`
- `memory-3.jpg`
- `memory-4.jpg`
- `memory-5.jpg`
- `memory-6.jpg`

Or change the image paths in the `memories` array.

## 5. Build
```bash
npm run build
```

## 6. Deploy free
### Vercel
1. Push the project to GitHub.
2. Import the repository at Vercel.
3. Framework preset: Vite.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Deploy.

### GitHub Pages
Install the GitHub Pages package and add a deploy script if you want Pages hosting. Vercel is recommended because it requires less configuration for a Vite site.
