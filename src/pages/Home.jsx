import { Link } from 'react-router-dom'
import HeroStage from '../components/HeroStage'
import FeaturedStrip from '../components/FeaturedStrip'
import Reveal from '../components/Reveal'
import Tilt from '../components/Tilt'
import { ArrowIcon, WhatsAppIcon } from '../components/Icons'
import { REVIEWS, SERVICES, SITE, STEPS } from '../data'
import { useDocumentMeta } from '../hooks'

const TEASER = ['Skin Fade', 'Twists and Braids', 'Beard Grooming']

export default function Home() {
  useDocumentMeta(
    'Mobile Barber in Delta State | Willy Styles Home Service Haircuts',
    'Willy Styles is a premium mobile barber in Delta State. Home service haircuts, fades, twists and beard lineups in Sapele, Warri, Ughelli, Oghara and beyond.',
    '/'
  )
  const teaser = TEASER.map((id) => SERVICES.find((s) => s.id === id))

  return (
    <>
      <section className="hero">
        <HeroStage />
        <div className="wrap hero-inner">
          <div className="hero-badge">
            <span className="live-dot" /> Taking bookings across {SITE.areas.slice(0, 3).join(', ')} and {SITE.areas[3]}
          </div>
          <h1 className="hero-title disp">
            <span className="line"><span>The chair</span></span>
            <span className="line"><span>comes to <em>you.</em></span></span>
          </h1>
          <p className="hero-sub">Sharp fades, clean lineups and twists, done at your door in Delta State. No queues, no travel, no stress.</p>
          <div className="hero-actions">
            <Link to="/book" className="btn btn-wa">
              <WhatsAppIcon /> Book a cut
            </Link>
            <Link to="/work" className="btn btn-line">
              See the work <ArrowIcon width={18} height={18} />
            </Link>
          </div>
          <div className="hero-scroll" aria-hidden="true"><span /> Scroll</div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track disp">
          {[0, 1].map((k) => (
            <div key={k} className="marquee-set">
              {['Sapele', 'Warri', 'Ughelli', 'Oghara', 'Fades', 'Twists', 'Lineups', 'Beards', 'Home service'].map((t) => (
                <span key={t + k}>{t}<i /></span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="section wrap statement">
        <Reveal as="p" className="statement-text disp">
          Willy Styles is not a shop. It is a <em>mobile grooming experience</em>. The clippers, the cape and the craft come to your living room or office, on time, every time.
        </Reveal>
      </section>

      <FeaturedStrip />

      <section className="section wrap">
        <Reveal className="section-head">
          <p className="eyebrow">What Willy does</p>
          <h2 className="disp h2">Services, done properly</h2>
        </Reveal>
        <div className="grid-3">
          {teaser.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.08}>
              <Tilt as={Link} to="/services" className="card service-card">
                <span className="disp card-num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="disp">{s.name}</h3>
                <p className="muted">{s.blurb}</p>
                <span className="link-arrow">Details <ArrowIcon width={18} height={18} /></span>
              </Tilt>
            </Reveal>
          ))}
        </div>
        <Reveal className="center mt">
          <Link to="/services" className="btn btn-line">All services <ArrowIcon width={18} height={18} /></Link>
        </Reveal>
      </section>

      <section className="section wrap">
        <Reveal className="section-head">
          <p className="eyebrow">How it works</p>
          <h2 className="disp h2">Three steps to a fresh cut</h2>
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
      </section>

      <section className="section wrap">
        <Reveal className="section-head">
          <p className="eyebrow">Client love</p>
          <h2 className="disp h2">What clients say</h2>
        </Reveal>
        <div className="grid-2">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.1}>
              <figure className="card review">
                <div className="stars" role="img" aria-label="5 out of 5 stars">★★★★★</div>
                <blockquote>"{r.text}"</blockquote>
                <figcaption className="muted">{r.name}, {r.place}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section wrap">
        <Reveal className="cta-banner">
          <h2 className="disp">Ready for a fresh cut?</h2>
          <p>Send a request on WhatsApp and Willy will confirm your slot.</p>
          <Link to="/book" className="btn btn-dark">Book now <ArrowIcon width={18} height={18} /></Link>
        </Reveal>
      </section>
    </>
  )
}
