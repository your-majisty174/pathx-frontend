'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Product</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link href="/dashboard/routes" className="text-base text-gray-500 hover:text-gray-900">
                    Route Optimization
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/inventory" className="text-base text-gray-500 hover:text-gray-900">
                    Inventory Management
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/analytics" className="text-base text-gray-500 hover:text-gray-900">
                    Analytics
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/vehicles" className="text-base text-gray-500 hover:text-gray-900">
                    Vehicle Management
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link href="/about" className="text-base text-gray-500 hover:text-gray-900">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-base text-gray-500 hover:text-gray-900">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-base text-gray-500 hover:text-gray-900">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-base text-gray-500 hover:text-gray-900">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Resources</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link href="/documentation" className="text-base text-gray-500 hover:text-gray-900">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/api" className="text-base text-gray-500 hover:text-gray-900">
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="text-base text-gray-500 hover:text-gray-900">
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="/status" className="text-base text-gray-500 hover:text-gray-900">
                    System Status
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link href="/privacy" className="text-base text-gray-500 hover:text-gray-900">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-base text-gray-500 hover:text-gray-900">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/security" className="text-base text-gray-500 hover:text-gray-900">
                    Security
                  </Link>
                </li>
                <li>
                  <Link href="/compliance" className="text-base text-gray-500 hover:text-gray-900">
                    Compliance
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8">
            <p className="text-base text-gray-400 text-center">
              &copy; {new Date().getFullYear()} PathX. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
} 