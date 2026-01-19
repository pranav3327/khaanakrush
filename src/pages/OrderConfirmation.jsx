import { Link, useParams } from 'react-router-dom';
import './OrderConfirmation.css';
import './FormPage.css';

export default function OrderConfirmation() {
  const { orderId } = useParams();

  const steps = [
    { title: 'Order placed', subtitle: 'We’ve received your order and confirmed details.' },
    { title: 'Food being prepared', subtitle: 'Your items are being cooked fresh in sequence.' },
    { title: 'Cart on the way', subtitle: 'The cart is dispatched and headed to your location.' },
    { title: 'Delivered', subtitle: 'Hot, fresh, and ready to enjoy.' }
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
          <div className="trackTitle">Live Tracking (UI preview)</div>
          <div className="trackHint">
            This is a static layout for now — real-time updates can be added later.
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

