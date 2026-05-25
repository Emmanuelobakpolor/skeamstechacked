'use client';

import { ShieldCheck, Lock, FileText, AlertCircle } from 'lucide-react';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function LegalPage() {
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
              Legal <span className="text-blue-100">Information</span>
            </h1>
            <p className="text-lg leading-relaxed text-blue-100 max-w-2xl">
              Terms of service, privacy policy, warranty information, and important legal notices.
            </p>
          </div>
        </div>
      </section>

      {/* Legal Sections */}
      <section className="section-container py-20 md:py-32">
        <div className="section-inner">
          <div className="space-y-8">
            {legalSections.map((section, idx) => {
              const Icon = section.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-xl bg-white border border-gray-200 hover:border-blue-300 transition-colors duration-200"
                >
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 rounded-lg bg-blue-50 border border-blue-100">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-grow">
                      <h2 className="text-xl font-semibold text-gray-900 mb-1">
                        {section.title}
                      </h2>
                      <p className="text-sm text-gray-500">{section.description}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="ml-16 space-y-3">
                    {section.content.map((paragraph, pIdx) => (
                      <p
                        key={pIdx}
                        className="text-sm leading-relaxed text-gray-600 flex items-start gap-3"
                      >
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="section-container py-12 md:py-16">
        <div className="p-8 rounded-xl bg-gray-50 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            Important Notice
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            These legal documents are provided for informational purposes. For specific legal questions or concerns regarding SKEAM Technologies services, please contact us directly at <span className="font-medium text-gray-900">Skeamtechnologies@mail.com</span> or call <span className="font-medium text-gray-900">+234 712 000 2022</span>. Last updated: January 2024.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
