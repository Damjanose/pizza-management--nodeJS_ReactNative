import { prisma } from '../utils/prisma';

async function main() {
  await prisma.user.createMany({
    data: [
      { name: 'waiter', password: 'waiter', role: 'waiter' },
      { name: 'cooker', password: 'cooker', role: 'cooker' },
    ],
    skipDuplicates: true,
  });
  console.log('Seeded users!');

  // Seed ingredients
  await prisma.ingredient.createMany({
    data: [
      { name: 'Mozzarella Cheese' },
      { name: 'Pepperoni' },
      { name: 'Mushrooms' },
      { name: 'Bell Peppers' },
      { name: 'Italian Sausage' },
      { name: 'Onions' },
      { name: 'Black Olives' },
      { name: 'Fresh Basil' },
      { name: 'Tomatoes' },
      { name: 'Pineapple' },
      { name: 'Ham' },
      { name: 'Jalapeños' },
      { name: 'Bacon' },
      { name: 'Spinach' },
      { name: 'Garlic' },
    ],
    skipDuplicates: true,
  });
  console.log('Seeded ingredients!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });