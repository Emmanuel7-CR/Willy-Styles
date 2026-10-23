import { useRef } from 'react'
import { isCoarsePointer, prefersReducedMotion } from '../hooks'

// CSS 3D tilt with a moving glare. Pure transforms, no layout cost.
export default function Tilt({ as: Tag = 'div', className = '', children, max = 9, ...rest }) {
  const ref = useRef(null)
  const frame = useRef(0)

  const move = (e) => {
    if (isCoarsePointer() || prefersReducedMotion()) return
    const el = ref.current
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty('--ry', `${(px - 0.5) * max * 2}deg`)
      el.style.setProperty('--rx', `${(0.5 - py) * max * 2}deg`)
    })
  }
  const leave = () => {
    const el = ref.current
    cancelAnimationFrame(frame.current)
    el.style.setProperty('--ry', '0deg')
    el.style.setProperty('--rx', '0deg')
  }

  return (
    <Tag ref={ref} className={`tilt ${className}`} onPointerMove={move} onPointerLeave={leave} {...rest}>
      {children}
    </Tag>
  )
}
