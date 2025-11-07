import Link from 'next/link';

const NavItem = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <Link 
    href={href} 
    className="px-4 py-2 hover:bg-indigo-700 rounded-lg transition-colors duration-200"
  >
    {children}
  </Link>
);

export default function Navbar() {
  return (
    <nav className="bg-indigo-600 shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="hidden md:flex space-x-4 text-white font-medium">
            <NavItem href="/">Home</NavItem>
            <NavItem href="/Contact">Contact</NavItem>
          </div>
        </div>
      </div>
    </nav>
  );
}