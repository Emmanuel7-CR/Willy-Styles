import { Link, useParams } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { ArrowIcon, ArrowLeftIcon } from '../components/Icons'
import { WORKS } from '../data'
import { useDocumentMeta } from '../hooks'
import NotFound from './NotFound'

export default function WorkDetail() {
  const { slug } = useParams()
  const i = WORKS.findIndex((w) => w.slug === slug)
  const w = WORKS[i]
  useDocumentMeta(
    w ? `${w.title} | Willy Styles Work` : 'Not found | Willy Styles',
    w ? `${w.title} by Willy Styles. ${w.blurb}` : '',
    `/work/${slug}`
  )
  if (!w) return <NotFound />
  const prev = WORKS[(i - 1 + WORKS.length) % WORKS.length]
  const next = WORKS[(i + 1) % WORKS.length]

  return (
    <>
      <section className="detail wrap">
        <Link to="/work" className="link-arrow back"><ArrowLeftIcon width={18} height={18} /> All work</Link>
        <div className="detail-grid">
          <div className="detail-img">
            <img src={w.img} alt={`${w.title} by Willy Styles`} width={w.w} height={w.h} />
          </div>
          <div className="detail-text">
            <p className="muted">{w.category}</p>
            <h1 className="disp h1">{w.title}</h1>
            <p className="lead">{w.blurb}</p>
            <ul className="ticks">
              {w.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <div className="hero-actions">
              <Link to={`/book?service=${encodeURIComponent(w.service)}`} className="btn btn-primary">
                Book this style <ArrowIcon width={18} height={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="wrap pager">
        <Link to={`/work/${prev.slug}`} className="pager-link">
          <span className="muted">Previous</span>
          <span className="disp">{prev.title}</span>
        </Link>
        <Link to={`/work/${next.slug}`} className="pager-link right">
          <span className="muted">Next</span>
          <span className="disp">{next.title}</span>
        </Link>
      </section>
    </>
  )
}
