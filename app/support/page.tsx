'use client';

import { Phone, Mail, Clock, HelpCircle, AlertCircle, Wrench } from 'lucide-react';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function SupportPage() {
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
    <main className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="fixed top-6 left-6 z-40">
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 rounded-lg transition-colors duration-200 shadow-sm"
        >
          ← Back to Home
        </Link>
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-blue-600 relative overflow-hidden">
        <div className="section-inner relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-white mb-6">
              Customer <span className="text-blue-100">Support</span>
            </h1>
            <p className="text-lg leading-relaxed text-blue-100 max-w-2xl">
              We're here to help. Get answers to your questions and technical support for all our services.
            </p>
          </div>
        </div>
      </section>

      {/* Support Categories */}
      <section className="section-container py-20 md:py-32">
        <div className="section-inner">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportCategories.map((category, idx) => {
              const Icon = category.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
                >
                  <div className="mb-5">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-100">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-5">{category.description}</p>

                  <ul className="space-y-2">
                    {category.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 flex-shrink-0" />
                        <span className="text-xs text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-container py-20 md:py-32 bg-gray-50">
        <div className="section-inner">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">Need Immediate Assistance?</h2>
            <p className="text-base text-gray-500">
              Contact our support team via email, WhatsApp, or phone. We're ready to help!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { icon: Mail, title: 'Email', value: 'Skeamtechnologies@mail.com', href: 'mailto:Skeamtechnologies@mail.com' },
              { icon: Phone, title: 'WhatsApp', value: '+234 712 000 2022', href: 'https://wa.me/2347120002022' },
              { icon: Clock, title: 'Call Us', value: '+234 712 000 2022', href: 'tel:+2347120002022' },
            ].map((contact, idx) => {
              const Icon = contact.icon;
              return (
                <a
                  key={idx}
                  href={contact.href}
                  target={contact.href.startsWith('https://wa.me') ? '_blank' : undefined}
                  rel={contact.href.startsWith('https://wa.me') ? 'noopener noreferrer' : undefined}
                  className="p-6 rounded-xl bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 text-center"
                >
                  <Icon className="w-7 h-7 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-1">{contact.title}</h3>
                  <p className="text-sm text-gray-500">{contact.value}</p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
