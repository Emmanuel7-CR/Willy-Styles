import { useEffect, useRef } from 'react'
import { isCoarsePointer, prefersReducedMotion } from '../hooks'

// Small gold follower that grows over interactive things. Desktop only.
export default function Cursor() {
  const dot = useRef(null)
  useEffect(() => {
    if (isCoarsePointer() || prefersReducedMotion()) return
    const el = dot.current
    let x = -100, y = -100, cx = -100, cy = -100, raf
    const onMove = (e) => {
      x = e.clientX
      y = e.clientY
      el.classList.add('show')
      const hot = e.target.closest && e.target.closest('a, button, summary, [data-cursor], input, select, textarea')
      el.classList.toggle('big', !!hot)
    }
    const onLeave = () => el.classList.remove('show')
    const tick = () => {
      cx += (x - cx) * 0.22
      cy += (y - cy) * 0.22
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener('pointermove', onMove)
    document.addEventListener('pointerleave', onLeave)
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])
  return <div ref={dot} className="cursor" aria-hidden="true" />
}
