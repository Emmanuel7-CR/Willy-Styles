import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { SITE } from '../data'
import { ArrowIcon, InstagramIcon, TikTokIcon, WhatsAppIcon } from './Icons'
import Cursor from './Cursor'

const NAV = [
  { to: '/work', label: 'Work' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/faq', label: 'FAQ' },
]

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const esc = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', esc)
    return () => {
      window.removeEventListener('keydown', esc)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header className={`site-header ${scrolled ? 'scrolled' : ''} ${open ? 'open' : ''}`}>
        <div className="wrap header-inner">
          <Link to="/" className="brand" aria-label="Willy Styles home">
            <span className="brand-dot" />
            <span className="disp">Willy Styles</span>
          </Link>
          <nav className="nav" aria-label="Main">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} className={({ isActive }) => (isActive ? 'active' : '')}>
                {n.label}
              </NavLink>
            ))}
          </nav>
          <Link to="/book" className="btn btn-gold header-cta">
            Book a cut
          </Link>
          <button className="burger" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>
            <span />
            <span />
          </button>
        </div>
      </header>
      <div id="mobile-menu" className="mobile-menu" hidden={!open}>
        <nav aria-label="Mobile">
          {[{ to: '/', label: 'Home' }, ...NAV, { to: '/book', label: 'Book a cut' }].map((n, i) => (
            <Link key={n.to} to={n.to} className="disp" style={{ '--i': i }}>
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-cta">
          <p className="eyebrow">Ready when you are</p>
          <Link to="/book" className="footer-big disp" data-cursor>
            Book your cut <ArrowIcon width={56} height={56} strokeWidth={1.4} />
          </Link>
        </div>
        <div className="footer-grid">
          <div>
            <div className="disp footer-brand">Willy Styles</div>
            <p className="muted">Mobile barber based in Sapele, serving all of Delta State.</p>
            <div className="socials">
              <a href={SITE.whatsappLink} aria-label="WhatsApp" target="_blank" rel="noopener noreferrer"><WhatsAppIcon /></a>
              <a href={SITE.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer"><InstagramIcon /></a>
              <a href={SITE.tiktok} aria-label="TikTok" target="_blank" rel="noopener noreferrer"><TikTokIcon /></a>
            </div>
          </div>
          <div>
            <h3 className="footer-h">Explore</h3>
            <ul className="footer-list">
              <li><Link to="/work">Work</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/book">Book</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="footer-h">Contact</h3>
            <ul className="footer-list">
              <li><a href={`tel:+${SITE.phoneIntl}`}>{SITE.phoneDisplay}</a></li>
              <li><a href={SITE.whatsappLink} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a></li>
              <li><a href={SITE.instagram} target="_blank" rel="noopener noreferrer">{SITE.instagramHandle}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="footer-h">Hours</h3>
            <ul className="footer-list muted">
              {SITE.hours.map(([d, h]) => (
                <li key={d}>{d}<br /><span>{h}</span></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-base muted">&copy; 2026 Willy Styles. Premium mobile barbing.</div>
      </div>
    </footer>
  )
}

export default function Layout({ children }) {
  const { pathname } = useLocation()
  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <Header />
      <div key={pathname} className="wipe" aria-hidden="true" />
      <main id="main" key={pathname + '-main'} className="page">
        {children}
      </main>
      <Footer />
      <a href={SITE.whatsappLink} target="_blank" rel="noopener noreferrer" className="float-wa" aria-label="Chat on WhatsApp">
        <WhatsAppIcon width={28} height={28} />
      </a>
      <Cursor />
    </>
  )
}
