import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Tilt from '../components/Tilt'
import { ArrowIcon, WhatsAppIcon } from '../components/Icons'
import { SERVICES, SITE, STEPS } from '../data'
import { useDocumentMeta } from '../hooks'

export default function Services() {
  useDocumentMeta(
    'Services | Haircuts, Fades, Twists and Beard Grooming at Home',
    'Home service haircuts, skin fades, twists, beard lineups, hair dye and kids cuts from Willy Styles, a mobile barber in Delta State.',
    '/services'
  )
  return (
    <>
      <section className="page-hero wrap">
        <p className="eyebrow">Services</p>
        <h1 className="disp h1">Everything you need,<br /><em>at your door.</em></h1>
        <p className="lead">Every visit includes a fresh cape, sterilized tools and a tidy finish. Travel within your area is part of the service. Message Willy for a quote on the style you want.</p>
      </section>

      <section className="section wrap">
        <div className="grid-3 services-grid">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={(i % 3) * 0.08}>
              <Tilt className="card service-full">
                <span className="disp card-num">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="disp">{s.name}</h2>
                <p className="muted">{s.blurb}</p>
                <ul className="ticks small">
                  {s.includes.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
                <Link to={`/book?service=${encodeURIComponent(s.id)}`} className="link-arrow">
                  Book this <ArrowIcon width={18} height={18} />
                </Link>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section wrap">
        <Reveal className="section-head">
          <p className="eyebrow">The process</p>
          <h2 className="disp h2">Simple from start to finish</h2>
        </Reveal>
        <div className="steps">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1} className="step">
              <span className="disp step-n">{s.n}</span>
              <h3 className="disp">{s.title}</h3>
              <p className="muted">{s.text}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="cta-banner mt">
          <h2 className="disp">Not sure what to pick?</h2>
          <p>Message Willy with a photo of the style you like and he will advise.</p>
          <a href={SITE.whatsappLink} className="btn btn-dark" target="_blank" rel="noopener noreferrer"><WhatsAppIcon /> Ask on WhatsApp</a>
        </Reveal>
      </section>
    </>
  )
}
