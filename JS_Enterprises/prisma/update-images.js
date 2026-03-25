const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('Updating specific product images...')
  
  // Update Kanjeevaram Silk Saree
  await prisma.product.update({
    where: { slug: 'kanjeevaram-silk-gold' },
    data: {
      images: ['https://images.unsplash.com/photo-1610030469915-9a88e47b4ba5?q=80&w=1000']
    }
  })

  // Update Royal Velvet Bridal Lehenga
  await prisma.product.update({
    where: { slug: 'bridal-lehenga-maroon' },
    data: {
      images: ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1000']
    }
  })

  console.log('Images updated successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
