import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { createReview } from '../../services/reviewService';
import './OrderConfirmation.css';

export default function OrderConfirmation() {
  const { orderId } = useParams();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleRating = async (stars) => {
    setRating(stars);
    setSubmitting(true);
    try {
      await createReview({ orderId, rating: stars });
      setReviewSubmitted(true);
    } catch {
      // silent fail — review is non-critical
    } finally {
      setSubmitting(false);
    }
  };

  const trackingSteps = [
    { icon: '✅', label: 'Order Received', status: 'complete' },
    { icon: '🔄', label: 'Being Prepared', status: 'active' },
    { icon: '🚐', label: 'Cart En Route', status: 'pending' },
    { icon: '🔥', label: 'Cooking Live!', status: 'pending' },
  ];

  return (
    <div className="page-fade oc-page">
      {/* CONFIRMATION HERO */}
      <section className="oc-hero">
        <div className="success-check oc-check">
          <svg viewBox="0 0 52 52" className="success-check__svg">
            <circle className="success-check__circle" cx="26" cy="26" r="25" fill="none"/>
            <path className="success-check__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
          </svg>
        </div>
        <h1>Order Placed! 🎉</h1>
        <p className="oc-order-id">Order ID: <span>#{orderId}</span></p>
        <p className="oc-sub">Your Mexican feast is being prepped. Our cart will roll up shortly!</p>
      </section>

      {/* TRACKING STEPS */}
      <section className="oc-tracking">
        <div className="oc-tracking__steps">
          {trackingSteps.map((step, i) => (
            <div key={i} className={`oc-step oc-step--${step.status}`}>
              <div className="oc-step__icon">{step.icon}</div>
              <p className="oc-step__label">{step.label}</p>
              {i < 3 && <div className="oc-step__line" />}
            </div>
          ))}
        </div>
        <p className="oc-tracking__note">🔄 Live tracking coming soon</p>
      </section>

      {/* ORDER SUMMARY */}
      <section className="oc-summary">
        <div className="oc-summary__card">
          <p className="oc-summary__eta">
            <span className="oc-summary__eta-label">Estimated Cart Arrival</span>
            <span className="oc-summary__eta-time">~30 minutes</span>
          </p>
        </div>
      </section>

      {/* CTAs */}
      <section className="oc-ctas">
        <a
          href={`https://wa.me/919876543210?text=Hi!%20I%20just%20placed%20order%20%23${orderId}.%20When%20will%20the%20cart%20arrive?`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn oc-btn--whatsapp"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Chat on WhatsApp
        </a>
        <Link to="/menu" className="btn btn--primary">Order Again →</Link>
      </section>

      {/* RATE */}
      <section className="oc-rate">
        <h3>Rate Your Experience</h3>
        {reviewSubmitted ? (
          <p className="oc-rate__thanks">Thanks for your feedback! ⭐</p>
        ) : (
          <div className="oc-rate__stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className={`oc-rate__star ${star <= (hoverRating || rating) ? 'oc-rate__star--active' : ''}`}
                onClick={() => handleRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                disabled={submitting}
                aria-label={`Rate ${star} stars`}
              >
                ★
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
