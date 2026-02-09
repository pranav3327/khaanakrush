import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import MenuItemCard from '../components/MenuItemCard.jsx';
import './Menu.css';
import './FormPage.css';
import { fetchMenuItems } from '../services/menuService';
import { API_BASE_URL, getApiErrorMessage } from '../services/api';

function resolveImageUrl(url) {
  const v = String(url || '');
  if (!v) return '';
  if (v.startsWith('http://') || v.startsWith('https://')) return v;
  if (v.startsWith('/')) return `${API_BASE_URL}${v}`;
  return v;
}

const CATEGORIES = [
  { id: 'LIVE GRILL SPECIALS', title: 'Live Grill Specials', subtitle: '(Freshly grilled • Fast service)' },
  { id: 'QUESA GRILLS', title: 'Quesa Grills', subtitle: '(Pressed • Cheesy • Filling)' },
  { id: 'TACO PICKS', title: 'Taco Picks', subtitle: '(? pieces • Street style)' },
  { id: 'QUICK BITES', title: 'Quick Bites', subtitle: '' },
  { id: 'DISH OF THE DAY', title: 'Dish of the Day', subtitle: '' },
  { id: 'DRINKS', title: 'Drinks', subtitle: '' },
  { id: 'STUDENT COMBOS', title: 'Student Combos', subtitle: '(BEST VALUE)', specialClass: 'studentCombosSection' },
  { id: 'ADD-ONS', title: 'Add-Ons', subtitle: '' }
];

const FLAVORS = [
  'Smoky Chipotle',
  'Creamy Jalapeño',
  'Salsa Roja',
  'Peri-Peri Fusion'
];

export default function Menu() {
  const { addToCart } = useCart();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    async function run() {
      try {
        setLoading(true);
        setError('');
        const data = await fetchMenuItems();
        if (cancelled) return;
        const list = Array.isArray(data) ? data : data?.items || [];
        setItems(
          list.map((it) => ({
            ...it,
            image_url: resolveImageUrl(it.image_url)
          }))
        );
      } catch (err) {
        if (cancelled) return;
        setError(getApiErrorMessage(err));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, []);

  const groupedItems = CATEGORIES.reduce((acc, cat) => {
    acc[cat.id] = items.filter(i => i.category === cat.id);
    return acc;
  }, {});

  const renderCategory = (cat) => {
    const categoryItems = groupedItems[cat.id] || [];
    if (categoryItems.length === 0) return null;

    const isStudentCombos = cat.id === 'STUDENT COMBOS';
    const isDishOfTheDay = cat.id === 'DISH OF THE DAY';

    return (
      <div key={cat.id} className={isStudentCombos ? 'studentCombosSection' : 'categorySection'}>
        {isStudentCombos && <div className="studentCombosBadge">Best Value</div>}
        
        <div className="categoryHeader">
          <h2 className="categoryTitle">{cat.title}</h2>
          {cat.subtitle && !isStudentCombos && (
            <span className="categorySubtitle">{cat.subtitle}</span>
          )}
          {isDishOfTheDay && (
             <span className="limitedTimeBadge">Available for limited hours & quantity</span>
          )}
        </div>

        <div className="menuGrid">
          {categoryItems.map((it) => (
            <MenuItemCard key={it.id} item={it} onAdd={addToCart} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="pagePad">
      <div className="container">
        <div className="pageHeader">
          <div className="kicker">Pre-order Menu</div>
          <h1 className="title">Select Your Cart Menu</h1>
          <p className="subtitle">
            Choose the dishes you want us to cook at your location. We bring the cart, ingredients, and chef.
          </p>
        </div>

        <div className="menuFullWidth">
          {loading ? (
            <div className="menuState">
              <div className="menuStateTitle">Loading Menu...</div>
              <div className="menuStateText">Getting the freshest dishes for you.</div>
            </div>
          ) : error ? (
            <div className="menuState">
              <div className="menuStateTitle">Menu Unavailable</div>
              <div className="menuStateText">{error}</div>
            </div>
          ) : !items.length ? (
            <div className="menuState">
              <div className="menuStateTitle">No Items Found</div>
              <div className="menuStateText">Please check back later.</div>
            </div>
          ) : (
            <>
              {renderCategory(CATEGORIES[0])} {/* Live Grill */}
              {renderCategory(CATEGORIES[1])} {/* Quesa Grills */}
              {renderCategory(CATEGORIES[2])} {/* Taco Picks */}
              
              {/* Flavor Section */}
              <div className="flavorSection">
                <div className="flavorTitle">Choose Your Flavour</div>
                <div className="flavorList">
                  {FLAVORS.map(flavor => (
                    <span key={flavor} className="flavorItem">{flavor}</span>
                  ))}
                </div>
              </div>

              {renderCategory(CATEGORIES[3])} {/* Quick Bites */}
              {renderCategory(CATEGORIES[4])} {/* Limited Time */}
              {renderCategory(CATEGORIES[5])} {/* Drinks */}
              {renderCategory(CATEGORIES[6])} {/* Student Combos */}
              {renderCategory(CATEGORIES[7])} {/* Add-ons */}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
