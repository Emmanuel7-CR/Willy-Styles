# Willy Styles

Mobile barber site for Willy Styles (Sapele, Delta State). React 18 + Vite, React Router, react-three-fiber (three.js), GSAP ScrollTrigger and Lenis.

## Run

    npm install
    npm run dev      # local dev server
    npm run build    # production build to dist/

Netlify builds with `npm run build` and publishes `dist/` (see `netlify.toml`). `public/_redirects` sends every route to `index.html` so deep links work.

## Pages
`/` Home, `/work` 3D gallery and archive, `/work/:slug` one cut, `/services`, `/about`, `/book` (opens WhatsApp), `/faq`.

## Content
Edit `src/data.js` for works, services, FAQs and contact details. Prices are intentionally not shown anywhere.

## 3D
- Work: draggable curved photo wall with shader bend (`src/three/GalleryScene.jsx`)

Visitors with reduced-motion or no WebGL get static fallbacks.

## Hero video
The home hero shows a photo (`SITE.heroImage` in `src/data.js`). To use a video instead:

1. Put a short, muted clip in `public/assets/` (landscape, 6-10 seconds, ideally under 5 MB, H.264 `.mp4` or `.webm`).
2. Set `heroVideo: '/assets/hero.mp4'` in `src/data.js`.

The photo stays as the poster and fallback: it shows while the video loads and whenever the video can't play (reduced motion, data saver or 2G, autoplay blocked, load error). The video pauses when scrolled out of view.
