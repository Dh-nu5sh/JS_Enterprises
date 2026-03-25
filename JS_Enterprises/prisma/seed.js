const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('Clearing existing data...')
  await prisma.orderItem.deleteMany({})
  await prisma.order.deleteMany({})
  await prisma.wishlist.deleteMany({})
  await prisma.product.deleteMany({})
  await prisma.category.deleteMany({})

  console.log('Seeding categories...')
  
  const kidsClothing = await prisma.category.create({
    data: {
      name: 'Kids Clothing',
      slug: 'kids-clothing',
      description: 'Premium wear for boys and girls'
    }
  })

  const kidsToys = await prisma.category.create({
    data: {
      name: 'Kids Toys',
      slug: 'kids-toys',
      description: 'Educational and fun toys for all ages'
    }
  })

  const womenLehengas = await prisma.category.create({
    data: {
      name: 'Women Lehengas',
      slug: 'women-lehengas',
      description: 'Bridal and festive lehengas'
    }
  })

  const sarees = await prisma.category.create({
    data: {
      name: 'Sarees',
      slug: 'sarees',
      description: 'Elegant silk and designer sarees'
    }
  })

  console.log('Seeding products...')

  const products = [
    // Kids Clothing
    {
      name: 'Boys Cotton Party Suit',
      slug: 'boys-party-suit',
      description: 'A stylish 3-piece suit set for young boys, perfect for weddings and parties.',
      price: 249900, // ₹2,499
      images: ['https://images.unsplash.com/photo-1519278470571-ce41f450bc3b?q=80&w=800'],
      categoryId: kidsClothing.id,
      inventoryCount: 50
    },
    {
      name: 'Girls Floral Summer Dress',
      slug: 'girls-floral-dress',
      description: 'Beautiful cotton floral dress with a ribbon bow, ideal for summer outings.',
      price: 129900, // ₹1,299
      images: ['https://images.unsplash.com/photo-1621454523226-eb3013c24117?q=80&w=800'],
      categoryId: kidsClothing.id,
      inventoryCount: 40
    },
    // Kids Toys
    {
      name: 'Educational Building Blocks',
      slug: 'building-blocks',
      description: '100-piece wooden building blocks set for creative development.',
      price: 89900, // ₹899
      images: ['https://images.unsplash.com/photo-1587654062353-ef92095593e8?q=80&w=800'],
      categoryId: kidsToys.id,
      inventoryCount: 100
    },
    {
      name: 'Remote Control Monster Truck',
      slug: 'monster-truck-toy',
      description: 'High-speed off-road RC truck with rechargeable batteries.',
      price: 185000, // ₹1,850
      images: ['https://images.unsplash.com/photo-1594787318286-3d835c1d207f?q=80&w=800'],
      categoryId: kidsToys.id,
      inventoryCount: 30
    },
    // Women Lehengas
    {
      name: 'Royal Velvet Bridal Lehenga',
      slug: 'bridal-lehenga-maroon',
      description: 'Exquisite maroon velvet lehenga with heavy zari and stone work for the perfect bride.',
      price: 4500000, // ₹45,000
      images: ['https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=800'],
      categoryId: womenLehengas.id,
      inventoryCount: 5
    },
    {
      name: 'Designer Floral Lehenga Choli',
      slug: 'floral-lehenga-pink',
      description: 'Lightweight organza lehenga with floral prints, perfect for bridesmaids and mehendi.',
      price: 850000, // ₹8,500
      images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800'],
      categoryId: womenLehengas.id,
      inventoryCount: 15
    },
    // Sarees
    {
      name: 'Kanjeevaram Silk Saree',
      slug: 'kanjeevaram-silk-gold',
      description: 'Authentic handwoven Kanjeevaram silk saree with rich gold zari border.',
      price: 1599900, // ₹15,999
      images: ['https://images.unsplash.com/photo-1610030469668-935142b66de1?q=80&w=800'],
      categoryId: sarees.id,
      inventoryCount: 10
    },
    {
      name: 'Banarasi Brocade Saree',
      slug: 'banarasi-saree-red',
      description: 'Traditional Banarasi saree featuring intricate brocade work in pure silk.',
      price: 1250000, // ₹12,500
      images: ['https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800'],
      categoryId: sarees.id,
      inventoryCount: 12
    }
  ]

  for (const product of products) {
    await prisma.product.create({
      data: product
    })
  }

  console.log('Seed successful!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
