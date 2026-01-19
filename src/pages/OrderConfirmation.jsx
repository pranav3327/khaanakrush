import { Link, useParams } from 'react-router-dom';
import './OrderConfirmation.css';
import './FormPage.css';

export default function OrderConfirmation() {
  const { orderId } = useParams();

  const steps = [
    { title: 'Order Confirmed', subtitle: 'We’ve received your booking details.' },
    { title: 'Prep & Dispatch', subtitle: 'Ingredients are being prepped and cart is on the way.' },
    { title: 'Cart Arrived', subtitle: 'Our team has arrived at your location.' },
    { title: 'Cooking Live', subtitle: 'Your food is being cooked fresh on-site.' }
  ];

  return (
    <div className="pagePad">
      <div className="container">
        <div className="confirmHero card">
          <div className="confirmKicker">Order Confirmed</div>
          <div className="confirmTitle">Your KhaanaKrush order is in motion.</div>
          <div className="confirmMeta">
            <span className="confirmLabel">Order ID</span>
            <span className="confirmId">{orderId}</span>
          </div>
          <div className="confirmActions">
            <Link className="btn btnPrimary" to="/menu">
              Order More
            </Link>
            <Link className="btn btnGhost" to="/">
              Back to Home
            </Link>
          </div>
        </div>

        <div className="trackWrap card">
          <div className="trackTitle">Live Tracking</div>
          <div className="trackHint">
            Track your cart's journey to your location.
          </div>

          <div className="mapContainer" aria-label="Map showing cart location">
            <div className="mapPin">
              <div className="pinIcon">
                <div className="pinPulse" />
              </div>
              <div className="mapLabel">Cart is preparing</div>
            </div>
          </div>

          <div className="timeline" role="list">
            {steps.map((s, idx) => (
              <div className="tRow" role="listitem" key={s.title}>
                <div className="tLeft">
                  <div className={idx === 0 ? 'tDot active' : 'tDot'} aria-hidden="true" />
                  {idx < steps.length - 1 ? <div className="tLine" aria-hidden="true" /> : null}
                </div>
                <div className="tBody">
                  <div className="tTitle">{s.title}</div>
                  <div className="tSub">{s.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

