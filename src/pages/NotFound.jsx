import { Link } from 'react-router-dom'
import { useDocumentMeta } from '../hooks'

export default function NotFound() {
  useDocumentMeta('Page not found | Willy Styles', 'This page could not be found.', '/404')
  return (
    <section className="page-hero wrap notfound">
      <p className="eyebrow">404</p>
      <h1 className="disp h1">That page got<br /><em>trimmed.</em></h1>
      <Link to="/" className="btn btn-gold">Back home</Link>
    </section>
  )
}
