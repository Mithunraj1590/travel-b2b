import Link from 'next/link';
import { Button } from './ui/Button';

export function Header() {
  return (
    <header className="absolute top-0 z-50 w-full bg-transparent pt-6">
      <div className="container mx-auto px-6 pb-6 flex items-center justify-between border-b border-dashed border-[#144b53]/20">
        
        {/* Logo */}
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
          <span 
            className="text-[40px] text-[#144b53] leading-none" 
            style={{ fontFamily: '"Brush Script MT", "Lucida Handwriting", cursive' }}
          >
            Travelopia
          </span>
        </Link>
        
        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-12 text-[15px] font-medium text-[#144b53]">
          <Link href="/" className="hover:opacity-70 transition-opacity">
            Home
          </Link>
          <Link href="/about" className="hover:opacity-70 transition-opacity">
            About
          </Link>
          <Link href="/premium" className="hover:opacity-70 transition-opacity">
            Premium
          </Link>
          <Link href="/blogs" className="hover:opacity-70 transition-opacity">
            Blogs
          </Link>
        </nav>

        {/* Action Button */}
        <div className="flex items-center">
          <Button 
            variant="secondary"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            Portal
          </Button>
        </div>

      </div>
    </header>
  );
}
