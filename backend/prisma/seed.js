const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.menu_items.count();
  if (count > 0) {
    console.log('Database already seeded.');
    return;
  }

  console.log('Seeding menu items...');
  await prisma.menu_items.createMany({
    data: [
      {
        name: 'Paneer Tikka Skewers',
        description: 'Char-grilled paneer with spice glaze, served hot off the cart.',
        price: 220,
        image_url: '/static/menu/paneer-tikka.svg',
        is_veg: true,
        is_available: true
      },
      {
        name: 'Butter Chicken Kulcha Bowl',
        description: 'Creamy makhani chicken with soft kulcha bites and onion crunch.',
        price: 320,
        image_url: '/static/menu/butter-chicken.svg',
        is_veg: false,
        is_available: true
      },
      {
        name: 'Delhi-Style Chaat Trio',
        description: 'Tamarind, mint, and spice — a balanced chaat plate built for freshness.',
        price: 180,
        image_url: '/static/menu/chaat-trio.svg',
        is_veg: true,
        is_available: true
      },
      {
        name: 'Tawa Veg Pulao',
        description: 'Aromatic, lightly spiced pulao finished on a hot tawa with vegetables.',
        price: 210,
        image_url: '/static/menu/tawa-pulao.svg',
        is_veg: true,
        is_available: true
      },
      {
        name: 'Kebab Roll Signature',
        description: 'Juicy kebab roll with crisp onions and a tangy chutney finish.',
        price: 260,
        image_url: '/static/menu/kebab-roll.svg',
        is_veg: false,
        is_available: true
      },
      {
        name: 'Malai Corn & Cheese Cups',
        description: 'Creamy corn with cheese, served as a warm cart cup.',
        price: 160,
        image_url: '/static/menu/malai-corn.svg',
        is_veg: true,
        is_available: true
      },
      {
        name: 'Tandoori Soya Chaap',
        description: 'Smoky, marinated soya chaap with a charred, premium finish.',
        price: 240,
        image_url: '/static/menu/soya-chaap.svg',
        is_veg: true,
        is_available: true
      },
      {
        name: 'Gulab Jamun Warm Serve',
        description: 'Soft gulab jamun served warm with a delicate saffron note.',
        price: 140,
        image_url: '/static/menu/gulab-jamun.svg',
        is_veg: true,
        is_available: true
      }
    ]
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
