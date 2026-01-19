import { Link } from 'react-router-dom';
import './InfoPages.css';

export default function About() {
  return (
    <div className="pagePad">
      <div className="container">
        <div className="pageHeader">
          <div className="kicker">About</div>
          <h1 className="title">About KhaanaKrush</h1>
          <p className="subtitle">
            KhaanaKrush is built for premium, modern audiences who want cooked-fresh food with consistent quality —
            whether it’s a home order, an event, or a live cart setup.
          </p>
        </div>

        <div className="infoGrid">
          <section className="card infoCard">
            <div className="infoTitle">What we do</div>
            <p className="infoText">
              We bring a chef-led cart experience that’s clean, controlled, and guest-friendly. The goal is simple:
              serve food hot, fresh, and presentable — with a premium service style.
            </p>
          </section>

          <section className="card infoCard">
            <div className="infoTitle">Our standard</div>
            <ul className="infoList">
              <li>Live cooking setup that looks professional and hygienic</li>
              <li>Ingredient discipline for consistency and taste</li>
              <li>Premium packaging and clean finishing</li>
              <li>Event-ready execution with calm service</li>
            </ul>
          </section>

          <section className="card infoCard">
            <div className="infoTitle">Where we fit</div>
            <p className="infoText">
              Perfect for birthdays, house parties, corporate evenings, society events, and pop-ups. We can serve
              modern Indian favourites and curated specials designed for cart cooking.
            </p>
            <div className="btnRow">
              <Link className="btn btnPrimary" to="/book-event">
                Book for an Event
              </Link>
              <Link className="btn btnGhost" to="/contact">
                Contact Us
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

