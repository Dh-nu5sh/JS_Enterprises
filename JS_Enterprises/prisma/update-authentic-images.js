const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('Applying authentic images for premium products...')
  
  // Update Kanjeevaram Silk Saree - Using a high-res professional silk weave shot
  await prisma.product.update({
    where: { slug: 'kanjeevaram-silk-gold' },
    data: {
      images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200']
    }
  })

  // Update Royal Velvet Bridal Lehenga - Using an authentic maroon bridal velvet shot
  await prisma.product.update({
    where: { slug: 'bridal-lehenga-maroon' },
    data: {
      images: ['https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=1200']
    }
  })

  console.log('Premium images applied successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
