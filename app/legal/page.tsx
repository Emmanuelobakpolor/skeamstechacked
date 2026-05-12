'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Lock, FileText, AlertCircle } from 'lucide-react';
import Footer from '@/components/Footer';
import GlobalBackground from '@/components/GlobalBackground';
import Link from 'next/link';

export default function LegalPage() {
  const item = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35 },
    },
  };

  const legalSections = [
    {
      icon: FileText,
      title: 'Terms of Service',
      description: 'Please read these terms carefully before using our services.',
      content: [
        'By using SKEAM Technologies services, you agree to comply with all applicable terms and conditions.',
        'Our services are provided for residential and commercial property use only.',
        'Users are responsible for maintaining the confidentiality of any account credentials.',
        'We reserve the right to modify terms at any time with 30 days notice.',
        'All services are provided on an "as-is" basis without warranties.',
      ],
    },
    {
      icon: Lock,
      title: 'Privacy Policy',
      description: 'Your privacy is important to us. This explains how we handle your data.',
      content: [
        'We collect personal information only for service delivery and support purposes.',
        'Your data is encrypted and stored securely on protected servers.',
        'We do not share your information with third parties without consent.',
        'You have the right to access, modify, or delete your personal data.',
        'Cookies are used only to enhance your browsing experience.',
      ],
    },
    {
      icon: ShieldCheck,
      title: 'Warranty Information',
      description: 'Information about product and service warranties.',
      content: [
        'All products come with a 12-month manufacturing warranty.',
        'Installation services include 6 months of free maintenance.',
        'Extended warranty plans are available for up to 5 years.',
        'Warranty covers manufacturing defects but not accidental damage.',
        'Warranty claims must be submitted within 30 days of issue discovery.',
      ],
    },
    {
      icon: AlertCircle,
      title: 'Liability & Disclaimers',
      description: 'Important legal disclaimers and limitations of liability.',
      content: [
        'SKEAM Technologies is not liable for indirect or consequential damages.',
        'Our liability is limited to the amount paid for services rendered.',
        'Third-party components are used at the customer\'s own risk.',
        'We are not responsible for data loss due to user negligence.',
        'Professional installation is required for warranty validity.',
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
                Legal <span className="gradient-text">Information</span>
              </h1>
              <p className="text-lg md:text-xl leading-relaxed text-blue-200 max-w-2xl">
                Terms of service, privacy policy, warranty information, and important legal notices.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Legal Sections */}
        <section className="section-container py-20 md:py-32">
          <div className="section-inner">
            <div className="space-y-12">
              {legalSections.map((section, idx) => {
                const Icon = section.icon;
                return (
                  <motion.div
                    key={idx}
                    className="group p-10 rounded-2xl bg-gradient-to-br from-blue-800/30 to-cyan-800/10 border border-blue-600/30 hover:border-blue-400/50 transition-all duration-200"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.4, delay: idx * 0.06 }}
                    variants={item}
                  >
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-8">
                      <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/40 to-cyan-500/20 border border-blue-500/50 group-hover:border-blue-400 transition-all duration-200">
                        <Icon className="w-6 h-6 text-blue-300 group-hover:text-blue-200 transition-colors duration-150" />
                      </div>
                      <div className="flex-grow">
                        <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-100 transition-colors duration-150">
                          {section.title}
                        </h2>
                        <p className="text-base text-blue-200">{section.description}</p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="ml-16 space-y-4">
                      {section.content.map((paragraph, pIdx) => (
                        <motion.p
                          key={pIdx}
                          className="text-sm leading-relaxed text-blue-100 flex items-start gap-3"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: pIdx * 0.04 }}
                        >
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                          {paragraph}
                        </motion.p>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Important Notice */}
        <section className="section-container py-12 md:py-16">
          <motion.div
            className="p-8 rounded-xl bg-gradient-to-r from-blue-900/40 to-cyan-900/20 border border-blue-600/50 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-400" />
                Important Notice
              </h3>
              <p className="text-blue-200 leading-relaxed">
                These legal documents are provided for informational purposes. For specific legal questions or concerns regarding SKEAM Technologies services, please contact us directly at <span className="font-semibold text-white">info@skeamtechnologies.com</span> or call <span className="font-semibold text-white">+234 712 000 2022</span>. Last updated: January 2024.
              </p>
            </div>
          </motion.div>
        </section>

        <Footer />
      </main>
    </>
  );
}
