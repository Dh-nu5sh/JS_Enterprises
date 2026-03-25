import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <div className="col-span-2 md:col-span-1 space-y-4">
            <h3 className="text-white text-xl font-bold">JS Enterprises</h3>
            <p className="text-sm leading-relaxed">
              Premium dropshipping destination for the finest Indian ethnic wear and high-quality kids essentials.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/categories/kids-clothing" className="hover:text-white transition-colors">Kids Clothing</Link></li>
              <li><Link href="/categories/kids-toys" className="hover:text-white transition-colors">Kids Toys</Link></li>
              <li><Link href="/categories/women-lehengas" className="hover:text-white transition-colors">Women Lehengas</Link></li>
              <li><Link href="/categories/sarees" className="hover:text-white transition-colors">Sarees</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Account</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/cart" className="hover:text-white transition-colors">My Cart</Link></li>
              <li><Link href="/login" className="hover:text-white transition-colors">Login</Link></li>
              <li><Link href="/register" className="hover:text-white transition-colors">Register</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>Contact Us</li>
              <li>Shipping Policy</li>
              <li>Returns & Refunds</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>&copy; {new Date().getFullYear()} JS Enterprises. Designed for Luxury.</p>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer">Instagram</span>
            <span className="hover:text-white cursor-pointer">Facebook</span>
            <span className="hover:text-white cursor-pointer">Twitter</span>
          </div>
        </div>
      </div>
    </footer>
  )
}