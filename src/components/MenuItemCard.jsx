import './MenuItemCard.css';

export default function MenuItemCard({ item, onAdd }) {
  return (
    <div className="menuCard card">
      <div className="menuImgWrap">
        <img className="menuImg" src={item.image_url} alt={item.name} loading="lazy" />
      </div>
      <div className="menuBody">
        <div className="menuName">{item.name}</div>
        <div className="menuMeta">
          <span className="menuPrice">₹{Number(item.price).toFixed(0)}</span>
          <span className="menuDot" aria-hidden="true">
            •
          </span>
          <span className="menuNote">{item.is_veg ? 'Veg' : 'Non-veg'}</span>
        </div>
        {item.description ? <div className="menuDesc">{item.description}</div> : null}
        <button className="btn btnPrimary menuAdd" type="button" onClick={() => onAdd(item)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

