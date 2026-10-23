import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { isCoarsePointer, use3D, useInView } from '../hooks'

const HeroScene = lazy(() => import('../three/HeroScene'))

// 3D scissors canvas with a video backdrop that falls back to the cut photo.
export default function HeroStage() {
  const ok = use3D()
  const box = useRef(null)
  const inView = useInView(box)
  const scrollRef = useRef(0)
  const [videoOk, setVideoOk] = useState(true)

  useEffect(() => {
    const on = () => (scrollRef.current = Math.min(1.2, window.scrollY / window.innerHeight))
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  return (
    <div className="hero-stage" ref={box}>
      {/* Drop a short muted clip at /assets/hero.mp4 and it plays behind the 3D scene.
          If the file is missing or autoplay is blocked, the poster photo stays. */}
      <div className="hero-backdrop">
        <img src="/assets/cut-5.jpg" alt="" className="hero-poster" fetchpriority="high" />
        {videoOk && ok && (
          <video className="hero-video" autoPlay muted loop playsInline preload="metadata" poster="/assets/cut-5.jpg" onError={() => setVideoOk(false)}>
            <source src="/assets/hero.mp4" type="video/mp4" onError={() => setVideoOk(false)} />
          </video>
        )}
      </div>
      {ok && (
        <div className="hero-canvas">
          <Suspense fallback={null}>
            <HeroScene scrollRef={scrollRef} lowPower={isCoarsePointer()} active={inView} />
          </Suspense>
        </div>
      )}
    </div>
  )
}
