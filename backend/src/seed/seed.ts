import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Clear existing data
  await prisma.orderIngredient.deleteMany();
  await prisma.order.deleteMany();
  await prisma.ingredient.deleteMany();

  // Seed ingredients
  const ingredients = await prisma.ingredient.createMany({
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
  });

  console.log(`✅ Created ${ingredients.count} ingredients`);

  // Get all ingredients for sample orders
  const allIngredients = await prisma.ingredient.findMany();

  // Create sample orders
  const sampleOrders = [
    {
      tableNumber: 1,
      ingredientIds: [1, 2, 3], // Mozzarella, Pepperoni, Mushrooms
      status: 'WAITING' as const,
    },
    {
      tableNumber: 2,
      ingredientIds: [1, 4, 5, 6], // Mozzarella, Bell Peppers, Italian Sausage, Onions
      status: 'CONFIRMED' as const,
    },
    {
      tableNumber: 3,
      ingredientIds: [1, 10, 11], // Mozzarella, Pineapple, Ham
      status: 'READY' as const,
    },
  ];

  for (const orderData of sampleOrders) {
    await prisma.order.create({
      data: {
        tableNumber: orderData.tableNumber,
        status: orderData.status,
        ingredients: {
          create: orderData.ingredientIds.map(ingredientId => ({
            ingredientId,
          })),
        },
      },
    });
  }

  console.log(`✅ Created ${sampleOrders.length} sample orders`);
  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });