import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowIcon, ArrowLeftIcon } from './Icons'
import { isCoarsePointer, use3D, useInView } from '../hooks'

const GalleryScene = lazy(() => import('../three/GalleryScene'))
const GAP = 2.9

export default function GalleryStage({ items }) {
  const ok = use3D()
  const navigate = useNavigate()
  const box = useRef(null)
  const inView = useInView(box)
  const [active, setActive] = useState(0)
  const n = items.length
  const total = n * GAP

  const control = useRef({
    target: 0,
    moved: 0,
    goTo: () => {},
  })
  control.current.goTo = (i) => {
    const base = i * GAP
    control.current.target = base + Math.round((control.current.target - base) / total) * total
  }
  const step = useCallback((dir) => {
    control.current.target = (Math.round(control.current.target / GAP) + dir) * GAP
  }, [])

  // Drag to spin the wall.
  useEffect(() => {
    const el = box.current
    if (!el || !ok) return
    let down = false
    let lastX = 0
    let lastT = 0
    let v = 0
    const onDown = (e) => {
      down = true
      lastX = e.clientX
      lastT = performance.now()
      control.current.moved = 0
      v = 0
      el.classList.add('dragging')
    }
    const onMove = (e) => {
      if (!down) return
      const dx = e.clientX - lastX
      const now = performance.now()
      control.current.moved += Math.abs(dx)
      const units = dx * (GAP / (el.clientWidth / 4.4))
      control.current.target -= units
      v = (units / Math.max(1, now - lastT)) * 16
      lastX = e.clientX
      lastT = now
    }
    const onUp = (e) => {
      if (!down) return
      down = false
      el.classList.remove('dragging')
      control.current.target = Math.round((control.current.target - v * 6) / GAP) * GAP
    }
    const onWheel = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) * 1.4) {
        e.preventDefault()
        control.current.target += e.deltaX * 0.01
        clearTimeout(onWheel.t)
        onWheel.t = setTimeout(() => (control.current.target = Math.round(control.current.target / GAP) * GAP), 140)
      }
    }
    el.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      el.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
      el.removeEventListener('wheel', onWheel)
    }
  }, [ok])

  const onKey = (e) => {
    if (e.key === 'ArrowRight') step(1)
    if (e.key === 'ArrowLeft') step(-1)
  }

  const current = items[active] || items[0]

  // Fallback: plain, swipeable strip for no-WebGL or reduced-motion visitors.
  if (ok === false) {
    return (
      <div className="strip-fallback" aria-label="Selected cuts">
        {items.map((w) => (
          <Link key={w.slug} to={`/work/${w.slug}`} className="strip-card">
            <img src={w.img} alt={`${w.title} by Willy Styles`} loading="lazy" />
            <span className="disp">{w.title}</span>
          </Link>
        ))}
      </div>
    )
  }

  return (
    <div className="gallery-stage" ref={box} tabIndex={0} onKeyDown={onKey} role="region" aria-roledescription="carousel" aria-label="3D gallery of recent cuts">
      <div className="gallery-canvas">
        {ok && (
          <Suspense fallback={null}>
            <GalleryScene
              items={items}
              control={control}
              onActive={setActive}
              onOpen={(w) => navigate(`/work/${w.slug}`)}
              lowPower={isCoarsePointer()}
              active={inView}
            />
          </Suspense>
        )}
      </div>
      <div className="gallery-ui">
        <div className="gallery-meta">
          <span className="disp gallery-count">
            {String(active + 1).padStart(2, '0')} <i>/ {String(n).padStart(2, '0')}</i>
          </span>
          <span className="disp gallery-title">{current.title}</span>
          <Link to={`/work/${current.slug}`} className="link-arrow">
            View this cut <ArrowIcon width={18} height={18} />
          </Link>
        </div>
        <div className="gallery-nav">
          <button className="round" aria-label="Previous cut" onClick={() => step(-1)}><ArrowLeftIcon /></button>
          <button className="round" aria-label="Next cut" onClick={() => step(1)}><ArrowIcon /></button>
        </div>
        <span className="gallery-hint">Drag to spin</span>
      </div>
    </div>
  )
}
