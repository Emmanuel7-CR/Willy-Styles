import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PhoneIcon, WhatsAppIcon } from '../components/Icons'
import { SERVICES, SITE } from '../data'
import { useDocumentMeta } from '../hooks'

export default function Book() {
  useDocumentMeta(
    'Book a Home Haircut | Willy Styles Mobile Barber',
    'Book a home service haircut in Sapele, Warri, Ughelli, Oghara or elsewhere in Delta State. Send your request on WhatsApp.',
    '/book'
  )
  const [params] = useSearchParams()
  const initial = SERVICES.find((s) => s.id === params.get('service'))?.id || SERVICES[0].id
  const [form, setForm] = useState({ name: '', area: '', service: initial, time: '', notes: '' })
  const [link, setLink] = useState('')

  const minTime = useMemo(() => {
    const d = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    return d.toISOString().slice(0, 16)
  }, [])
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    const when = new Date(form.time).toLocaleString('en-NG', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
    const svc = SERVICES.find((s) => s.id === form.service)?.name || form.service
    const msg = `*NEW BOOKING REQUEST*\n\n*Client:* ${form.name.trim()}\n*Location:* ${form.area.trim()}\n*Service:* ${svc}\n*Preferred time:* ${when}${form.notes.trim() ? `\n*Notes:* ${form.notes.trim()}` : ''}\n\nPlease confirm availability. Thank you!`
    const url = `https://wa.me/${SITE.phoneIntl}?text=${encodeURIComponent(msg)}`
    setLink(url)
    const w = window.open(url, '_blank', 'noopener')
    if (w) w.opener = null
  }

  return (
    <>
      <section className="page-hero wrap">
        <h1 className="disp h1">Book a cut</h1>
        <p className="lead">Fill this in and your request opens in WhatsApp, ready to send. Willy confirms a time there.</p>
      </section>

      <section className="section wrap book-grid">
        <form className="card form" onSubmit={submit}>
          <div className="field">
            <label htmlFor="name">Your name</label>
            <input id="name" required autoComplete="name" value={form.name} onChange={set('name')} placeholder="Your full name" />
          </div>
          <div className="field">
            <label htmlFor="area">Your area in Delta State</label>
            <input id="area" required value={form.area} onChange={set('area')} placeholder="e.g. Sapele Town, Warri GRA" />
          </div>
          <div className="field">
            <label htmlFor="service">Service</label>
            <select id="service" value={form.service} onChange={set('service')}>
              {SERVICES.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="time">Preferred date and time</label>
            <input id="time" type="datetime-local" required min={minTime} value={form.time} onChange={set('time')} />
          </div>
          <div className="field">
            <label htmlFor="notes">Anything Willy should know? <span className="muted">(optional)</span></label>
            <textarea id="notes" rows="3" value={form.notes} onChange={set('notes')} placeholder="Style you want, door description, parking and so on" />
          </div>
          <button className="btn btn-primary wide" type="submit"><WhatsAppIcon /> Send booking on WhatsApp</button>
          <p className="muted small" role="status" aria-live="polite">
            {link ? (
              <>Didn't open? <a className="u" href={link} target="_blank" rel="noopener noreferrer">Tap here to open WhatsApp</a>.</>
            ) : (
              'You will be taken to WhatsApp to send the request.'
            )}
          </p>
        </form>

        <aside className="book-side">
          <img className="book-photo" src="/assets/cut-1.jpg" alt="A fresh fade, cut at home" width="1080" height="1009" />
          <div className="card contact">
            <h2 className="disp h3">Prefer to talk?</h2>
            <a href={`tel:+${SITE.phoneIntl}`} className="contact-row"><PhoneIcon /> {SITE.phoneDisplay}</a>
            <a href={SITE.whatsappLink} className="contact-row" target="_blank" rel="noopener noreferrer"><WhatsAppIcon /> Chat on WhatsApp</a>
            <ul className="hours">
              {SITE.hours.map(([d, h]) => (
                <li key={d}><span>{d}</span><span>{h}</span></li>
              ))}
            </ul>
          </div>
        </aside>
      </section>
    </>
  )
}
