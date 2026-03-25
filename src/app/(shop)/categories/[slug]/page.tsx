import prisma from "@/lib/prisma"
import { ProductCard } from "@/components/shared/ProductCard"
import { notFound } from "next/navigation"

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      products: {
        orderBy: { createdAt: 'desc' }
      },
    }
  })

  if (!category) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="flex flex-col space-y-10">
        <div className="space-y-4 border-b pb-8">
          <h1 className="text-4xl font-bold tracking-tight capitalize">
            {category.name}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            {category.description}
          </p>
        </div>
        
        {category.products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-muted/30 rounded-3xl border-2 border-dashed">
            <p className="text-xl font-medium text-muted-foreground">No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {category.products.map((product) => (
              <ProductCard key={product.id} product={product as any} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}