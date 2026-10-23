import Reveal from '../components/Reveal'
import { PlusIcon, WhatsAppIcon } from '../components/Icons'
import { FAQS, SITE } from '../data'
import { useDocumentMeta } from '../hooks'

export default function Faq() {
  useDocumentMeta(
    'FAQ | Willy Styles Mobile Barber',
    'Answers about service areas, hygiene, rescheduling and booking with Willy Styles, a mobile barber in Delta State.',
    '/faq'
  )
  return (
    <>
      <section className="page-hero wrap">
        <h1 className="disp h1">Questions</h1>
      </section>
      <section className="section wrap narrow">
        <div className="faq">
          {FAQS.map((f, i) => (
            <Reveal as="details" key={f.q} className="faq-item" delay={i * 0.05} open={i === 0 ? true : undefined}>
              <summary>
                <span className="disp">{f.q}</span>
                <PlusIcon className="faq-plus" />
              </summary>
              <p className="muted">{f.a}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="end-cta">
          <h2 className="disp h2">Still have a question?</h2>
          <p className="muted">Willy replies on WhatsApp.</p>
          <a href={SITE.whatsappLink} className="btn btn-primary" target="_blank" rel="noopener noreferrer"><WhatsAppIcon /> Message on WhatsApp</a>
        </Reveal>
      </section>
    </>
  )
}
