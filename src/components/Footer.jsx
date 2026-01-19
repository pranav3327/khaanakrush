import { Link } from 'react-router-dom';
import './Footer.css';

function IconInstagram(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4A5.8 5.8 0 0 1 16.2 22H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M12 16.2a4.2 4.2 0 1 0 0-8.4 4.2 4.2 0 0 0 0 8.4Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path d="M17.6 6.4h.01" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  );
}

function IconWhatsApp(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M20 11.9A8.1 8.1 0 0 1 8.1 19.2L4 20l.9-3.9A8.1 8.1 0 1 1 20 11.9Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M9.3 8.9c-.3.2-.7.7-.7 1.2 0 1.2 1.1 2.8 2.4 4.1 1.3 1.3 2.9 2.4 4.1 2.4.5 0 1-.4 1.2-.7l.6-.9c.2-.3.1-.7-.2-.9l-1.5-.9c-.3-.2-.7-.1-.9.2l-.3.4c-.2.3-.6.4-.9.2-.6-.3-1.4-.8-2.2-1.6-.8-.8-1.3-1.6-1.6-2.2-.2-.3-.1-.7.2-.9l.4-.3c.3-.2.4-.6.2-.9l-.9-1.5c-.2-.3-.6-.4-.9-.2l-.9.6Z"
        fill="currentColor"
        opacity=".9"
      />
    </svg>
  );
}

function IconLinkedIn(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.2 3.8h15.6c.8 0 1.4.6 1.4 1.4v13.6c0 .8-.6 1.4-1.4 1.4H4.2c-.8 0-1.4-.6-1.4-1.4V5.2c0-.8.6-1.4 1.4-1.4Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path d="M7.2 10.2v7.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M7.2 6.9h.01" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
      <path
        d="M11 17.4v-4c0-1.8 1-3.2 2.8-3.2 1.9 0 2.6 1.3 2.6 3.1v4.1"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path d="M11 10.2v1.3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="footerWrap">
      <div className="container footerTop">
        <div className="footerBrand card">
          <div className="footerTitle">KhaanaKrush</div>
          <p className="footerText">
            Premium cooked-fresh cart cuisine — designed for modern homes, events, and premium gatherings.
          </p>
          <div className="footerSocial">
            <a className="socialBtn" href="https://instagram.com" target="_blank" rel="noreferrer">
              <IconInstagram />
              <span>Instagram</span>
            </a>
            <a className="socialBtn" href="https://wa.me" target="_blank" rel="noreferrer">
              <IconWhatsApp />
              <span>WhatsApp</span>
            </a>
            <a className="socialBtn" href="https://linkedin.com" target="_blank" rel="noreferrer">
              <IconLinkedIn />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        <div className="footerLinks card">
          <div className="footerTitle">Explore</div>
          <div className="linkList">
            <Link className="footerLink" to="/about">
              About Us
            </Link>
            <Link className="footerLink" to="/reviews">
              Reviews
            </Link>
            <Link className="footerLink" to="/franchise">
              Franchise
            </Link>
            <Link className="footerLink" to="/menu">
              Menu
            </Link>
            <Link className="footerLink" to="/contact">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      <div className="container footerBottom">
        <div className="footerLine" />
        <div className="footerBottomText">
          © {new Date().getFullYear()} KhaanaKrush. Crafted for cooked-fresh experiences.
        </div>
      </div>
    </footer>
  );
}

