import { lazy, Suspense, useRef } from 'react'
import { isCoarsePointer, use3D, useInView } from '../hooks'

const PoleScene = lazy(() => import('../three/PoleScene'))

export default function PoleStage() {
  const ok = use3D()
  const box = useRef(null)
  const inView = useInView(box)
  return (
    <div className="pole-stage" ref={box}>
      {ok ? (
        <Suspense fallback={null}>
          <PoleScene lowPower={isCoarsePointer()} active={inView} />
        </Suspense>
      ) : (
        <div className="pole-fallback" aria-hidden="true" />
      )}
    </div>
  )
}
