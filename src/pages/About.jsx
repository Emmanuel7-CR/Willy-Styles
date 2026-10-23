import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { ArrowIcon, PinIcon } from '../components/Icons'
import { SITE } from '../data'
import { useDocumentMeta } from '../hooks'

const VALUES = [
  { t: 'Hygiene first', d: 'Sterilized tools and fresh linen for every client, every time.' },
  { t: 'Your time matters', d: 'Booked slots and punctual arrival. Nobody sits in a queue.' },
  { t: 'Detail', d: 'Sharp hairlines, matched beards and a clean finish on every cut.' },
]

export default function About() {
  useDocumentMeta(
    'About | Willy Styles, Mobile Barber in Sapele',
    'Willy Styles is a mobile grooming experience based in Sapele, bringing professional haircuts to homes and offices across Delta State.',
    '/about'
  )
  return (
    <>
      <section className="page-hero wrap">
        <p className="eyebrow">About</p>
        <h1 className="disp h1">Barbering that<br /><em>travels.</em></h1>
      </section>

      <section className="section wrap about-grid">
        <Reveal className="about-img">
          <img src="/assets/cut-3.jpg" alt="Willy Styles' mobile barber setup on a porch, with tools laid out on a table" width="810" height="1080" loading="lazy" />
        </Reveal>
        <Reveal className="about-copy" delay={0.1}>
          <p className="lead">Willy Styles isn't just a barbershop. It's a mobile grooming experience based in Sapele, serving the whole of Delta State.</p>
          <p>Your time is valuable. Sitting in a queue at a local shop shouldn't be part of your grooming routine, so the clippers and the expertise come directly to your living room or office.</p>
          <p>Expect professional hygiene, sharp fades and a relaxed environment every single time.</p>
          <Link to="/book" className="btn btn-gold">Book a cut <ArrowIcon width={18} height={18} /></Link>
        </Reveal>
      </section>

      <section className="section wrap">
        <div className="grid-3">
          {VALUES.map((v, i) => (
            <Reveal key={v.t} delay={i * 0.08}>
              <div className="card">
                <span className="disp card-num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="disp">{v.t}</h3>
                <p className="muted">{v.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section wrap">
        <Reveal className="card areas">
          <div>
            <p className="eyebrow">Where Willy works</p>
            <h2 className="disp h2">Across Delta State</h2>
            <div className="chips static">
              {SITE.areas.map((a) => (
                <span key={a} className="chip"><PinIcon width={16} height={16} /> {a}</span>
              ))}
              <span className="chip">And beyond</span>
            </div>
          </div>
          <div>
            <p className="eyebrow">Hours</p>
            <ul className="hours">
              {SITE.hours.map(([d, h]) => (
                <li key={d}><span>{d}</span><span>{h}</span></li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>
    </>
  )
}
