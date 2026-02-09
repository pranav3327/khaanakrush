import { useState } from 'react';
import './MenuItemCard.css';

const FLAVORS = [
  'Smoky Chipotle',
  'Creamy Jalapeño',
  'Salsa Roja',
  'Peri-Peri Fusion'
];

export default function MenuItemCard({ item, onAdd }) {
  const [showFlavorModal, setShowFlavorModal] = useState(false);

  const handleAddClick = () => {
    if (item.category === 'TACO PICKS') {
      setShowFlavorModal(true);
    } else {
      onAdd(item);
    }
  };

  const handleFlavorSelect = (flavor) => {
    onAdd({ ...item, flavor });
    setShowFlavorModal(false);
  };

  return (
    <>
      <div className="menuCard card">
        <div className="menuImgWrap">
          <img className="menuImg" src={item.image_url} alt={item.name} loading="lazy" />
        </div>
        <div className="menuBody">
          <div className="menuName">{item.name}</div>
          <div className="menuDetails">
            <div className="menuMeta">
              <span className="menuPrice">₹{Number(item.price).toFixed(0)}</span>
              <span className="menuDot" aria-hidden="true">
                •
              </span>
              <span className="menuNote">{item.is_veg ? 'Veg' : 'Non-veg'}</span>
            </div>
            {item.description ? <div className="menuDesc">{item.description}</div> : null}
            <button className="btn btnPrimary menuAdd" type="button" onClick={handleAddClick}>
              Add to Booking
            </button>
          </div>
        </div>
      </div>

      {showFlavorModal && (
        <div className="flavorModalOverlay" onClick={() => setShowFlavorModal(false)}>
          <div className="flavorModal" onClick={e => e.stopPropagation()}>
            <h3 className="flavorModalTitle">Choose Your Flavour</h3>
            <p className="flavorModalSubtitle">Select a sauce for your {item.name}</p>
            <div className="flavorOptions">
              {FLAVORS.map(flavor => (
                <button 
                  key={flavor} 
                  className="flavorBtn"
                  onClick={() => handleFlavorSelect(flavor)}
                >
                  {flavor}
                </button>
              ))}
            </div>
            <button className="flavorCloseBtn" onClick={() => setShowFlavorModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
