import Link from "next/link"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 p-4">
      <Link href="/" className="mb-8 text-2xl font-bold tracking-tight">
        JS Enterprises
      </Link>
      {children}
    </div>
  )
}