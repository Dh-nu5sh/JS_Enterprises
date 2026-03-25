import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (session?.user?.role !== "ADMIN") {
    redirect("/")
  }

  return (
    <div className="flex min-h-screen bg-muted/20">
      <aside className="w-64 border-r bg-background hidden md:block">
        <div className="p-6">
          <h2 className="text-lg font-bold">Admin Panel</h2>
        </div>
        <nav className="px-4 space-y-2">
          <div className="bg-muted px-4 py-2 rounded-md font-medium text-sm">Dashboard</div>
          <div className="px-4 py-2 rounded-md text-muted-foreground hover:bg-muted/50 font-medium text-sm cursor-not-allowed">Products</div>
          <div className="px-4 py-2 rounded-md text-muted-foreground hover:bg-muted/50 font-medium text-sm cursor-not-allowed">Orders</div>
          <div className="px-4 py-2 rounded-md text-muted-foreground hover:bg-muted/50 font-medium text-sm cursor-not-allowed">Users</div>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  )
}