import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProductCardProps {
  product: {
    id: string
    name: string
    slug: string
    price: number
    images: string[]
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (priceInPaise: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(priceInPaise / 100)
  }

  return (
    <Link href={`/products/${product.slug}`}>
      <Card className="h-full overflow-hidden transition-all hover:shadow-lg flex flex-col group">
        <div className="aspect-[4/5] relative overflow-hidden bg-muted">
          {product.images.length > 0 ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              No Image
            </div>
          )}
        </div>
        <CardHeader className="p-4 pb-2">
          <h3 className="font-semibold truncate text-base">{product.name}</h3>
        </CardHeader>
        <CardFooter className="p-4 pt-0 mt-auto">
          <div className="font-bold text-lg">{formatPrice(product.price)}</div>
        </CardFooter>
      </Card>
    </Link>
  )
}