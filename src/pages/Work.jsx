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
    'Recent cuts by Willy Styles: skin fades, twists, beard lineups and more, all done at home across Delta State.',
    '/work'
  )
  const [filter, setFilter] = useState('All')
  const shown = useMemo(() => WORKS.filter((w) => filter === 'All' || w.tags.includes(filter)), [filter])

  return (
    <>
      <section className="page-hero wrap">
        <h1 className="disp h1">Work</h1>
        <p className="lead">Recent cuts, all done at home.</p>
      </section>

      <GalleryStage items={WORKS} />

      <section className="section wrap">
        <div className="section-head row">
          <h2 className="disp h2">All cuts</h2>
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
            <Reveal key={w.slug} delay={(i % 3) * 0.06} className="masonry-item">
              <Tilt as={Link} to={`/work/${w.slug}`} className="work-card" max={4}>
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
          <p>More recent cuts are on Instagram and TikTok.</p>
          <a href={SITE.instagram} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">
            <InstagramIcon /> {SITE.instagramHandle}
          </a>
        </Reveal>
        <Reveal className="mt">
          <Link to="/book" className="btn btn-primary">Book a cut <ArrowIcon width={18} height={18} /></Link>
        </Reveal>
      </section>
    </>
  )
}
