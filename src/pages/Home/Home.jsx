import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { fetchMenuItems } from '../../services/menuService';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { API_BASE_URL } from '../../services/api';
import './Home.css';

/* ── curated images matched by dish name ── */
const DISH_IMAGES = {
  'Spice Circuit':               'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&q=80',
  'Masala Melt':                 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80',
  'The Crunch Riot (Signature)': 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&q=80',
  'Cheesy Veggie Quesa':         'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=400&q=80',
  'Paneer Power Quesa':          'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=400&q=80',
  'Loaded Veg Quesa':            'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=400&q=80',
  'Pinto Bean Street Taco':      'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&q=80',
  'Crispy Veg Taco':             'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80',
  'Mexican Paneer Taco':         'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=400&q=80',
  'Cheesy Nacho Crunch':         'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400&q=80',
  'White Sauce Skillet Pasta':   'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=400&q=80',
  'Brain Freeze Protocol (250 ml)': 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400&q=80',
  'Crunch Combo':                'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&q=80',
  'Power Combo':                 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&q=80',
  'Riot Combo':                  'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&q=80',
  'Quesa Combo':                 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=400&q=80',
  'Taco Duo Combo':              'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80',
};
const getImage = (item) =>
  DISH_IMAGES[item.name] ||
  'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80';

