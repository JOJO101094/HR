const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  try {
    // Clear existing data
    await prisma.payment.deleteMany({});
    await prisma.saleItem.deleteMany({});
    await prisma.sale.deleteMany({});
    await prisma.inventoryLog.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.category.deleteMany({});
    await prisma.customer.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.settings.deleteMany({});

    // Create admin user
    const hashedPassword = await bcrypt.hash('123456', 10);
    
    const adminUser = await prisma.user.create({
      data: {
        email: 'admin@pos.com',
        password: hashedPassword,
        name: 'Admin User',
        role: 'admin',
        isActive: true,
      },
    });

    const cashierUser = await prisma.user.create({
      data: {
        email: 'cashier@pos.com',
        password: hashedPassword,
        name: 'Cashier User',
        role: 'cashier',
        isActive: true,
      },
    });

    const warehouseUser = await prisma.user.create({
      data: {
        email: 'warehouse@pos.com',
        password: hashedPassword,
        name: 'Warehouse User',
        role: 'warehouse',
        isActive: true,
      },
    });

    // Create categories
    const categories = await Promise.all([
      prisma.category.create({
        data: {
          name: 'Cement & Concrete',
          description: 'Cement, concrete, and related materials',
        },
      }),
      prisma.category.create({
        data: {
          name: 'Steel & Iron',
          description: 'Steel bars, plates, and iron materials',
        },
      }),
      prisma.category.create({
        data: {
          name: 'Bricks & Tiles',
          description: 'Bricks, tiles, and masonry materials',
        },
      }),
      prisma.category.create({
        data: {
          name: 'Wood & Lumber',
          description: 'Wood, lumber, and timber materials',
        },
      }),
      prisma.category.create({
        data: {
          name: 'Tools & Equipment',
          description: 'Hand tools and equipment',
        },
      }),
      prisma.category.create({
        data: {
          name: 'Paint & Coating',
          description: 'Paint, varnish, and coatings',
        },
      }),
    ]);

    // Create sample products
    const products = await Promise.all([
      prisma.product.create({
        data: {
          name: 'Portland Cement 50kg',
          description: 'High-quality Portland cement',
          sku: 'CEMENT-001',
          barcode: '1234567890001',
          categoryId: categories[0].id,
          cost: 120,
          markup: 25, // 25% markup
          price: 150, // Base price
          price1: 140, // Wholesale (10% discount)
          price2: 150, // Regular
          price3: 160, // Premium (VIP)
          quantity: 100,
        },
      }),
      prisma.product.create({
        data: {
          name: 'Steel Bar 12mm',
          description: 'Steel reinforcement bar 12mm',
          sku: 'STEEL-001',
          barcode: '1234567890002',
          categoryId: categories[1].id,
          cost: 35,
          markup: 30,
          price: 45,
          price1: 42,
          price2: 45,
          price3: 48,
          quantity: 50,
        },
      }),
      prisma.product.create({
        data: {
          name: 'Red Brick',
          description: 'Standard red brick',
          sku: 'BRICK-001',
          barcode: '1234567890003',
          categoryId: categories[2].id,
          cost: 3,
          markup: 67,
          price: 5,
          price1: 4.5,
          price2: 5,
          price3: 5.5,
          quantity: 500,
        },
      }),
      prisma.product.create({
        data: {
          name: 'Wood Plank 2x4',
          description: 'Wooden plank 2x4 inches',
          sku: 'WOOD-001',
          barcode: '1234567890004',
          categoryId: categories[3].id,
          cost: 15,
          markup: 67,
          price: 25,
          price1: 23,
          price2: 25,
          price3: 28,
          quantity: 200,
        },
      }),
      prisma.product.create({
        data: {
          name: 'Power Drill',
          description: 'Professional power drill',
          sku: 'TOOL-001',
          barcode: '1234567890005',
          categoryId: categories[4].id,
          cost: 200,
          markup: 50,
          price: 300,
          price1: 280,
          price2: 300,
          price3: 330,
          quantity: 15,
        },
      }),
      prisma.product.create({
        data: {
          name: 'Acrylic Paint 5L',
          description: 'Premium acrylic paint',
          sku: 'PAINT-001',
          barcode: '1234567890006',
          categoryId: categories[5].id,
          cost: 50,
          markup: 60,
          price: 80,
          price1: 75,
          price2: 80,
          price3: 90,
          quantity: 30,
        },
      }),
    ]);

    // Create sample customers
    const customers = await Promise.all([
      prisma.customer.create({
        data: {
          name: 'Thongchai Construction',
          phone: '02-1234567',
          email: 'thongchai@construction.com',
          address: 'Bangkok, Thailand',
          debt: 5000,
        },
      }),
      prisma.customer.create({
        data: {
          name: 'Somsak Builders',
          phone: '08-9876543',
          email: 'somsak@builders.com',
          address: 'Chiang Mai, Thailand',
          debt: 0,
        },
      }),
    ]);

    // Create store settings
    await prisma.settings.create({
      data: {
        storeName: 'Construction Store',
        storePhone: '02-1111111',
        storeAddress: 'Bangkok, Thailand',
        currency: 'THB',
        taxRate: 7,
        receiptHeader: 'CONSTRUCTION STORE',
        receiptFooter: 'Thank you for your purchase!',
        darkMode: false,
      },
    });

    console.log('✅ Database seed completed successfully!');
    console.log(`✅ Created Admin User: admin@pos.com / 123456`);
    console.log(`✅ Created Cashier User: cashier@pos.com / 123456`);
    console.log(`✅ Created Warehouse User: warehouse@pos.com / 123456`);
    console.log(`✅ Created ${categories.length} categories`);
    console.log(`✅ Created ${products.length} products`);
    console.log(`✅ Created ${customers.length} customers`);
  } catch (e) {
    console.error('Error seeding database:', e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
