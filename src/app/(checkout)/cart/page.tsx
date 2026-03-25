"use client"

import { useCart } from "@/lib/store/useCart"
import { Button, buttonVariants } from "@/components/ui/button"
import { Minus, Plus, Trash2 } from "lucide-react"
import Link from "next/link"

export default function CartPage() {
  const { items, updateQuantity, removeItem } = useCart()

  const formatPrice = (priceInPaise: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(priceInPaise / 100)
  }

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center space-y-6">
        <h1 className="text-3xl font-bold">Your Cart is Empty</h1>
        <p className="text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
        <Link href="/" className={buttonVariants({ size: "lg" })}>
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Shopping Cart</h1>
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row gap-6 border-b pb-6">
              <div className="w-full sm:w-32 aspect-square bg-muted rounded-md flex-shrink-0 overflow-hidden">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">No image</div>
                )}
              </div>
              <div className="flex flex-col flex-1 justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="font-medium text-primary mt-1">{formatPrice(item.price)}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="text-destructive hover:text-destructive/90 hover:bg-destructive/10">
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
                <div className="flex items-center gap-4 mt-4 sm:mt-0">
                  <div className="flex items-center border rounded-md">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-12 text-center text-sm font-medium">{item.quantity}</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="text-sm font-medium text-right flex-1">
                    Total: {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-muted/50 rounded-xl p-6 h-fit space-y-6 border">
          <h2 className="text-xl font-bold border-b pb-4">Order Summary</h2>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className="font-medium text-green-600">Free</span>
            </div>
            <div className="border-t pt-4 flex justify-between items-center">
              <span className="text-base font-bold">Total</span>
              <span className="text-xl font-bold">{formatPrice(subtotal)}</span>
            </div>
          </div>
          <Link href="/checkout" className={buttonVariants({ size: "lg", className: "w-full" })}>
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  )
}