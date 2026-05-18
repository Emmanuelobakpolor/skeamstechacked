'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
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
    <footer id="contact" className="text-white relative overflow-hidden z-10 bg-black/50 backdrop-blur-sm">
      {/* Static background blob — no animation */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Footer */}
      <div className="section-container relative z-10">
        <div className="section-inner">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 md:gap-16 mb-16 pb-16 border-b border-blue-600/20">
            {/* Brand & Description */}
            <motion.div
              className="lg:col-span-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
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
              <p className="text-blue-300 text-sm leading-relaxed mb-8">
                Your trusted partner for integrated security and power solutions across Nigeria. Professional expertise since 2014.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider">Follow Us</span>
                <div className="flex items-center gap-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-900/60 to-cyan-900/60 hover:from-blue-700 hover:to-cyan-700 flex items-center justify-center transition-all duration-200 border border-blue-600/40 hover:border-blue-400/70"
                        aria-label={social.label}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Icon className="w-4 h-4" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              className="lg:col-span-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 }}
            >
              <h4 className="text-lg font-bold text-white mb-8">Get In Touch</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Email */}
                <a
                  href="mailto:Skeamtechnologies@mail.com ?subject=SKEAM Technologies Inquiry"
                  className="group p-5 rounded-xl bg-gradient-to-br from-blue-900/20 to-cyan-900/10 border border-blue-600/30 hover:border-blue-400/70 hover:bg-blue-900/40 transition-all duration-200"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2.5 rounded-lg bg-gradient-to-br from-blue-500/40 to-cyan-500/20 group-hover:from-blue-500/60 group-hover:to-cyan-500/40 transition-all duration-150">
                      <Mail className="w-5 h-5 text-blue-300 group-hover:text-blue-200 transition-colors duration-150" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">Email</p>
                      <p className="text-xs text-blue-400 group-hover:text-blue-300 mt-1 transition-colors duration-150">Skeamtechnologies@mail.com </p>
                    </div>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/2347120002022?text=Hi%20SKEAM%20Technologies%2C%20I%20would%20like%20to%20inquire%20about%20your%20services"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-5 rounded-xl bg-gradient-to-br from-blue-900/20 to-cyan-900/10 border border-blue-600/30 hover:border-blue-400/70 hover:bg-blue-900/40 transition-all duration-200"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2.5 rounded-lg bg-gradient-to-br from-blue-500/40 to-cyan-500/20 group-hover:from-blue-500/60 group-hover:to-cyan-500/40 transition-all duration-150">
                      <Phone className="w-5 h-5 text-blue-300 group-hover:text-blue-200 transition-colors duration-150" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">WhatsApp</p>
                      <p className="text-xs text-blue-400 group-hover:text-blue-300 mt-1 transition-colors duration-150">+234 712 000 2022</p>
                    </div>
                  </div>
                </a>

                {/* Location */}
                <a
                  href="https://www.google.com/maps/search/2+Oluwatozin+Dada+Street,+Lagos+State,+Nigeria"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-5 rounded-xl bg-gradient-to-br from-blue-900/20 to-cyan-900/10 border border-blue-600/30 hover:border-blue-400/70 hover:bg-blue-900/40 transition-all duration-200"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2.5 rounded-lg bg-gradient-to-br from-blue-500/40 to-cyan-500/20 group-hover:from-blue-500/60 group-hover:to-cyan-500/40 transition-all duration-150">
                      <MapPin className="w-5 h-5 text-blue-300 group-hover:text-blue-200 transition-colors duration-150" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">Location</p>
                      <p className="text-xs text-blue-400 group-hover:text-blue-300 mt-1 transition-colors duration-150">Lagos, Nigeria</p>
                    </div>
                  </div>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16 pb-16 border-b border-blue-600/20">
            {Object.entries(footerLinks).map(([category, links], idx) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
              >
                <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider">{category}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={(e) => handleFooterLink(e, link.href)}
                        className="text-blue-300 text-sm hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Bottom Section */}
          <motion.div
            className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-blue-400 text-xs">
              © {currentYear} SKEAM Technologies. All rights reserved.
            </p>
            <p className="text-blue-400 text-xs">
              Crafted with excellence for your security and power needs.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
