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
- Home hero: gold scissors that snip and scatter clippings (`src/three/HeroScene.jsx`)
- Work: draggable curved photo wall with shader bend (`src/three/GalleryScene.jsx`)
- Book: barber pole (`src/three/PoleScene.jsx`)

Visitors with reduced-motion or no WebGL get static fallbacks.

## Hero video
Drop a short, muted clip at `public/assets/hero.mp4` and it plays behind the scissors. Without it, the cut photo is used.
