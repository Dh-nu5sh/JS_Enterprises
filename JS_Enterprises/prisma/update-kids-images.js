const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('Updating kids products with local image paths...')
  
  // Update Boys Cotton Party Suit
  await prisma.product.update({
    where: { slug: 'boys-party-suit' },
    data: {
      images: ['/products/boys-suit.jpeg']
    }
  })

  // Update Girls Floral Summer Dress
  await prisma.product.update({
    where: { slug: 'girls-floral-dress' },
    data: {
      images: ['/products/girls-dress.jpg']
    }
  })

  console.log('Kids products updated successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
