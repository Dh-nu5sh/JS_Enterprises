const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('Updating database with local image paths...')
  
  // Update Kanjeevaram Silk Saree
  await prisma.product.update({
    where: { slug: 'kanjeevaram-silk-gold' },
    data: {
      images: ['/products/saree.webp']
    }
  })

  // Update Royal Velvet Bridal Lehenga
  await prisma.product.update({
    where: { slug: 'bridal-lehenga-maroon' },
    data: {
      images: ['/products/lehenga.webp']
    }
  })

  console.log('Database updated successfully with local images!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
