import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { ArrowIcon, WhatsAppIcon } from '../components/Icons'
import { SERVICES, SITE } from '../data'
import { useDocumentMeta } from '../hooks'

export default function Services() {
  useDocumentMeta(
    'Services | Haircuts, Fades, Twists and Beard Grooming at Home',
    'Home haircuts, skin fades, twists, beard lineups, hair dye and kids cuts from Willy Styles, a mobile barber in Delta State.',
    '/services'
  )
  return (
    <>
      <section className="page-hero wrap">
        <h1 className="disp h1">Services</h1>
        <p className="lead">Tell Willy what you want and he will quote you on WhatsApp. Every visit uses sterilized tools and a fresh cape.</p>
      </section>

      <section className="section wrap">
        <div className="rows">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={(i % 4) * 0.04}>
              <Link to={`/book?service=${encodeURIComponent(s.id)}`} className="row">
                <span className="disp row-name">{s.name}</span>
                <span className="muted row-text">{s.blurb}</span>
                <span className="row-link">Book <ArrowIcon width={18} height={18} /></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section wrap">
        <Reveal className="end-cta">
          <h2 className="disp h2">Not sure what to pick?</h2>
          <p className="muted">Message Willy with a photo of the style you like.</p>
          <a href={SITE.whatsappLink} className="btn btn-primary" target="_blank" rel="noopener noreferrer"><WhatsAppIcon /> Message on WhatsApp</a>
        </Reveal>
      </section>
    </>
  )
}
