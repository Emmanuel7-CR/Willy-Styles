import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

const GAP = 2.9
const R = 7.2
const PW = 2.5
const PH = 3.3

const vert = /* glsl */ `
  uniform float uVel;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 p = position;
    float bend = sin(uv.x * 3.14159);
    p.z += bend * uVel * 0.55;
    p.y += (uv.x - 0.5) * uVel * 0.5;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`
const frag = /* glsl */ `
  uniform sampler2D uTex;
  uniform vec2 uCover;
  uniform vec2 uSize;
  uniform float uFocus;
  uniform float uHover;
  uniform float uOpacity;
  varying vec2 vUv;
  float rbox(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
  }
  void main() {
    vec2 uv = (vUv - 0.5) * uCover + 0.5;
    vec4 c = texture2D(uTex, uv);
    float g = dot(c.rgb, vec3(0.299, 0.587, 0.114));
    vec3 col = mix(vec3(g) * 0.5, c.rgb, uFocus);
    col *= 0.5 + 0.5 * uFocus + 0.12 * uHover;
    float d = rbox((vUv - 0.5) * uSize, uSize * 0.5, 0.14);
    float a = 1.0 - smoothstep(-0.012, 0.012, d);
    gl_FragColor = vec4(col, a * uOpacity);
  }
`

const wrap = (x, total) => {
  const h = total / 2
  return ((((x + h) % total) + total) % total) - h
}

function Wall({ items, control, onActive, onOpen }) {
  const textures = useTexture(items.map((i) => i.img))
  const meshes = useRef([])
  const state = useRef({ cur: 0, activeIdx: -1, hover: -1, hoverVal: items.map(() => 0) })
  const total = items.length * GAP

  const materials = useMemo(
    () =>
      items.map((item, i) => {
        const tex = textures[i]
        tex.anisotropy = 4
        tex.needsUpdate = true
        const imgAspect = tex.image.width / tex.image.height
        const planeAspect = PW / PH
        const cover = imgAspect > planeAspect ? [planeAspect / imgAspect, 1] : [1, imgAspect / planeAspect]
        return new THREE.ShaderMaterial({
          vertexShader: vert,
          fragmentShader: frag,
          transparent: true,
          uniforms: {
            uTex: { value: tex },
            uCover: { value: new THREE.Vector2(...cover) },
            uSize: { value: new THREE.Vector2(PW, PH) },
            uFocus: { value: 0 },
            uHover: { value: 0 },
            uOpacity: { value: 1 },
            uVel: { value: 0 },
          },
        })
      }),
    [items, textures]
  )

  useFrame((_, dt) => {
    const s = state.current
    const d = Math.min(dt, 0.05)
    const vel = control.current.target - s.cur
    s.cur += vel * Math.min(1, d * 6)
    const v = THREE.MathUtils.clamp(vel * 0.18, -1.2, 1.2)

    let best = 0
    let bestDist = Infinity
    items.forEach((_, i) => {
      const pos = wrap(i * GAP - s.cur, total)
      const a = pos / R
      const m = meshes.current[i]
      if (!m) return
      m.position.set(R * Math.sin(a), 0, R * Math.cos(a) - R)
      m.rotation.y = -a
      const focus = THREE.MathUtils.clamp(1 - Math.abs(pos) / (GAP * 1.25), 0, 1)
      s.hoverVal[i] += ((s.hover === i ? 1 : 0) - s.hoverVal[i]) * Math.min(1, d * 8)
      const sc = 1 + focus * 0.1 + s.hoverVal[i] * 0.04
      m.scale.set(sc, sc, 1)
      const u = materials[i].uniforms
      u.uFocus.value = focus
      u.uHover.value = s.hoverVal[i]
      u.uVel.value = v
      u.uOpacity.value = 1 - THREE.MathUtils.smoothstep(Math.abs(a), 0.78, 1.0)
      if (Math.abs(pos) < bestDist) {
        bestDist = Math.abs(pos)
        best = i
      }
    })
    if (best !== s.activeIdx) {
      s.activeIdx = best
      onActive(best)
    }
  })

  return (
    <group>
      {items.map((item, i) => (
        <mesh
          key={item.slug}
          ref={(el) => (meshes.current[i] = el)}
          material={materials[i]}
          onPointerOver={(e) => {
            e.stopPropagation()
            state.current.hover = i
            document.body.style.cursor = 'pointer'
          }}
          onPointerOut={() => {
            if (state.current.hover === i) state.current.hover = -1
            document.body.style.cursor = ''
          }}
          onClick={(e) => {
            e.stopPropagation()
            if (control.current.moved > 6) return
            const idx = state.current.activeIdx
            if (idx === i) onOpen(item)
            else control.current.goTo(i)
          }}
        >
          <planeGeometry args={[PW, PH, 24, 24]} />
        </mesh>
      ))}
    </group>
  )
}

export default function GalleryScene({ items, control, onActive, onOpen, lowPower, active = true }) {
  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={lowPower ? [1, 1.25] : [1, 1.75]}
      camera={{ position: [0, 0, 9.5], fov: 40 }}
      gl={{ antialias: !lowPower, alpha: true }}
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <Wall items={items} control={control} onActive={onActive} onOpen={onOpen} />
      </Suspense>
    </Canvas>
  )
}

export const GALLERY_GAP = GAP
