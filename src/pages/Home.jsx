import { Link } from 'react-router-dom';
import './Home.css';
import coffeeBeansBg from '../assets/coffee-beans.svg';
import heroDrink from '../assets/hero-drink.svg';
import heroFood from '../assets/hero-food.svg';

export default function Home() {
  return (
    <div>
      <section className="section hero">
        <div
          className="heroBackdrop"
          aria-hidden="true"
          style={{
            '--coffeeBg': `url(${coffeeBeansBg})`,
            '--drinkBg': `url(${heroDrink})`,
            '--foodBg': `url(${heroFood})`
          }}
        >
          <div className="heroBgOverlay" />
        </div>

        <div className="container heroGrid">
          <div className="heroLeft">
            <div className="heroKicker">Premium cooked-fresh carts</div>
            <h1 className="heroHeadline">SEE IT COOKED. EAT IT FRESH. ANYWHERE.</h1>
            <p className="subtitle">
              KhaanaKrush delivers a premium cooked-fresh experience — hot serving, modern presentation, and a
              cart setup designed for homes, pop-ups, and events.
            </p>
            <div className="btnRow">
              <Link className="btn heroBtnPrimary" to="/menu">
                Order Now
              </Link>
              <Link className="btn heroBtnGhost" to="/reserve-cart">
                Reserve a Cart
              </Link>
            </div>
            <div className="heroCtaMeta">
              <div className="heroMetaBlock">
                <div className="heroMetaTitle">Fast ordering</div>
                <div className="heroMetaText">Curated menu for premium delivery</div>
              </div>
              <div className="heroMetaBlock">
                <div className="heroMetaTitle">Events & bookings</div>
                <div className="heroMetaText">Cart setup for gatherings and launches</div>
              </div>
            </div>
            <div className="heroBadges">
              <div className="badge">
                <span className="badgeDot" />
                Live cooking setup
              </div>
              <div className="badge">
                <span className="badgeDot" />
                Premium packaging
              </div>
              <div className="badge">
                <span className="badgeDot" />
                Event-ready service
              </div>
            </div>
          </div>

          <div className="heroRight card">
            <div className="heroPanel">
              <div className="panelTop">
                <div className="panelTitle">Featured today</div>
                <div className="panelTag">Vibrant, premium, and cart-ready</div>
              </div>

              <div className="panelList">
                <div className="panelItem">
                  <div className="panelItemName">Cold Coffee</div>
                  <div className="panelItemMeta">Chilled • smooth finish • premium presentation</div>
                </div>
                <div className="panelItem">
                  <div className="panelItemName">Mexican Street Plate</div>
                  <div className="panelItemMeta">Crisp • spicy • modern flavours</div>
                </div>
              </div>

              <div className="panelDivider" />

              <div className="panelSteps">
                <div className="panelStep">
                  <div className="panelNum">01</div>
                  <div>
                    <div className="panelStepTitle">Order or book</div>
                    <div className="panelStepText">Choose menu items or reserve a cart for your date.</div>
                  </div>
                </div>
                <div className="panelStep">
                  <div className="panelNum">02</div>
                  <div>
                    <div className="panelStepTitle">Cooked fresh</div>
                    <div className="panelStepText">Disciplined, clean cooking flow with premium serving.</div>
                  </div>
                </div>
                <div className="panelStep">
                  <div className="panelNum">03</div>
                  <div>
                    <div className="panelStepTitle">Delivered hot</div>
                    <div className="panelStepText">Served hot, plated clean, and timed for your gathering.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="kicker">Why KhaanaKrush</div>
          <h2 className="title">Luxury service, modern taste.</h2>
          <p className="subtitle">
            Our cart-first model keeps food hot, fresh, and theatrical — with a calm, premium service style.
            Whether you’re ordering for home or hosting an event, we bring the experience with consistency.
          </p>

          <div className="featureGrid">
            <div className="feature card">
              <div className="featureIcon" aria-hidden="true" />
              <div className="featureTitle">Cooked in sight</div>
              <div className="featureText">
                Live cart cooking brings trust and freshness — a premium touch your guests remember.
              </div>
            </div>
            <div className="feature card">
              <div className="featureIcon" aria-hidden="true" />
              <div className="featureTitle">Disciplined hygiene</div>
              <div className="featureText">
                Clean setup, controlled processes, and consistent plating for a modern Indian audience.
              </div>
            </div>
            <div className="feature card">
              <div className="featureIcon" aria-hidden="true" />
              <div className="featureTitle">Event-ready by design</div>
              <div className="featureText">
                From cart reservations to event bookings, our flow is built for premium execution.
              </div>
            </div>
          </div>

          <div className="ctaBar card">
            <div>
              <div className="ctaTitle">Planning an event?</div>
              <div className="ctaText">Tell us your date, location, and guest count — we’ll handle the cart setup.</div>
            </div>
            <Link className="btn btnPrimary" to="/book-event">
              Book for an Event
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

