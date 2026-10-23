import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import * as THREE from 'three'

const GOLD = '#c9a24b'
const easeOut = (x) => 1 - Math.pow(1 - x, 3)
const easeIn = (x) => x * x * x

// One scissor half: blade + shank in one extruded outline, plus the finger ring.
function useBladeGeometry() {
  return useMemo(() => {
    const s = new THREE.Shape()
    s.moveTo(-1.15, -0.14)
    s.lineTo(-0.2, -0.05)
    s.lineTo(0.0, 0.0)
    s.lineTo(3.8, 0.012)
    s.quadraticCurveTo(1.9, 0.3, 0.2, 0.36)
    s.quadraticCurveTo(-0.45, 0.36, -1.15, 0.12)
    s.lineTo(-1.15, -0.14)
    const hole = new THREE.Path()
    hole.absarc(0, 0.17, 0.065, 0, Math.PI * 2, true)
    s.holes.push(hole)
    const g = new THREE.ExtrudeGeometry(s, {
      depth: 0.05,
      bevelEnabled: true,
      bevelThickness: 0.012,
      bevelSize: 0.012,
      bevelSegments: 2,
      curveSegments: 24,
    })
    g.translate(0, -0.17, -0.025)
    return g
  }, [])
}

function Blade({ geometry, flip, material, refObj }) {
  return (
    <group ref={refObj} position={[0, 0, flip ? -0.035 : 0.035]}>
      <group scale={[1, flip ? -1 : 1, 1]}>
        <mesh geometry={geometry} material={material} />
        {/* finger ring */}
        <mesh position={[-1.62, -0.46, 0]} material={material}>
          <torusGeometry args={[0.44, 0.075, 18, 56]} />
        </mesh>
        {/* grip bar between shank and ring */}
        <mesh position={[-1.2, -0.26, 0]} rotation={[0, 0, -0.5]} material={material}>
          <boxGeometry args={[0.34, 0.1, 0.1]} />
        </mesh>
      </group>
    </group>
  )
}

const COUNT = 90

