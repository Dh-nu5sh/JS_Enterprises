import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col flex-1 w-full min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 flex flex-col w-full">{children}</main>
      <Footer />
    </div>
  )
}