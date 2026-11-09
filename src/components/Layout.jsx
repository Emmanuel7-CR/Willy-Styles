import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { SITE } from '../data'
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from './Icons'

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
            <span className="disp">Willy Styles</span>
          </Link>
          <nav className="nav" aria-label="Main">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} className={({ isActive }) => (isActive ? 'active' : '')}>
                {n.label}
              </NavLink>
            ))}
          </nav>
          <Link to="/book" className="btn btn-primary header-cta">
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
        <div className="footer-top">
          <div>
            <div className="footer-brand">Willy Styles</div>
            <p className="muted small">Mobile barber in Sapele, serving Delta State.</p>
          </div>
          <div className="socials">
            <a href={SITE.whatsappLink} aria-label="WhatsApp" target="_blank" rel="noopener noreferrer"><WhatsAppIcon /></a>
            <a href={SITE.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer"><InstagramIcon /></a>
            <a href={SITE.tiktok} aria-label="TikTok" target="_blank" rel="noopener noreferrer"><TikTokIcon /></a>
          </div>
        </div>
        <div className="footer-bottom muted small">
          <nav className="footer-links" aria-label="Footer">
            <Link to="/work">Work</Link>
            <Link to="/services">Services</Link>
            <Link to="/about">About</Link>
            <Link to="/faq">FAQ</Link>
            <a href={`tel:+${SITE.phoneIntl}`}>{SITE.phoneDisplay}</a>
          </nav>
          <span>
            &copy; 2026 Willy Styles &middot; Built by{' '}
            <a className="credit" href="https://emmanuelwebdesign.com.ng/" target="_blank" rel="noopener">Emmanuel Web Design</a>
          </span>
        </div>
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
      <main id="main" key={pathname + '-main'} className="page">
        {children}
      </main>
      <Footer />
      <a href={SITE.whatsappLink} target="_blank" rel="noopener noreferrer" className="float-wa" aria-label="Chat on WhatsApp">
        <WhatsAppIcon width={26} height={26} />
      </a>
    </>
  )
}
