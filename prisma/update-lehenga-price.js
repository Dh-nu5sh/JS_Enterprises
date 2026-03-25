const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('Updating price for Royal Velvet Bridal Lehenga...')
  
  await prisma.product.update({
    where: { slug: 'bridal-lehenga-maroon' },
    data: {
      price: 2999900 // ₹29,999 stored in paise
    }
  })

  console.log('Lehenga price updated successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
