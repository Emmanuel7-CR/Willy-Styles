// Shared smooth-scroll instance so GSAP ScrollTrigger and Lenis stay in sync.
let instance = null
export const setLenis = (l) => { instance = l }
export const getLenis = () => instance
