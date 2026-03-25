"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/store/useCart"

interface AddToCartButtonProps {
  product: {
    id: string
    name: string
    price: number
    image?: string
  }
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart()

  return (
    <Button size="lg" className="w-full sm:w-auto" onClick={() => addItem({ ...product, quantity: 1 })}>
      <ShoppingCart className="mr-2 h-5 w-5" suppressHydrationWarning />
      Add to Cart
    </Button>
  )
}