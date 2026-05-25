'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { scrollToSection } from '@/lib/navigation';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#') || href.startsWith('/#')) {
      e.preventDefault();
      const sectionId = href.replace('/#', '').replace('#', '');
      scrollToSection(sectionId);
      setMobileMenuOpen(false);
    } else if (href === '/') {
      e.preventDefault();
      window.location.href = '/';
    }
  };

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '#services' },
    { label: 'Shop', href: '/shop' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 w-full bg-blue-600 border-b border-blue-700 z-50 shadow-sm">
      <div className="section-inner flex items-center justify-between py-4 md:py-5 px-6 md:px-8">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Image
            src="/images/NO BACKGROUND FOR VIDEO .png"
            alt="SKEAM Technologies"
            width={120}
            height={40}
            className="h-10 w-auto"
            style={{ width: 'auto', height: 'auto' }}
            priority
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-blue-100 hover:text-white font-medium text-sm transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex">
          <a
            href="/shop"
            className="px-6 py-2.5 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors duration-200 inline-block"
          >
            Get a Quote
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-blue-700 bg-blue-600">
          <div className="section-inner py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-blue-100 hover:text-white font-medium py-2"
                onClick={(e) => {
                  handleNavClick(e, item.href);
                  setMobileMenuOpen(false);
                }}
              >
                {item.label}
              </a>
            ))}
            <a
              href="/shop"
              className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 w-full mt-2 transition-colors duration-200 block text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get a Quote
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
