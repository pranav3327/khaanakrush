import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { fetchMenuItems } from '../services/menuService';
import { API_BASE_URL } from '../services/api';
import './Home.css';
import coffeeBeansBg from '../assets/coffee-beans.svg';
import heroDrink from '../assets/hero-drink.svg';
import heroFood from '../assets/hero-food.svg';
import mexicanFood from '../assets/mexican-food.svg';

function resolveImageUrl(url) {
  const v = String(url || '');
  if (!v) return '';
  if (v.startsWith('http://') || v.startsWith('https://')) return v;
  if (v.startsWith('/')) return `${API_BASE_URL}${v}`;
  return v;
}

export default function Home() {
  const { addToCart } = useCart();
  const [dishOfTheDay, setDishOfTheDay] = useState(null);

  useEffect(() => {
    async function loadDish() {
      try {
        const data = await fetchMenuItems();
        const list = Array.isArray(data) ? data : data?.items || [];
        // Find the first item in 'DISH OF THE DAY' category
        const found = list.find(i => i.category === 'DISH OF THE DAY');
        if (found) {
          setDishOfTheDay({
            ...found,
            image_url: resolveImageUrl(found.image_url)
          });
        }
      } catch (err) {
        console.error('Failed to load dish of the day:', err);
      }
    }
    loadDish();
  }, []);

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
          <div className="heroLeft animate-enter">
            <div className="heroKicker">Premium cooked-fresh carts</div>
            <h1 className="heroHeadline">WE COME TO YOU.<br/>COOK IT FRESH.<br/><span className="highlight text-gradient-gold">ON SITE.</span></h1>
            <p className="subtitle">
              KhaanaKrush brings the kitchen to your venue. No delivery boxes — just a premium cart, live cooking, and hot serving at your home or event.
            </p>
            <div className="btnRow">
              <Link className="btn btnPrimary" to="/menu">
                Pre-order Menu
              </Link>
              <Link className="btn btnGhost" to="/reserve-cart">
                Reserve a Slot
              </Link>
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

          <div className="heroRight animate-enter" style={{ animationDelay: '0.2s' }}>
             {dishOfTheDay && (
               <div className="dishCard">
                  <div className="dishCardGlow"></div>
                  <div className="dishCardImage">
                    <img src={dishOfTheDay.image_url} alt={dishOfTheDay.name} />
                  </div>
                  <div className="dishCardContent">
                    <div className="dishTag">Dish of the Day</div>
                    <h3 className="dishTitle">{dishOfTheDay.name}</h3>
                    <p className="dishDesc">{dishOfTheDay.description}</p>
                    <div className="dishMeta">
                       <span className="dishPrice">₹{Number(dishOfTheDay.price).toFixed(0)}</span>
                       <button type="button" className="dishBtn" onClick={() => addToCart(dishOfTheDay)}>
                         Add +
                       </button>
                    </div>
                  </div>
               </div>
             )}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="heroPanel glass-panel animate-enter" style={{ padding: '40px', animationDelay: '0.3s' }}>
            <div className="panelTop" style={{ justifyContent: 'center', marginBottom: '40px' }}>
              <div className="panelTitle text-gradient-gold" style={{ fontSize: '32px' }}>How It Works</div>
            </div>
            
            <div className="panelSteps">
              <div className="panelStep hover-lift">
                <div className="panelNum">01</div>
                <div>
                  <div className="panelStepTitle">Book Your Slot</div>
                  <div className="panelStepText">Pre-order your menu or reserve a cart for your specific date.</div>
                </div>
              </div>
              
              <div className="panelStep hover-lift">
                <div className="panelNum">02</div>
                <div>
                  <div className="panelStepTitle">We Prep & Arrive</div>
                  <div className="panelStepText">We do the prep work at our base, then bring the cart to you.</div>
                </div>
              </div>
              
              <div className="panelStep hover-lift">
                <div className="panelNum">03</div>
                <div>
                  <div className="panelStepTitle">Cooked On-Site</div>
                  <div className="panelStepText">Served hot, plated clean, and cooked fresh right in front of your guests.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container animate-enter" style={{ animationDelay: '0.4s' }}>
          <div className="kicker">Why KhaanaKrush</div>
          <h2 className="title">Luxury service, modern taste.</h2>
          <p className="subtitle">
            Our cart-first model keeps food hot, fresh, and theatrical — with a calm, premium service style.
            Whether you’re ordering for home or hosting an event, we bring the experience with consistency.
          </p>

          <div className="featureGrid">
            <div className="feature glass-card">
              <div className="featureIcon" aria-hidden="true" />
              <div className="featureTitle">Cooked in sight</div>
              <div className="featureText">
                Live cart cooking brings trust and freshness — a premium touch your guests remember.
              </div>
            </div>
            <div className="feature glass-card">
              <div className="featureIcon" aria-hidden="true" />
              <div className="featureTitle">Disciplined hygiene</div>
              <div className="featureText">
                Clean setup, controlled processes, and consistent plating for a modern Indian audience.
              </div>
            </div>
            <div className="feature glass-card">
              <div className="featureIcon" aria-hidden="true" />
              <div className="featureTitle">Event-ready by design</div>
              <div className="featureText">
                From cart reservations to event bookings, our flow is built for premium execution.
              </div>
            </div>
          </div>

          <div className="ctaBar glass-card">
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

