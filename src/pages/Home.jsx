import { Link } from 'react-router-dom'
import HeroStage from '../components/HeroStage'
import FeaturedStrip from '../components/FeaturedStrip'
import Reveal from '../components/Reveal'
import { ArrowIcon, WhatsAppIcon } from '../components/Icons'
import { REVIEWS, SERVICES, SITE, STEPS } from '../data'
import { useDocumentMeta } from '../hooks'

export default function Home() {
  useDocumentMeta(
    'Mobile Barber in Delta State | Willy Styles Home Service Haircuts',
    'Willy Styles is a mobile barber in Delta State. Home haircuts, fades, twists and beard lineups in Sapele, Warri, Ughelli, Oghara and beyond.',
    '/'
  )
  const top = SERVICES.filter((s) => ['Haircut', 'Skin Fade', 'Beard Grooming', 'Twists and Braids'].includes(s.id))

  return (
    <>
      <section className="hero">
        <HeroStage />
        <div className="wrap hero-inner">
          <h1 className="hero-title disp">
            <span className="line"><span>Clean haircuts</span></span>
            <span className="line"><span>at your doorstep</span></span>
          </h1>
          <p className="hero-sub">No queues, no stress. Willy Styles is a mobile barber in Sapele, serving Delta State.</p>
          <div className="hero-actions">
            <Link to="/book" className="btn btn-primary"><WhatsAppIcon /> Book a cut</Link>
            <Link to="/work" className="btn btn-ghost">See the work <ArrowIcon width={18} height={18} /></Link>
          </div>
          <p className="hero-areas">{SITE.areas.join(', ')} and across Delta State</p>
        </div>
      </section>

      <section className="section wrap intro">
        <Reveal as="h2" className="disp h2">A barber who comes to you</Reveal>
        <Reveal className="intro-copy" delay={0.08}>
          <p>Willy Styles is a mobile barber based in Sapele. Instead of waiting in a queue at a shop, you get your cut at home or at the office, with a fresh cape and sterilized tools.</p>
          <Link to="/about" className="link-arrow">About Willy <ArrowIcon width={18} height={18} /></Link>
        </Reveal>
      </section>

      <FeaturedStrip />

      <section className="section wrap">
        <Reveal className="section-head row">
          <h2 className="disp h2">Services</h2>
          <Link to="/services" className="link-arrow">All services <ArrowIcon width={18} height={18} /></Link>
        </Reveal>
        <div className="rows">
          {top.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.05}>
              <Link to="/services" className="row">
                <span className="disp row-name">{s.name}</span>
                <span className="muted row-text">{s.blurb}</span>
                <ArrowIcon className="row-arrow" width={20} height={20} />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section wrap">
        <Reveal as="h2" className="disp h2 section-head">How booking works</Reveal>
        <ol className="steps">
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.08} className="step">
              <h3 className="disp">{s.title}</h3>
              <p className="muted">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="section wrap">
        <Reveal as="h2" className="disp h2 section-head">Reviews</Reveal>
        <div className="grid-2">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.08}>
              <figure className="card review">
                <blockquote>"{r.text}"</blockquote>
                <figcaption className="muted">{r.name}, {r.place}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