/* ═══ HERO ═══ */
function HeroSection() {
  const [videoError, setVideoError] = useState(false);

  return (
    <section className="hero" id="hero">
      {!videoError ? (
        <video
          className="hero__video"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=1400&q=80"
          onError={() => setVideoError(true)}
        >
          <source src={`${API_BASE_URL}/static/hero.mp4`} type="video/mp4" />
        </video>
      ) : (
        <div
          className="hero__poster"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=1400&q=80)` }}
        />
      )}
      <div className="hero__overlay" />
      <div className="hero__content">
        <span className="hero__pill">🌮 Now Rolling into Your Neighborhood</span>
        <h1 className="hero__heading">
          <span className="hero__line hero__line--1">Fresh Mexican.</span>
          <span className="hero__line hero__line--2">Your Doorstep.</span>
          <span className="hero__line hero__line--3">Cooked <span className="hero__red">Live.</span></span>
        </h1>
        <p className="hero__sub">
          KhaanaKrush brings a live Mexican food cart to your home,
          wedding, office party — we cook fresh, right in front of you.
        </p>
        <div className="hero__ctas">
          <Link to="/menu" className="btn btn--primary">Explore the Menu →</Link>
          <Link to="/book-event" className="btn btn--ghost">Book a Cart for Your Event</Link>
        </div>
      </div>
      <div className="hero__scroll-indicator">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>
    </section>
  );
}

/* ═══ MARQUEE ═══ */
function MarqueeStrip() {
  const row1 = '★ COOKED FRESH  •  🌮 80+ DISHES  •  🔥 LIVE AT YOUR DOOR  •  🏠 HOME & EVENTS  •  ★ 4.8 RATING  •  🎪 CART FOR PARTIES  •  ';
  const row2 = '✦ STREET TACOS  •  ✦ LOADED QUESADILLAS  •  ✦ BURRITOS  •  ✦ CHURROS  •  ✦ NACHOS SUPREME  •  ✦ ELOTE  •  ✦ HORCHATA  •  ';

  return (
    <section className="marquee" id="marquee-strip">
      <div className="marquee__row marquee__row--left">
        {[...Array(4)].map((_, i) => <span key={i}>{row1}</span>)}
      </div>
      <div className="marquee__row marquee__row--right">
        {[...Array(4)].map((_, i) => <span key={i}>{row2}</span>)}
      </div>
    </section>
  );
}

/* ═══ WHY US ═══ */
function WhySection() {
  const ref = useScrollReveal();
  const cards = [
    { icon: '🔥', title: 'Cooked Live', desc: 'Our cart rolls up to your doorstep and cooks everything fresh — right in front of you. No reheating ever.' },
    { icon: '🌮', title: 'Authentic Mexican', desc: 'From street tacos to loaded burritos — real Mexican flavors, handcrafted with fresh ingredients.' },
    { icon: '🎪', title: 'Cart Experience', desc: 'We bring the full cart setup to your home, wedding, or office event. It\'s a live food show.' },
    { icon: '⭐', title: '4.8 Star Rated', desc: '10,000+ happy experiences and counting. Our food speaks louder than our words.' },
  ];

  return (
    <section className="why" id="why-section" ref={ref}>
      <div className="section-header reveal">
        <span className="eyebrow">WHY US</span>
        <h2>The KhaanaKrush Promise</h2>
        <p className="subtitle">We don't just serve food. We bring the kitchen to you.</p>
      </div>
      <div className="why__grid stagger">
        {cards.map((c, i) => (
          <div key={i} className="why__card reveal">
            <span className="why__icon">{c.icon}</span>
            <h3>{c.title}</h3>
            <p>{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── fallback bestseller data when API is unavailable ── */
const FALLBACK_BESTSELLERS = [
  {
    id: 'fb-1',
    name: 'Spice Circuit',
    description: 'A fiery grilled wrap loaded with Mexican spices, crunchy veggies & our signature chipotle drizzle.',
    price: 179,
    is_veg: true,
    category: 'LIVE GRILL SPECIALS',
  },
  {
    id: 'fb-2',
    name: 'The Crunch Riot (Signature)',
    description: 'Our #1 bestseller — crispy tortilla stuffed with jalapeño cheese, beans & tangy salsa roja.',
    price: 199,
    is_veg: true,
    category: 'LIVE GRILL SPECIALS',
  },
  {
    id: 'fb-3',
    name: 'Paneer Power Quesa',
    description: 'Pressed quesadilla packed with spiced paneer, caramelised onions & stretchy mozzarella.',
    price: 169,
    is_veg: true,
    category: 'QUESA GRILLS',
  },
  {
    id: 'fb-4',
    name: 'Mexican Paneer Taco',
    description: 'Soft corn tortilla topped with tandoori-spiced paneer, avocado crema & pickled onions.',
    price: 149,
    is_veg: true,
    category: 'TACO PICKS',
  },
  {
    id: 'fb-5',
    name: 'Cheesy Nacho Crunch',
    description: 'Mountain of loaded nachos with jalapeño cheese sauce, pico de gallo & sour cream.',
    price: 159,
    is_veg: true,
    category: 'QUICK BITES',
  },
  {
    id: 'fb-6',
    name: 'Crunch Combo',
    description: 'Student favourite — Crunch Riot + Loaded Nachos + Brain Freeze drink. Best value meal.',
    price: 299,
    is_veg: true,
    category: 'STUDENT COMBOS',
  },
];

/* ═══ MENU PREVIEW ═══ */
function MenuPreview() {
  const [items, setItems] = useState([]);
  const ref = useScrollReveal({}, [items]);
  const { addToCart, cartItems } = useCart();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const MAIN_CATEGORIES = ['LIVE GRILL SPECIALS', 'QUESA GRILLS', 'TACO PICKS', 'QUICK BITES', 'DISH OF THE DAY', 'STUDENT COMBOS'];
    fetchMenuItems()
      .then((data) => {
        const list = Array.isArray(data) ? data : data.items || data.data || [];
        // Filter to main dishes only — no add-ons or drinks
        const mainDishes = list.filter((item) => MAIN_CATEGORIES.includes(item.category));
        setItems(mainDishes.length > 0 ? mainDishes.slice(0, 6) : FALLBACK_BESTSELLERS);
      })
      .catch(() => {
        setItems(FALLBACK_BESTSELLERS);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="menu-preview" id="menu-preview" ref={ref}>
      <div className="section-header reveal">
        <span className="eyebrow">BESTSELLERS</span>
        <h2>Dishes People Can't Stop Ordering</h2>
        <p className="subtitle">A preview of what our cart is cooking.</p>
        <Link to="/menu" className="menu-preview__viewall">View Full Menu →</Link>
      </div>
      <div className="menu-preview__grid stagger">
        {loading
          ? [...Array(6)].map((_, i) => (
              <div key={i} className="dish-card dish-card--skeleton reveal">
                <div className="skeleton" style={{ height: 200 }} />
                <div style={{ padding: 16 }}>
                  <div className="skeleton" style={{ height: 20, width: '70%', marginBottom: 8 }} />
                  <div className="skeleton" style={{ height: 14, width: '90%', marginBottom: 8 }} />
                  <div className="skeleton" style={{ height: 14, width: '50%' }} />
                </div>
              </div>
            ))
          : items.map((item) => {
              const inCart = cartItems.find((c) => c.id === item.id);
              return (
                <div key={item.id} className="dish-card reveal">
                  <div className="dish-card__img-wrap">
                    <img
                      src={getImage(item)}
                      alt={item.name}
                      loading="lazy"
                      className="dish-card__img"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80';
                      }}
                    />
                    <span className={`dish-card__badge ${item.is_veg !== false ? 'dish-card__badge--veg' : 'dish-card__badge--nonveg'}`}>
                      {item.is_veg !== false ? '🟢' : '🔴'}
                    </span>
                    {item.category === 'LIVE GRILL SPECIALS' && (
                      <span className="dish-card__bestseller">🔥 HOT</span>
                    )}
                  </div>
                  <div className="dish-card__body">
                    <h4 className="dish-card__name">{item.name}</h4>
                    <p className="dish-card__desc">{item.description || 'Freshly prepared with authentic Mexican flavors'}</p>
                    <div className="dish-card__footer">
                      <span className="dish-card__price">₹{item.price}</span>
                      <button
                        className={`dish-card__add ${inCart ? 'dish-card__add--in' : ''}`}
                        onClick={() => addToCart(item)}
                      >
                        {inCart ? `Added (${inCart.qty})` : '+ Add'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
        }
      </div>
    </section>
  );
}

/* ═══ HOW IT WORKS ═══ */
function HowItWorks() {
  const ref = useScrollReveal();
  const steps = [
    { num: '01', icon: '📱', title: 'Pick Your Dishes', desc: 'Browse our menu of 80+ fresh Mexican items. Build your perfect cart order.' },
    { num: '02', icon: '🚐', title: 'We Roll Up', desc: 'Our cart arrives at your doorstep with the full setup — grill, ingredients, chef, everything.' },
    { num: '03', icon: '🔥', title: 'Cooked & Served Live', desc: 'Watch your tacos, burritos, and quesadillas get made fresh. Eat hot, right off the grill.' },
  ];

  return (
    <section className="how" id="how-it-works" ref={ref}>
      <div className="section-header reveal">
        <span className="eyebrow eyebrow--saffron">THE PROCESS</span>
        <h2 className="how__title">From Craving to Cart in 3 Steps</h2>
      </div>
      <div className="how__steps stagger">
        {steps.map((s, i) => (
          <div key={i} className="how__step reveal">
            <span className="how__num">{s.num}</span>
            <span className="how__step-icon">{s.icon}</span>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            {i < 2 && <div className="how__connector" />}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══ EVENTS SPLIT ═══ */
function EventsSection() {
  const ref = useScrollReveal();

  return (
    <section className="events-split" id="events-section" ref={ref}>
      <div className="events-split__left reveal">
        <div className="events-split__img-main">
          <img
            src="https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=600&q=80"
            alt="Mexican food cart at event"
            loading="lazy"
          />
        </div>
        <div className="events-split__img-float">
          <img
            src="https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=300&q=80"
            alt="Fresh tacos being prepared"
            loading="lazy"
          />
        </div>
        <div className="events-split__badge-float">🎪 Available 7 Days a Week</div>
      </div>
      <div className="events-split__right reveal">
        <span className="eyebrow">FOR EVENTS & FUNCTIONS</span>
        <h2>Bring the Mexican Street Food Experience Home</h2>
        <p className="events-split__body">
          Planning a house party, wedding reception, or office lunch?
          We roll up with a full Mexican food cart — grill, chef, ingredients,
          everything — and cook fresh right in front of your guests.
        </p>
        <ul className="events-split__checks">
          <li>✓ Live cooking on a real cart, not pre-packed food</li>
          <li>✓ Menu customisable for your event</li>
          <li>✓ Serves 20–500+ guests</li>
          <li>✓ Full setup & teardown included</li>
        </ul>
        <Link to="/book-event" className="btn btn--primary">Book a Cart for Your Event →</Link>
      </div>
    </section>
  );
}

/* ═══ TESTIMONIALS ═══ */
function Testimonials() {
  const ref = useScrollReveal();
  const scrollRef = useRef(null);
  const reviews = [
    { stars: 5, text: 'The street tacos were absolutely insane. They rolled up, set up, and had food ready in 20 mins. I\'m hooked.', name: 'Aryan S.', city: 'Delhi', date: 'Mar 2025' },
    { stars: 5, text: 'Booked their cart for my sister\'s housewarming. 80 guests, everyone was raving about the quesadillas. KhaanaKrush nailed it.', name: 'Priya M.', city: 'Gurgaon', date: 'Feb 2025' },
    { stars: 5, text: 'Loaded nachos at a house party hit different. Watching them make it fresh — the vibes were unreal.', name: 'Rohan K.', city: 'Noida', date: 'Jan 2025' },
    { stars: 5, text: 'Finally, burritos that don\'t taste like leftovers. Genuinely fresh, made right in front of us.', name: 'Sneha P.', city: 'Faridabad', date: 'Dec 2024' },
    { stars: 5, text: 'Office lunch party for 40 people. The cart showed up, set up in the parking lot, and served fire tacos. Everyone was happy.', name: 'Vikram B.', city: 'Sonipat', date: 'Nov 2024' },
    { stars: 5, text: 'Churros + horchata combo at my birthday party was the highlight. Pure joy.', name: 'Anjali T.', city: 'Rohtak', date: 'Oct 2024' },
  ];

  return (
    <section className="testimonials" id="testimonials" ref={ref}>
      <div className="section-header reveal">
        <span className="eyebrow">REVIEWS</span>
        <h2>10,000 Happy Experiences</h2>
        <div className="testimonials__stars-row">
          <span className="testimonials__big-stars">★★★★★</span>
          <span className="testimonials__rating-text">4.8 average across 3,000+ reviews</span>
        </div>
      </div>
      <div className="testimonials__scroll" ref={scrollRef}>
        {reviews.map((r, i) => (
          <div key={i} className="testimonial-card reveal">
            <div className="testimonial-card__top">
              <span className="testimonial-card__stars">{'★'.repeat(r.stars)}</span>
              <span className="testimonial-card__date">{r.date}</span>
            </div>
            <p className="testimonial-card__quote">"{r.text}"</p>
            <div className="testimonial-card__author">
              <div className="testimonial-card__avatar">
                {r.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="testimonial-card__name">{r.name}, {r.city}</p>
                <p className="testimonial-card__verified">Verified Customer</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══ STATS COUNTER ═══ */
function StatsCounter() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const stats = [
    { end: 10000, suffix: '+', label: 'Happy Experiences' },
    { end: 4.8, suffix: '★', label: 'Average Rating', decimals: 1 },
    { end: 500, suffix: '+', label: 'Events Served' },
    { end: 80, suffix: '+', label: 'Menu Items' },
  ];

  return (
    <section className="stats" id="stats" ref={ref}>
      <div className="stats__inner">
        {stats.map((s, i) => (
          <div key={i} className="stats__item">
            <span className="stats__number">
              <AnimatedNumber end={s.end} visible={visible} decimals={s.decimals || 0} />{s.suffix}
            </span>
            <span className="stats__label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function AnimatedNumber({ end, visible, decimals = 0 }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!visible) return;
    let current = 0;
    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setVal(end);
        clearInterval(timer);
      } else {
        setVal(current);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [visible, end]);

  return <>{decimals > 0 ? val.toFixed(decimals) : Math.floor(val).toLocaleString()}</>;
}

/* ═══ FRANCHISE CTA ═══ */
function FranchiseCta() {
  const ref = useScrollReveal();

  return (
    <section className="franchise-cta" id="franchise-cta" ref={ref}>
      <div className="franchise-cta__inner reveal">
        <span className="eyebrow eyebrow--saffron">GROW WITH US</span>
        <h2>Own a KhaanaKrush Cart Franchise</h2>
        <p>Launch your own Mexican food cart business. We handle the brand, the training, the recipes, and the supply chain. You bring the hustle.</p>
        <div className="franchise-cta__btns">
          <Link to="/contact" className="btn btn--primary">Apply for Franchise →</Link>
          <Link to="/contact" className="btn btn--ghost-white">Learn More</Link>
        </div>
      </div>
    </section>
  );
}

/* ═══ MAIN HOME ═══ */
export default function Home() {
  return (
    <div className="page-fade">
      <HeroSection />
      <MarqueeStrip />
      <WhySection />
      <MenuPreview />
      <HowItWorks />
      <EventsSection />
      <Testimonials />
      <StatsCounter />
      <FranchiseCta />
    </div>
  );
}
