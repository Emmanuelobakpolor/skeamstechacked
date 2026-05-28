'use client';

import Image from 'next/image';
import { Mail, Phone, MapPin, Linkedin, Twitter } from 'lucide-react';
import { scrollToSection } from '@/lib/navigation';

const handleFooterLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  if (href.startsWith('/#')) {
    e.preventDefault();
    const sectionId = href.replace('/#', '');
    scrollToSection(sectionId);
  }
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { label: 'Gate Automation', href: '/#services' },
      { label: 'CCTV Surveillance', href: '/#services' },
      { label: 'Solar Energy Solutions', href: '/#services' },
      { label: 'Inverter Systems', href: '/#services' },
    ],
    company: [
      { label: 'About Us', href: '/#about' },
      { label: 'Our Projects', href: '/shop' },
      { label: 'Contact', href: '/#contact' },
    ],
    support: [
      { label: 'Installation Services', href: '/support' },
      { label: 'Maintenance', href: '/support' },
      { label: 'Warranty', href: '/support' },
      { label: 'FAQs', href: '/support' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/legal' },
      { label: 'Terms of Service', href: '/legal' },
    ],
  };

  const socialLinks = [
    { icon: Linkedin, label: 'LinkedIn', href: '#' },
    { icon: Twitter, label: 'Twitter', href: '#' },
  ];

  return (
    <footer id="contact" className="text-white bg-blue-600">
      <div className="py-16 px-6 md:px-8 max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12 pb-12 border-b border-blue-500">
          {/* Brand & Description */}
          <div className="lg:col-span-4">
            <div className="mb-6">
              <Image
                src="/images/NO BACKGROUND FOR VIDEO .png"
                alt="SKEAM Technologies"
                width={120}
                height={45}
                className="h-12 w-auto"
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
            <p className="text-blue-100 text-sm leading-relaxed mb-6">
              Your trusted partner for integrated security and power solutions across Nigeria. Professional expertise since 2014.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-xs text-blue-200 font-medium uppercase tracking-wider">Follow Us</span>
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      className="w-9 h-9 rounded-lg bg-blue-700 hover:bg-white hover:text-blue-600 flex items-center justify-center transition-colors duration-200 border border-blue-500 hover:border-white"
                      aria-label={social.label}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-8">
            <h4 className="text-base font-semibold text-white mb-6">Get In Touch</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Email */}
              <a
                href="mailto:Skeamtechnologies@mail.com?subject=SKEAM Technologies Inquiry"
                className="group p-4 rounded-xl bg-blue-700 border border-blue-500 hover:border-white/70 transition-colors duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/20 shrink-0">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-white text-sm">Email</p>
                    <p className="text-xs text-blue-100 mt-0.5 truncate">Skeamtechnologies@mail.com</p>
                  </div>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/2347120002022?text=Hi%20SKEAM%20Technologies%2C%20I%20would%20like%20to%20inquire%20about%20your%20services"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-xl bg-blue-700 border border-blue-500 hover:border-white/70 transition-colors duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/20 shrink-0">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-white text-sm">WhatsApp</p>
                    <p className="text-xs text-blue-100 mt-0.5">+234 712 000 2022</p>
                  </div>
                </div>
              </a>

              {/* Location */}
              <a
                href="https://www.google.com/maps/search/2+Oluwatozin+Dada+Street,+Lagos+State,+Nigeria"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-xl bg-blue-700 border border-blue-500 hover:border-white/70 transition-colors duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/20 shrink-0">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-white text-sm">Location</p>
                    <p className="text-xs text-blue-100 mt-0.5">Lagos, Nigeria</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12 pb-12 border-b border-blue-500">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleFooterLink(e, link.href)}
                      className="text-blue-100 text-sm hover:text-white transition-colors duration-200 inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4">
          <p className="text-blue-200 text-xs">
            &copy; {currentYear} SKEAM Technologies. All rights reserved.
          </p>
          <p className="text-blue-200 text-xs">
            Crafted with excellence for your security and power needs.
          </p>
        </div>
      </div>
    </footer>
  );
}
