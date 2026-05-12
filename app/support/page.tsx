'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, Clock, HelpCircle, AlertCircle, Wrench } from 'lucide-react';
import Footer from '@/components/Footer';
import GlobalBackground from '@/components/GlobalBackground';
import Link from 'next/link';

export default function SupportPage() {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35 },
    },
  };

  const supportCategories = [
    {
      icon: HelpCircle,
      title: 'FAQs',
      description: 'Find answers to common questions about our services and products.',
      items: [
        'Installation process and timeline',
        'Warranty coverage details',
        'Maintenance schedules',
        'Troubleshooting guides',
      ],
    },
    {
      icon: Wrench,
      title: 'Technical Support',
      description: 'Get help with technical issues and system maintenance.',
      items: [
        '24/7 technical support available',
        'Remote diagnostics',
        'On-site assistance',
        'Emergency repairs',
      ],
    },
    {
      icon: Clock,
      title: 'Service Hours',
      description: 'Contact us during our business hours.',
      items: [
        'Monday - Friday: 8:00 AM - 6:00 PM',
        'Saturday: 10:00 AM - 4:00 PM',
        'Sunday: Closed',
        '24/7 Emergency Support',
      ],
    },
    {
      icon: AlertCircle,
      title: 'Warranty & Claims',
      description: 'Information about warranty coverage and claims process.',
      items: [
        'Comprehensive warranty coverage',
        'Easy claims process',
        'Replacement options',
        'Extended warranty available',
      ],
    },
  ];

  return (
    <>
      <GlobalBackground />
      <main className="relative z-10 min-h-screen">
        {/* Back Button */}
        <div className="fixed top-6 left-6 z-40">
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 bg-blue-900/80 hover:bg-blue-800 border border-blue-600 text-blue-100 rounded-lg transition-colors duration-200 backdrop-blur-sm"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Hero Section */}
        <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800 relative overflow-hidden">
          <div className="section-inner relative z-10">
            <motion.div
              className="max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight text-white mb-6">
                Customer <span className="gradient-text">Support</span>
              </h1>
              <p className="text-lg md:text-xl leading-relaxed text-blue-200 max-w-2xl">
                We're here to help. Get answers to your questions and technical support for all our services.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Support Categories */}
        <section className="section-container py-20 md:py-32">
          <div className="section-inner">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              {supportCategories.map((category, idx) => {
                const Icon = category.icon;
                return (
                  <motion.div
                    key={idx}
                    className="group p-8 rounded-xl bg-gradient-to-br from-blue-800/40 to-cyan-800/20 border border-blue-600/30 hover:border-blue-400/70 hover:bg-blue-800/50 transition-all duration-200"
                    variants={item}
                  >
                    <div className="mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500/40 to-cyan-500/20 rounded-xl flex items-center justify-center border border-blue-500/50 group-hover:border-blue-400 group-hover:shadow-lg transition-all duration-200">
                        <Icon className="w-7 h-7 text-blue-300 group-hover:text-blue-200 transition-colors duration-150" />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-100 transition-colors duration-150">
                      {category.title}
                    </h3>
                    <p className="text-sm text-blue-200 mb-6">{category.description}</p>

                    <ul className="space-y-2">
                      {category.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
                          <span className="text-xs text-blue-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="section-container py-20 md:py-32 bg-gradient-to-b from-transparent to-blue-900/30">
          <div className="section-inner">
            <motion.div
              className="max-w-3xl mx-auto text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">Need Immediate Assistance?</h2>
              <p className="text-lg text-blue-200">
                Contact our support team via email, WhatsApp, or phone. We're ready to help!
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              {[
                { icon: Mail, title: 'Email', value: 'info@skeamtechnologies.com', href: 'mailto:info@skeamtechnologies.com' },
                { icon: Phone, title: 'WhatsApp', value: '+234 712 000 2022', href: 'https://wa.me/2347120002022' },
                { icon: Clock, title: 'Call Us', value: '+234 712 000 2022', href: 'tel:+2347120002022' },
              ].map((contact, idx) => {
                const Icon = contact.icon;
                return (
                  <motion.a
                    key={idx}
                    href={contact.href}
                    target={contact.href.startsWith('https://wa.me') ? '_blank' : undefined}
                    rel={contact.href.startsWith('https://wa.me') ? 'noopener noreferrer' : undefined}
                    className="p-6 rounded-xl bg-gradient-to-br from-blue-800/40 to-cyan-800/20 border border-blue-600/30 hover:border-blue-400/70 hover:bg-blue-800/50 transition-all duration-200 text-center group"
                    variants={item}
                  >
                    <Icon className="w-8 h-8 text-blue-300 group-hover:text-blue-200 mx-auto mb-3 transition-colors duration-150" />
                    <h3 className="font-bold text-white mb-2">{contact.title}</h3>
                    <p className="text-sm text-blue-300 group-hover:text-blue-200 transition-colors duration-150">{contact.value}</p>
                  </motion.a>
                );
              })}
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
