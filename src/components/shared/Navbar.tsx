import Link from "next/link"
import { ShoppingCart, Search, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { auth, signOut } from "@/auth"

export default async function Navbar() {
  const session = await auth()

  const ghostIconClasses = "inline-flex shrink-0 items-center justify-center rounded-lg hover:bg-muted hover:text-foreground size-8 text-sm font-medium transition-colors"
  const ghostClasses = "inline-flex shrink-0 items-center justify-center rounded-lg hover:bg-muted hover:text-foreground h-8 px-2.5 text-sm font-medium transition-colors"

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight">JS Enterprises</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/categories/kids-clothing">Kids Clothing</Link>
          <Link href="/categories/women-lehengas">Women Lehengas</Link>
          <Link href="/categories/sarees">Sarees</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" suppressHydrationWarning />
            <span className="sr-only">Search</span>
          </Button>
          <Link href="/cart" className={ghostIconClasses}>
            <ShoppingCart className="h-5 w-5" suppressHydrationWarning />
            <span className="sr-only">Cart</span>
          </Link>
          {session?.user ? (
            <div className="flex items-center gap-2">
               {session.user.role === "ADMIN" && (
                 <Link href="/admin" className={ghostClasses}>
                   Admin
                 </Link>
               )}
              <form action={async () => {
                "use server"
                await signOut()
              }}>
                <Button variant="ghost" size="icon" type="submit">
                  <LogOut className="h-5 w-5" suppressHydrationWarning />
                </Button>
              </form>
            </div>
          ) : (
            <Link href="/login" className={ghostIconClasses}>
              <User className="h-5 w-5" suppressHydrationWarning />
              <span className="sr-only">Login</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}