import prisma from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { AddToCartButton } from "@/components/shared/AddToCartButton"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck, Truck, RotateCcw } from "lucide-react"

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true
    }
  })

  if (!product) {
    notFound()
  }

  const formatPrice = (priceInPaise: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(priceInPaise / 100)
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-[4/5] bg-muted rounded-3xl overflow-hidden relative border shadow-sm">
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col space-y-8">
          <div className="space-y-4">
            <Badge variant="secondary" className="w-fit text-xs font-semibold uppercase tracking-wider">
              {product.category.name}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">{product.name}</h1>
            <div className="text-3xl font-extrabold text-primary">
              {formatPrice(product.price)}
            </div>
          </div>
          
          <div className="space-y-4 border-t pt-8">
            <h3 className="font-bold text-lg">Description</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-y py-6">
            <div className="flex items-center gap-3 text-sm font-medium">
              <Truck className="h-5 w-5 text-primary" suppressHydrationWarning />
              <span>Free Delivery</span>
            </div>
            <div className="flex items-center gap-3 text-sm font-medium">
              <RotateCcw className="h-5 w-5 text-primary" suppressHydrationWarning />
              <span>7 Day Returns</span>
            </div>
            <div className="flex items-center gap-3 text-sm font-medium">
              <ShieldCheck className="h-5 w-5 text-primary" suppressHydrationWarning />
              <span>Quality Assured</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <AddToCartButton product={{
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.images[0]
            }} />
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 font-bold border-2" asChild>
              <Link href="/checkout">Buy Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}