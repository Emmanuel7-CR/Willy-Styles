import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { ArrowIcon } from '../components/Icons'
import { SITE } from '../data'
import { useDocumentMeta } from '../hooks'

export default function About() {
  useDocumentMeta(
    'About | Willy Styles, Mobile Barber in Sapele',
    'Willy Styles is a mobile barber based in Sapele, bringing haircuts to homes and offices across Delta State.',
    '/about'
  )
  return (
    <>
      <section className="page-hero wrap">
        <h1 className="disp h1">About Willy Styles</h1>
      </section>

      <section className="section wrap about-grid">
        <Reveal className="about-img">
          <img src="/assets/willy.jpg" alt="Willy of Willy Styles, seated in front of a painted wall mural" width="1200" height="1600" loading="lazy" />
        </Reveal>
        <Reveal className="about-copy" delay={0.08}>
          <p className="lead">Willy Styles isn't just a barbershop. It's a mobile barber based in Sapele, serving all of Delta State.</p>
          <p>Your time is valuable. Sitting in a queue at a shop shouldn't be part of getting a haircut, so Willy brings the clippers and the skill to your living room or office.</p>
          <p>Expect clean tools, sharp fades and a relaxed setup every time.</p>
          <ul className="plain">
            <li><strong>Hygiene.</strong> Sterilized tools and fresh linen for every client.</li>
            <li><strong>On time.</strong> Book a slot and Willy arrives for it. No queues.</li>
            <li><strong>Sharp finish.</strong> Fades, lineups and beards done with care.</li>
          </ul>
          <Link to="/book" className="btn btn-primary">Book a cut <ArrowIcon width={18} height={18} /></Link>
        </Reveal>
      </section>

      <section className="section wrap">
        <Reveal className="card areas">
          <div>
            <h2 className="disp h3">Where he works</h2>
            <p className="muted">{SITE.areas.join(', ')} and other parts of Delta State.</p>
          </div>
          <div>
            <h2 className="disp h3">Hours</h2>
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
