import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import prisma from "@/lib/prisma"
import { ProductCard } from "@/components/shared/ProductCard"

export default async function Home() {
  const categories = await prisma.category.findMany()
  const featuredProducts = await prisma.product.findMany({
    take: 4,
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-32 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000')] bg-cover bg-center opacity-30"></div>
        <div className="container relative mx-auto px-4 md:px-6 text-center space-y-8">
          <div className="space-y-4 max-w-3xl mx-auto">
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-white">
              JS Enterprises: Luxury Redefined
            </h1>
            <p className="mx-auto max-w-[700px] text-slate-300 md:text-xl leading-relaxed">
              Premium ethnic wear for women and trendy fashion for kids. Discover the finest collection of Lehengas, Sarees, and Toys.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/categories/women-lehengas" className="inline-flex items-center justify-center rounded-full bg-white text-slate-950 hover:bg-slate-200 h-12 px-8 py-2 text-base font-bold transition-all transform hover:scale-105 shadow-xl">
              Shop Women
            </Link>
            <Link href="/categories/kids-clothing" className="inline-flex items-center justify-center rounded-full border-2 border-white text-white hover:bg-white/10 h-12 px-8 py-2 text-base font-bold transition-all transform hover:scale-105">
              Explore Kids
            </Link>
          </div>
        </div>
      </section>
      
      {/* Categories Grid */}
      <section className="container mx-auto px-4 md:px-6 py-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Shop by Category</h2>
            <p className="text-muted-foreground">Handpicked collections for every occasion.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              href={`/categories/${category.slug}`}
              className="group relative h-80 overflow-hidden rounded-2xl bg-muted transition-all hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
              <img 
                src={
                  category.slug === 'kids-clothing' ? '/products/girls-dress.jpg' :
                  category.slug === 'kids-toys' ? 'https://images.unsplash.com/photo-1532330393533-443990a51d10?q=80&w=800' :
                  category.slug === 'women-lehengas' ? '/products/lehenga.webp' :
                  '/products/saree.webp'
                }
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 p-6 z-20 space-y-1">
                <h3 className="text-xl font-bold text-white">{category.name}</h3>
                <p className="text-sm text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Featured Arrivals</h2>
            <Link href="/categories/sarees" className="text-sm font-semibold text-slate-600 hover:text-slate-900 underline underline-offset-4">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product as any} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}