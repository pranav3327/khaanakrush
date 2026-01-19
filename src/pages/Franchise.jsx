import { Link } from 'react-router-dom';
import './InfoPages.css';

export default function Franchise() {
  return (
    <div className="pagePad">
      <div className="container">
        <div className="pageHeader">
          <div className="kicker">Franchise</div>
          <h1 className="title">Franchise Opportunities</h1>
          <p className="subtitle">
            KhaanaKrush is designed to scale with a premium cart-first model — strong brand presentation, disciplined
            operations, and a menu built for consistency.
          </p>
        </div>

        <div className="infoGrid">
          <section className="card infoCard">
            <div className="infoTitle">Who this is for</div>
            <ul className="infoList">
              <li>Operators who value hygiene, premium service, and consistency</li>
              <li>City partners with access to premium residential / corporate clusters</li>
              <li>Teams that can execute events and handle peak demand smoothly</li>
            </ul>
          </section>

          <section className="card infoCard">
            <div className="infoTitle">What you get</div>
            <ul className="infoList">
              <li>Brand playbook for premium cart presentation</li>
              <li>Menu and prep guidance designed for cart cooking</li>
              <li>Launch support and operational SOP structure</li>
              <li>Marketing guidance for premium customer acquisition</li>
            </ul>
          </section>

          <section className="card infoCard">
            <div className="infoTitle">Next steps</div>
            <p className="infoText">
              Share your city and business background, and we’ll schedule a short call to evaluate fit, discuss unit
              economics, and outline the rollout plan.
            </p>
            <div className="btnRow">
              <Link className="btn btnPrimary" to="/contact">
                Contact the Team
              </Link>
              <Link className="btn btnGhost" to="/about">
                Learn About KhaanaKrush
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

