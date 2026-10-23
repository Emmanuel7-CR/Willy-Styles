import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WORKS } from '../data'
import { ArrowIcon } from './Icons'

gsap.registerPlugin(ScrollTrigger)

// Pinned section: vertical scroll drives a horizontal run through the work.
// Below 900px (or with reduced motion) it becomes a normal swipeable row.
export default function FeaturedStrip() {
  const section = useRef(null)
  const track = useRef(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const el = track.current
      const dist = () => Math.max(0, el.scrollWidth - window.innerWidth + 80)
      const tween = gsap.to(el, {
        x: () => -dist(),
        ease: 'none',
        scrollTrigger: {
          trigger: section.current,
          start: 'top top',
          end: () => '+=' + dist(),
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })
      gsap.utils.toArray('.fs-card img').forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: -8 },
          { xPercent: 8, ease: 'none', scrollTrigger: { trigger: img.parentElement, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } }
        )
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <section className="fs" ref={section} aria-label="Featured work">
      <div className="fs-head wrap">
        <h2 className="disp h2">Recent cuts</h2>
      </div>
      <div className="fs-track" ref={track}>
        {WORKS.map((w) => (
          <Link key={w.slug} to={`/work/${w.slug}`} className="fs-card">
            <div className="fs-img">
              <img src={w.img} alt={`${w.title} by Willy Styles`} loading="lazy" />
            </div>
            <div className="fs-cap">
              <span className="disp fs-title">{w.title}</span>
              <span className="muted fs-tag">{w.category}</span>
            </div>
          </Link>
        ))}
        <Link to="/work" className="fs-card fs-more">
          <span className="disp">See all work</span>
          <ArrowIcon width={40} height={40} strokeWidth={1.4} />
        </Link>
      </div>
    </section>
  )
}
