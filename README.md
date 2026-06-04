# theyashthetics

**Personal video editing portfolio** built with React, Tailwind CSS, and Framer Motion.

## 🎬 Adding Your Videos

Drop your reel MP4 into the `/public` folder:

```
/public/reel.mp4   ← hero background (the mouse-scrub video)
```

Then in `src/App.jsx`, confirm:
```js
const VIDEO_SRC = '/reel.mp4'
```

For additional project videos, add them to `/public/` and reference them as `/your-video.mp4`.

**No CDN issues on GitHub** — files in `/public/` are served directly by Vite and work with GitHub Pages out of the box.

## 🚀 Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## 🌐 Deploy to GitHub Pages

1. In `vite.config.js`, add your repo name as the base:
   ```js
   base: '/THEYASHTHETICS/'  // or your repo name
   ```
2. Build:
   ```bash
   npm run build
   ```
3. Push the `dist/` folder to the `gh-pages` branch, or use the [vite-plugin-gh-pages](https://github.com/caioedut/vite-plugin-gh-pages) package.

## Stack
- **React 19** + **Vite 8**
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **Framer Motion** (`motion/react`)
- **Lucide React** icons
- **Inter** — Google Fonts
