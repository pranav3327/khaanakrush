const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({});

async function main() {
  console.log('Clearing existing menu items...');
  // Delete all existing items to ensure clean slate with new structure
  await prisma.menu_items.deleteMany({});

  console.log('Seeding new menu items...');
  
  const menuItems = [
    // 1. LIVE GRILL SPECIALS
    {
      name: 'Spice Circuit',
      description: 'Beans • Veggies • Mexican spice hit',
      price: 99,
      category: 'LIVE GRILL SPECIALS',
      image_url: '/static/menu/spice-circuit.svg', // Placeholder
      is_veg: true,
      is_available: true
    },
    {
      name: 'Masala Melt',
      description: 'Indian-spiced paneer • Grilled veggies',
      price: 109,
      category: 'LIVE GRILL SPECIALS',
      image_url: '/static/menu/masala-melt.svg', // Placeholder
      is_veg: true,
      is_available: true
    },
    {
      name: 'The Crunch Riot (Signature)',
      description: 'Paneer • Cheese • Crunch layer • Premium sauce',
      price: 139,
      category: 'LIVE GRILL SPECIALS',
      image_url: '/static/menu/crunch-riot.svg', // Placeholder
      is_veg: true,
      is_available: true
    },

    // 2. QUESA GRILLS
    {
      name: 'Cheesy Veggie Quesa',
      description: 'Veggies • Melted cheese',
      price: 119,
      category: 'QUESA GRILLS',
      image_url: '/static/menu/cheesy-veggie-quesa.svg',
      is_veg: true,
      is_available: true
    },
    {
      name: 'Paneer Power Quesa',
      description: 'Spiced paneer • Cheese',
      price: 139,
      category: 'QUESA GRILLS',
      image_url: '/static/menu/paneer-power-quesa.svg',
      is_veg: true,
      is_available: true
    },
    {
      name: 'Loaded Veg Quesa',
      description: 'Extra veg • Cheese • Sauce',
      price: 149,
      category: 'QUESA GRILLS',
      image_url: '/static/menu/loaded-veg-quesa.svg',
      is_veg: true,
      is_available: true
    },

    // 3. TACO PICKS
    {
      name: 'Pinto Bean Street Taco',
      description: 'Beans • Veggies • Salsa',
      price: 119,
      category: 'TACO PICKS',
      image_url: '/static/menu/pinto-bean-taco.svg',
      is_veg: true,
      is_available: true
    },
    {
      name: 'Crispy Veg Taco',
      description: 'Crunchy base • Veg filling',
      price: 129,
      category: 'TACO PICKS',
      image_url: '/static/menu/crispy-veg-taco.svg',
      is_veg: true,
      is_available: true
    },
    {
      name: 'Mexican Paneer Taco',
      description: 'Paneer • Sauce • Fresh crunch',
      price: 139,
      category: 'TACO PICKS',
      image_url: '/static/menu/mexican-paneer-taco.svg',
      is_veg: true,
      is_available: true
    },

    // 4. QUICK BITES
    {
      name: 'Cheesy Nacho Crunch',
      description: 'Doritos • Hot nacho cheese',
      price: 79,
      category: 'QUICK BITES',
      image_url: '/static/menu/nachos.svg',
      is_veg: true,
      is_available: true
    },

    // 5. LIMITED-TIME SPECIAL
    {
      name: 'White Sauce Skillet Pasta',
      description: 'Creamy white sauce pasta',
      price: 139,
      category: 'LIMITED-TIME SPECIAL',
      image_url: '/static/menu/pasta.svg',
      is_veg: true,
      is_available: true
    },

    // 6. DRINKS
    {
      name: 'Brain Freeze Protocol',
      description: '250 ml',
      price: 89,
      category: 'DRINKS',
      image_url: '/static/menu/drink.svg',
      is_veg: true,
      is_available: true
    },

    // 7. STUDENT COMBOS
    {
      name: 'Crunch Combo',
      description: 'Spice Circuit + Fries',
      price: 179,
      category: 'STUDENT COMBOS',
      image_url: '/static/menu/combo.svg',
      is_veg: true,
      is_available: true
    },
    {
      name: 'Power Combo',
      description: 'Masala Melt + Fries',
      price: 199,
      category: 'STUDENT COMBOS',
      image_url: '/static/menu/combo.svg',
      is_veg: true,
      is_available: true
    },
    {
      name: 'Riot Combo',
      description: 'The Crunch Riot + Fries',
      price: 229,
      category: 'STUDENT COMBOS',
      image_url: '/static/menu/combo.svg',
      is_veg: true,
      is_available: true
    },
    {
      name: 'Quesa Combo',
      description: 'Cheesy Veggie Quesa + Fries',
      price: 219,
      category: 'STUDENT COMBOS',
      image_url: '/static/menu/combo.svg',
      is_veg: true,
      is_available: true
    },
    {
      name: 'Taco Duo Combo',
      description: 'Any Taco (2 pcs) + Fries',
      price: 209,
      category: 'STUDENT COMBOS',
      image_url: '/static/menu/combo.svg',
      is_veg: true,
      is_available: true
    },
    {
      name: 'Brain Freeze Protocol Add-On',
      description: 'Add to any combo',
      price: 49,
      category: 'STUDENT COMBOS',
      image_url: '/static/menu/drink-addon.svg',
      is_veg: true,
      is_available: true
    },

    // 8. ADD-ONS
    {
      name: 'Extra Cheese',
      description: 'Add-on',
      price: 20,
      category: 'ADD-ONS',
      image_url: '/static/menu/cheese.svg',
      is_veg: true,
      is_available: true
    },
    {
      name: 'Extra Paneer',
      description: 'Add-on',
      price: 30,
      category: 'ADD-ONS',
      image_url: '/static/menu/paneer.svg',
      is_veg: true,
      is_available: true
    },
    {
      name: 'Crunch Layer',
      description: 'Add-on',
      price: 15,
      category: 'ADD-ONS',
      image_url: '/static/menu/crunch.svg',
      is_veg: true,
      is_available: true
    },
    {
      name: 'Premium Sauce',
      description: 'Add-on',
      price: 15,
      category: 'ADD-ONS',
      image_url: '/static/menu/sauce.svg',
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
