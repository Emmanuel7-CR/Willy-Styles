import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import GalleryStage from '../components/GalleryStage'
import Reveal from '../components/Reveal'
import Tilt from '../components/Tilt'
import { ArrowIcon, InstagramIcon } from '../components/Icons'
import { SITE, WORKS, WORK_FILTERS } from '../data'
import { useDocumentMeta } from '../hooks'

export default function Work() {
  useDocumentMeta(
    'Work | Fades, Twists and Beard Lineups by Willy Styles',
    'Browse recent cuts by Willy Styles: skin fades, twists, beard lineups and more, all done at home across Delta State.',
    '/work'
  )
  const [filter, setFilter] = useState('All')
  const shown = useMemo(() => WORKS.filter((w) => filter === 'All' || w.tags.includes(filter)), [filter])

  return (
    <>
      <section className="page-hero wrap">
        <p className="eyebrow">The work</p>
        <h1 className="disp h1">Fresh cuts,<br /><em>real clients.</em></h1>
      </section>

      <GalleryStage items={WORKS} />

      <section className="section wrap">
        <div className="section-head row">
          <div>
            <p className="eyebrow">Every cut</p>
            <h2 className="disp h2">Browse the archive</h2>
          </div>
          <div className="chips" role="group" aria-label="Filter work">
            {WORK_FILTERS.map((f) => (
              <button key={f} className={`chip ${f === filter ? 'on' : ''}`} aria-pressed={f === filter} onClick={() => setFilter(f)}>
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="masonry">
          {shown.map((w, i) => (
            <Reveal key={w.slug} delay={(i % 3) * 0.07} className="masonry-item">
              <Tilt as={Link} to={`/work/${w.slug}`} className="work-card" max={5}>
                <img src={w.img} alt={`${w.title} by Willy Styles`} width={w.w} height={w.h} loading="lazy" />
                <span className="work-cap">
                  <span className="disp">{w.title}</span>
                  <span className="muted">{w.category}</span>
                </span>
              </Tilt>
            </Reveal>
          ))}
        </div>
        <Reveal className="card insta">
          <div>
            <h3 className="disp">More cuts, every week</h3>
            <p className="muted">Fresh work lands on Instagram and TikTok first.</p>
          </div>
          <a href={SITE.instagram} className="btn btn-light" target="_blank" rel="noopener noreferrer">
            <InstagramIcon /> Follow {SITE.instagramHandle}
          </a>
        </Reveal>
        <Reveal className="center mt">
          <Link to="/book" className="btn btn-gold">Book a cut like this <ArrowIcon width={18} height={18} /></Link>
        </Reveal>
      </section>
    </>
  )
}
