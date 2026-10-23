import { Link } from 'react-router-dom'
import { useDocumentMeta } from '../hooks'

export default function NotFound() {
  useDocumentMeta('Page not found | Willy Styles', 'This page could not be found.', '/404')
  return (
    <section className="page-hero wrap notfound">
      <h1 className="disp h1">Page not found</h1>
      <p className="lead">The page you are looking for is not here.</p>
      <Link to="/" className="btn btn-primary">Back to home</Link>
    </section>
  )
}
