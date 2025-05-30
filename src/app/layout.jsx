import { Inter } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: 'RevoShop',
    template: '%s | RevoShop',
  },
  description: 'Your one-stop shop for all your needs',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <header className="bg-white shadow-sm">
            <nav className="container-custom py-4">
              <div className="flex justify-between items-center">
                <a href="/" className="text-2xl font-bold text-primary">RevoShop</a>
                <div className="space-x-4">
                  <a href="/" className="hover:text-primary">Home</a>
                  <a href="/cart" className="hover:text-primary">Cart</a>
                  <a href="/login" className="hover:text-primary">Login</a>
                </div>
              </div>
            </nav>
          </header>
          {children}
          <footer className="bg-gray-100 mt-12">
            <div className="container-custom py-8">
              <p className="text-center text-gray-600">
                © {new Date().getFullYear()} RevoShop. All rights reserved.
              </p>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
} 