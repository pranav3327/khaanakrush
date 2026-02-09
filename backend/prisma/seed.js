const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({});

async function main() {
  console.log('Clearing existing data...');
  // Delete order items first to avoid foreign key constraints
  try {
    await prisma.order_items.deleteMany({});
  } catch (e) {
    console.log('No order items to delete or table does not exist yet.');
  }
  
  // Delete all existing menu items to ensure a clean slate with the new menu
  await prisma.menu_items.deleteMany({});
  
  console.log('Seeding new menu items...');
  
  const menuItems = [
    // 1. LIVE GRILL SPECIALS
    {
      name: 'Spice Circuit',
      description: 'Beans, Veggies, Mexican spice hit',
      category: 'LIVE GRILL SPECIALS',
      price: 99,
      image_url: '/static/menu/spice-circuit.svg',
      is_veg: true,
      is_available: true
    },
    {
      name: 'Masala Melt',
      description: 'Indian-spiced paneer, Grilled veggies',
      category: 'LIVE GRILL SPECIALS',
      price: 109,
      image_url: '/static/menu/masala-melt.svg',
      is_veg: true,
      is_available: true
    },
    {
      name: 'The Crunch Riot (Signature)',
      description: 'Paneer, Cheese, Crunch layer, Premium sauce',
      category: 'LIVE GRILL SPECIALS',
      price: 139,
      image_url: '/static/menu/crunch-riot.svg',
      is_veg: true,
      is_available: true
    },

    // 2. QUESA GRILLS
    {
      name: 'Cheesy Veggie Quesa',
      description: 'Veggies, Melted cheese',
      category: 'QUESA GRILLS',
      price: 119,
      image_url: '/static/menu/cheesy-veggie-quesa.svg',
      is_veg: true,
      is_available: true
    },
    {
      name: 'Paneer Power Quesa',
      description: 'Spiced paneer, Cheese',
      category: 'QUESA GRILLS',
      price: 139,
      image_url: '/static/menu/paneer-power-quesa.svg',
      is_veg: true,
      is_available: true
    },
    {
      name: 'Loaded Veg Quesa',
      description: 'Extra veg, Cheese, Sauce',
      category: 'QUESA GRILLS',
      price: 149,
      image_url: '/static/menu/loaded-veg-quesa.svg',
      is_veg: true,
      is_available: true
    },

    // 3. TACO PICKS
    {
      name: 'Pinto Bean Street Taco',
      description: 'Beans, Veggies, Salsa',
      category: 'TACO PICKS',
      price: 119,
      image_url: '/static/menu/pinto-bean-taco.svg',
      is_veg: true,
      is_available: true
    },
    {
      name: 'Crispy Veg Taco',
      description: 'Crunchy base, Veg filling',
      category: 'TACO PICKS',
      price: 129,
      image_url: '/static/menu/crispy-veg-taco.svg',
      is_veg: true,
      is_available: true
    },
    {
      name: 'Mexican Paneer Taco',
      description: 'Paneer, Sauce, Fresh crunch',
      category: 'TACO PICKS',
      price: 139,
      image_url: '/static/menu/mexican-paneer-taco.svg',
      is_veg: true,
      is_available: true
    },

    // 4. QUICK BITES
    {
      name: 'Cheesy Nacho Crunch',
      description: 'Doritos, Hot nacho cheese',
      category: 'QUICK BITES',
      price: 79,
      image_url: '/static/menu/cheesy-nacho.svg',
      is_veg: true,
      is_available: true
    },

    // 5. DISH OF THE DAY
    {
      name: 'White Sauce Skillet Pasta',
      description: 'Available for limited hours & quantity',
      category: 'DISH OF THE DAY',
      price: 139,
      image_url: '/static/menu/white-sauce-pasta.svg',
      is_veg: true,
      is_available: true
    },

    // 6. DRINKS
    {
      name: 'Brain Freeze Protocol (250 ml)',
      description: 'Refreshing cold drink',
      category: 'DRINKS',
      price: 89,
      image_url: '/static/menu/brain-freeze.svg',
      is_veg: true,
      is_available: true
    },

    // 7. STUDENT COMBOS
    {
      name: 'Crunch Combo',
      description: 'Spice Circuit + Fries',
      category: 'STUDENT COMBOS',
      price: 179,
      image_url: '/static/menu/crunch-combo.svg',
      is_veg: true,
      is_available: true
    },
    {
      name: 'Power Combo',
      description: 'Masala Melt + Fries',
      category: 'STUDENT COMBOS',
      price: 199,
      image_url: '/static/menu/power-combo.svg',
      is_veg: true,
      is_available: true
    },
    {
      name: 'Riot Combo',
      description: 'The Crunch Riot + Fries',
      category: 'STUDENT COMBOS',
      price: 229,
      image_url: '/static/menu/riot-combo.svg',
      is_veg: true,
      is_available: true
    },
    {
      name: 'Quesa Combo',
      description: 'Cheesy Veggie Quesa + Fries',
      category: 'STUDENT COMBOS',
      price: 219,
      image_url: '/static/menu/quesa-combo.svg',
      is_veg: true,
      is_available: true
    },
    {
      name: 'Taco Duo Combo',
      description: 'Any Taco (2 pcs) + Fries',
      category: 'STUDENT COMBOS',
      price: 209,
      image_url: '/static/menu/taco-duo-combo.svg',
      is_veg: true,
      is_available: true
    },
    {
      name: 'Brain Freeze Protocol Add-On',
      description: 'Add to any combo',
      category: 'STUDENT COMBOS',
      price: 49,
      image_url: '/static/menu/brain-freeze.svg',
      is_veg: true,
      is_available: true
    },

    // 8. ADD-ONS
    {
      name: 'Extra Cheese',
      description: 'Add extra cheese to your order',
      category: 'ADD-ONS',
      price: 20,
      image_url: '/static/menu/extra-cheese.svg',
      is_veg: true,
      is_available: true
    },
    {
      name: 'Extra Paneer',
      description: 'Add extra paneer to your order',
      category: 'ADD-ONS',
      price: 30,
      image_url: '/static/menu/extra-paneer.svg',
      is_veg: true,
      is_available: true
    },
    {
      name: 'Crunch Layer',
      description: 'Add an extra crunch layer',
      category: 'ADD-ONS',
      price: 15,
      image_url: '/static/menu/crunch-layer.svg',
      is_veg: true,
      is_available: true
    },
    {
      name: 'Premium Sauce',
      description: 'Add premium sauce',
      category: 'ADD-ONS',
      price: 15,
      image_url: '/static/menu/premium-sauce.svg',
      is_veg: true,
      is_available: true
    }
  ];

  await prisma.menu_items.createMany({
    data: menuItems
  });
  
  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
