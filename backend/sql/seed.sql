-- KhaanaKrush Seed Data
USE khaanakrush;

INSERT INTO menu_items (name, description, price, image_url, is_veg, is_available)
VALUES
  ('Paneer Tikka Skewers', 'Char-grilled paneer with spice glaze, served hot off the cart.', 220, '/static/menu/paneer-tikka.svg', 1, 1),
  ('Butter Chicken Kulcha Bowl', 'Creamy makhani chicken with soft kulcha bites and onion crunch.', 320, '/static/menu/butter-chicken.svg', 0, 1),
  ('Delhi-Style Chaat Trio', 'Tamarind, mint, and spice — a balanced chaat plate built for freshness.', 180, '/static/menu/chaat-trio.svg', 1, 1),
  ('Tawa Veg Pulao', 'Aromatic, lightly spiced pulao finished on a hot tawa with vegetables.', 210, '/static/menu/tawa-pulao.svg', 1, 1),
  ('Kebab Roll Signature', 'Juicy kebab roll with crisp onions and a tangy chutney finish.', 260, '/static/menu/kebab-roll.svg', 0, 1),
  ('Malai Corn & Cheese Cups', 'Creamy corn with cheese, served as a warm cart cup.', 160, '/static/menu/malai-corn.svg', 1, 1),
  ('Tandoori Soya Chaap', 'Smoky, marinated soya chaap with a charred, premium finish.', 240, '/static/menu/soya-chaap.svg', 1, 1),
  ('Gulab Jamun Warm Serve', 'Soft gulab jamun served warm with a delicate saffron note.', 140, '/static/menu/gulab-jamun.svg', 1, 1);

