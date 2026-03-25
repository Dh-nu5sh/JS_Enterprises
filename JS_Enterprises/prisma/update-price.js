const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('Updating price for Boys Cotton Party Suit...')
  
  await prisma.product.update({
    where: { slug: 'boys-party-suit' },
    data: {
      price: 139900 // ₹1,399 stored in paise
    }
  })

  console.log('Price updated successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
