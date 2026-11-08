import { useEffect, useRef, useState } from 'react'
import { SITE } from '../data'
import { prefersReducedMotion, useInView } from '../hooks'

// Hero background: a muted looping video when one is configured and the visitor
// can play it, otherwise the photo. The photo is always rendered underneath, so
// it also covers the moment before the video has loaded.
export default function HeroStage() {
  const box = useRef(null)
  const video = useRef(null)
  const inView = useInView(box)
  const [allowed, setAllowed] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!SITE.heroVideo) return
    const c = navigator.connection
    const slow = c && (c.saveData || /(^|-)2g$/.test(c.effectiveType || ''))
    setAllowed(!prefersReducedMotion() && !slow)
  }, [])

  // Pause when scrolled away to save battery and data.
  useEffect(() => {
    const v = video.current
    if (!v || !allowed) return
    if (inView) v.play().catch(() => setReady(false))
    else v.pause()
  }, [inView, allowed])

  return (
    <div className="hero-stage" ref={box}>
      <img src={SITE.heroImage} alt="" className={`hero-poster ${ready ? 'hidden' : ''}`} fetchpriority="high" />
      {allowed && (
        <video
          ref={video}
          className={`hero-video ${ready ? 'show' : ''}`}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={SITE.heroImage}
          onCanPlay={() => setReady(true)}
          onError={() => { setAllowed(false); setReady(false) }}
        >
          <source src={SITE.heroVideo} type={SITE.heroVideo.endsWith('.webm') ? 'video/webm' : 'video/mp4'} onError={() => { setAllowed(false); setReady(false) }} />
        </video>
      )}
      <div className="hero-shade" />
    </div>
  )
}
