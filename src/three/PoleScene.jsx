import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import * as THREE from 'three'

function makeStripes() {
  const c = document.createElement('canvas')
  c.width = 256
  c.height = 256
  const g = c.getContext('2d')
  g.fillStyle = '#f2ede4'
  g.fillRect(0, 0, 256, 256)
  const cols = ['#c9a24b', '#0b0b0b']
  // Diagonal bands that tile seamlessly on both axes.
  for (let i = -2; i < 6; i++) {
    g.fillStyle = cols[((i % 2) + 2) % 2]
    g.beginPath()
    g.moveTo(i * 64 - 0, 0)
    g.lineTo(i * 64 + 32, 0)
    g.lineTo(i * 64 + 32 + 256, 256)
    g.lineTo(i * 64 + 256, 256)
    g.closePath()
    g.fill()
  }
  const t = new THREE.CanvasTexture(c)
  t.wrapS = t.wrapT = THREE.RepeatWrapping
  t.repeat.set(1, 3)
  t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = 8
  return t
}

function Pole() {
  const group = useRef()
  const tex = useMemo(() => makeStripes(), [])
  useEffect(() => () => tex.dispose(), [tex])
  const gold = useMemo(() => new THREE.MeshStandardMaterial({ color: '#c9a24b', metalness: 1, roughness: 0.25, envMapIntensity: 1.3 }), [])

  useFrame(({ pointer }, dt) => {
    tex.offset.y -= dt * 0.35
    const g = group.current
    g.rotation.y += dt * 0.5
    g.rotation.z += (pointer.x * 0.12 - g.rotation.z) * Math.min(1, dt * 3)
    g.rotation.x += (-pointer.y * 0.12 - g.rotation.x) * Math.min(1, dt * 3)
  })

  return (
    <group ref={group} position={[0, 0, 0]}>
      <mesh>
        <cylinderGeometry args={[0.62, 0.62, 3.6, 48, 1, true]} />
        <meshStandardMaterial map={tex} roughness={0.35} metalness={0.05} />
      </mesh>
      {/* glass tube */}
      <mesh>
        <cylinderGeometry args={[0.7, 0.7, 3.7, 48, 1, true]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.1} roughness={0.05} metalness={0.2} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      <mesh position={[0, 1.95, 0]} material={gold}>
        <cylinderGeometry args={[0.78, 0.7, 0.3, 48]} />
      </mesh>
      <mesh position={[0, 2.25, 0]} material={gold}>
        <sphereGeometry args={[0.42, 32, 24]} />
      </mesh>
      <mesh position={[0, -1.95, 0]} material={gold}>
        <cylinderGeometry args={[0.7, 0.78, 0.3, 48]} />
      </mesh>
      <mesh position={[0, -2.3, 0]} material={gold}>
        <cylinderGeometry args={[0.5, 0.78, 0.4, 48]} />
      </mesh>
    </group>
  )
}

export default function PoleScene({ lowPower, active = true }) {
  return (
    <Canvas frameloop={active ? 'always' : 'never'} dpr={lowPower ? [1, 1.25] : [1, 1.75]} camera={{ position: [0, 0, 8], fov: 34 }} gl={{ antialias: true, alpha: true }} aria-hidden="true">
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 5]} intensity={1.4} color="#fff1d6" />
      <Pole />
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={4} position={[-5, 3, 2]} scale={[8, 4, 1]} color="#fff4dc" />
        <Lightformer form="rect" intensity={2.5} position={[5, -1, 3]} scale={[6, 6, 1]} color="#c9a24b" />
        <Lightformer form="ring" intensity={3} position={[0, 5, 0]} scale={5} color="#ffffff" />
      </Environment>
    </Canvas>
  )
}