function Clippings({ tipRef, burst }) {
  const mesh = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const state = useMemo(() => {
    const arr = []
    for (let i = 0; i < COUNT; i++) {
      arr.push({
        p: new THREE.Vector3((Math.random() - 0.5) * 9, (Math.random() - 0.3) * 6, (Math.random() - 0.5) * 3),
        v: new THREE.Vector3(0, -0.15 - Math.random() * 0.2, 0),
        r: new THREE.Euler(Math.random() * 6, Math.random() * 6, Math.random() * 6),
        rv: new THREE.Vector3((Math.random() - 0.5) * 1.5, (Math.random() - 0.5) * 1.5, (Math.random() - 0.5) * 1.5),
        s: 0.5 + Math.random() * 0.9,
        burst: false,
      })
    }
    return arr
  }, [])
  const cursor = useRef(0)
  const tip = useMemo(() => new THREE.Vector3(), [])

  burst.current = () => {
    if (!tipRef.current) return
    tipRef.current.getWorldPosition(tip)
    for (let k = 0; k < 26; k++) {
      const p = state[cursor.current % COUNT]
      cursor.current++
      p.p.copy(tip)
      p.v.set((Math.random() - 0.2) * 1.6, (Math.random() - 0.1) * 1.2, (Math.random() - 0.5) * 1.2)
      p.burst = true
    }
  }

  useFrame((_, dt) => {
    const d = Math.min(dt, 0.05)
    state.forEach((p, i) => {
      if (p.burst) {
        p.v.y -= 2.2 * d
        p.v.multiplyScalar(1 - 0.9 * d)
      }
      p.p.addScaledVector(p.v, d)
      p.r.x += p.rv.x * d
      p.r.y += p.rv.y * d
      p.r.z += p.rv.z * d
      if (p.p.y < -3.8) {
        p.p.set((Math.random() - 0.5) * 9, 3.6, (Math.random() - 0.5) * 3)
        p.v.set(0, -0.15 - Math.random() * 0.2, 0)
        p.burst = false
      }
      dummy.position.copy(p.p)
      dummy.rotation.copy(p.r)
      dummy.scale.setScalar(p.s)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[null, null, COUNT]} frustumCulled={false}>
      <capsuleGeometry args={[0.006, 0.12, 2, 5]} />
      <meshStandardMaterial color="#8a7452" roughness={0.7} metalness={0.1} emissive="#2a2013" emissiveIntensity={0.5} />
    </instancedMesh>
  )
}

function Scissors({ scrollRef }) {
  const group = useRef()
  const bladeA = useRef()
  const bladeB = useRef()
  const tip = useRef()
  const burst = useRef(() => {})
  const geometry = useBladeGeometry()
  const material = useMemo(
    () => new THREE.MeshStandardMaterial({ color: GOLD, metalness: 0.9, roughness: 0.3, envMapIntensity: 1.6, emissive: '#4a3510', emissiveIntensity: 0.55, side: THREE.DoubleSide }),
    []
  )
  const { viewport, pointer } = useThree()
  const last = useRef(0)
  const pressed = useRef(false)
  const open = useRef(0.5)

  useFrame(({ clock }, dt) => {
    const t = clock.elapsedTime
    // Snip cycle: ease open, hold, fast close (the snip), small recoil.
    const p = t % 3.6
    let target
    if (p < 1.5) target = 0.25 + 0.75 * easeOut(p / 1.5)
    else if (p < 2.2) target = 1
    else if (p < 2.42) target = 1 - easeIn((p - 2.2) / 0.22)
    else if (p < 2.7) target = 0.18 * easeOut((p - 2.42) / 0.28)
    else target = 0.18 + 0.07 * Math.sin((p - 2.7) * 3)
    if (pressed.current) target = 0
    if (last.current < 2.42 && p >= 2.42) burst.current()
    last.current = p
    open.current += (target - open.current) * Math.min(1, dt * 14)

    const theta = 0.03 + open.current * 0.34
    bladeA.current.rotation.z = theta
    bladeB.current.rotation.z = -theta

    const sc = scrollRef.current || 0
    const g = group.current
    const wide = viewport.width > 7
    const baseX = wide ? viewport.width * 0.29 : 0.3
    const baseY = wide ? 0 : viewport.height * 0.3
    const scale = wide ? 0.68 : Math.max(0.36, viewport.width / 13)
    g.scale.setScalar(scale)
    g.position.x += (baseX - 0.4 * scale * 1.4 + pointer.x * 0.5 - g.position.x) * Math.min(1, dt * 3)
    g.position.y += (baseY + Math.sin(t * 0.8) * 0.12 - sc * 2.4 - g.position.y) * Math.min(1, dt * 4)
    g.rotation.y += (-0.35 + pointer.x * 0.5 + sc * 1.6 - g.rotation.y) * Math.min(1, dt * 3)
    g.rotation.x += (0.15 - pointer.y * 0.25 - g.rotation.x) * Math.min(1, dt * 3)
    g.rotation.z += (0.42 + sc * 0.5 - g.rotation.z) * Math.min(1, dt * 3)
  })

  return (
    <>
      <group
        ref={group}
        onPointerDown={() => (pressed.current = true)}
        onPointerUp={() => (pressed.current = false)}
        onPointerOut={() => (pressed.current = false)}
      >
        <group position={[-0.9, 0, 0]}>
          <Blade geometry={geometry} material={material} refObj={bladeA} />
          <Blade geometry={geometry} material={material} flip refObj={bladeB} />
          <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} material={material}>
            <cylinderGeometry args={[0.1, 0.1, 0.24, 24]} />
          </mesh>
          <object3D ref={tip} position={[3.8, 0, 0]} />
        </group>
      </group>
      <Clippings tipRef={tip} burst={burst} />
    </>
  )
}

export default function HeroScene({ scrollRef, lowPower, active = true }) {
  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={lowPower ? [1, 1.25] : [1, 1.75]}
      camera={{ position: [0, 0, 8], fov: 38 }}
      gl={{ antialias: !lowPower, alpha: true, powerPreference: 'high-performance' }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.25} />
      <directionalLight position={[2, 3, 7]} intensity={3.2} color="#fff1d6" />
      <directionalLight position={[-4, -2, 5]} intensity={1.4} color="#ffd9a0" />
      <pointLight position={[-5, -2, 3]} intensity={18} color="#c9a24b" />
      <Scissors scrollRef={scrollRef} />
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={7} position={[-6, 4, 3]} scale={[12, 6, 1]} color="#fff4dc" />
        <Lightformer form="rect" intensity={5} position={[4, 3, 6]} scale={[10, 5, 1]} color="#ffffff" />
        <Lightformer form="rect" intensity={3} position={[6, -2, 4]} scale={[8, 6, 1]} color="#c9a24b" />
        <Lightformer form="ring" intensity={4} position={[0, 6, 2]} scale={6} color="#ffffff" />
        <Lightformer form="rect" intensity={1.5} position={[0, -6, -3]} scale={[20, 2, 1]} color="#6b7280" />
      </Environment>
    </Canvas>
  )
}
