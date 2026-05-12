'use client';

import { useState, useEffect } from 'react';
import { X, Check, Loader, ChevronRight, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  category: string;
  products: string[];
  quantity: string;
  message: string;
}

// Hardcoded Automation products
const hardcodedAutomationCategories = [
  {
    id: 'sliding-gate',
    name: 'Sliding Gate Automation',
    subtitle: 'Powerful and reliable sliding gate operators',
    tabName: 'Automation Products',
    isHardcoded: true,
    products: [
      { id: 'sg-1', name: 'D3 Smart' },
      { id: 'sg-2', name: 'D5 EVO Smart' },
      { id: 'sg-3', name: 'D6 Smart 35' },
      { id: 'sg-4', name: 'D10 Smart' },
      { id: 'sg-5', name: 'D10 Turbo Smart' },
      { id: 'sg-6', name: 'D20 Smart' },
    ],
  },
  {
    id: 'swing-gate',
    name: 'Swing Gate Automation',
    subtitle: 'Automatic swing gate solutions',
    tabName: 'Automation Products',
    isHardcoded: true,
    products: [
      { id: 'swg-1', name: 'R6 Rotary Swing Gate Motor' },
      { id: 'swg-2', name: 'Vantage Smart' },
      { id: 'swg-3', name: 'Vantage Smart+' },
    ],
  },
  {
    id: 'garage-door',
    name: 'Garage Door Operators',
    subtitle: 'Smart garage door automation',
    tabName: 'Automation Products',
    isHardcoded: true,
    products: [
      { id: 'gd-1', name: 'SDO4 Smart' },
      { id: 'gd-2', name: 'SDO5 Smart+' },
    ],
  },
];

const categories = {
  'sliding-gate': {
    label: 'Sliding Gate Automation',
    icon: '🚪',
  },
  'swing-gate': {
    label: 'Swing Gate Automation',
    icon: '🔓',
  },
  'garage-door': {
    label: 'Garage Door Operators',
    icon: '🏠',
  },
};

interface GetQuoteProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: string;
  defaultProducts?: string[];
}

export default function GetQuote({ isOpen, onClose, defaultCategory, defaultProducts }: GetQuoteProps) {
  const [formData, setFormData] = useState<QuoteFormData>({
    name: '',
    email: '',
    phone: '',
    category: defaultCategory || '',
    products: [],
    quantity: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [showManualSelection, setShowManualSelection] = useState(false);
  const [allCategories, setAllCategories] = useState<any[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [selectedManualCategory, setSelectedManualCategory] = useState<string | null>(null);

  const hasPreSelectedProducts = (defaultProducts?.length ?? 0) > 0;

  useEffect(() => {
    const fetchAllCategories = async () => {
      setLoadingCategories(true);
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api';
        const baseUrl = apiUrl.endsWith('/api') ? apiUrl.slice(0, -4) : apiUrl;
        const res = await fetch(`${baseUrl}/api/shop/tabs/`);
        if (res.ok) {
          const tabs = await res.json();
          const apiCats = tabs
            .filter((tab: any) => !tab.is_hardcoded)
            .flatMap((tab: any) =>
              tab.categories.map((cat: any) => ({
                ...cat,
                tabName: tab.display_name,
                isHardcoded: tab.is_hardcoded,
              }))
            );
          const combined = [...hardcodedAutomationCategories, ...apiCats];
          setAllCategories(combined);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        setAllCategories(hardcodedAutomationCategories);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchAllCategories();
  }, []);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        category: defaultCategory || '',
        products: defaultProducts ?? [],
        quantity: '',
        message: '',
      });
      setErrors({});
      setStep(1);
      setShowManualSelection(false);

      // Scroll to bottom to show the modal
      setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      }, 0);

      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable body scroll when modal closes
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, defaultCategory, defaultProducts]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (formData.products.length === 0) newErrors.products = 'Please select at least one product';
    if (!formData.quantity.trim()) newErrors.quantity = 'Quantity is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    setLoading(true);

    const selectedProducts = formData.products.join('\n• ');

    const message = `
📋 *QUOTE REQUEST*

*Customer Details:*
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

*Selected Products:*
• ${selectedProducts}

*Quantity: ${formData.quantity}

${formData.message ? `*Additional Details:*\n${formData.message}` : ''}

Please provide a detailed quote for the above products.
    `.trim();

    const whatsappPhone = '2347120002022';
    window.open(
      `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`,
      '_blank'
    );

    setFormData({
      name: '',
      email: '',
      phone: '',
      category: defaultCategory || '',
      products: [],
      quantity: '',
      message: '',
    });
    setErrors({});
    setLoading(false);
    setStep(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Bottom Sheet Modal - Slides up from bottom */}
          <motion.div
            key="modal"
            className="fixed bottom-0 left-0 right-0 z-50 max-h-[95vh] overflow-hidden"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Bottom Sheet Content */}
            <div className="h-full bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 rounded-t-3xl shadow-2xl border border-cyan-500/20 border-b-0 overflow-hidden flex flex-col">

              {/* Header with drag handle - Fixed */}
              <div className="flex-shrink-0 px-6 pt-4 pb-3 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 relative">
                {/* Drag Handle */}
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-1 bg-white/30 rounded-full" />
                </div>

                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-2xl font-bold text-white">Get a Quote</h2>
                  <button
                    onClick={onClose}
                    className="text-white/70 hover:text-white transition-colors p-1.5 hover:bg-white/10 rounded-lg"
                    aria-label="Close"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="flex gap-2">
                  {[1, 2, 3].map(i => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-all ${
                        i <= step ? 'bg-white' : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-white/80 text-xs mt-2">Step {step} of 3</p>
              </div>

              {/* Content - Scrollable */}
              <div className="flex-1 overflow-y-auto px-5 py-4 scroll-smooth">
                <AnimatePresence mode="wait">

                  {/* Step 1: Contact Info */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-3"
                    >
                      <div>
                        <h3 className="text-base font-semibold text-white mb-0.5">Contact Information</h3>
                        <p className="text-slate-400 text-xs">We'll use this to send your quote</p>
                      </div>

                      <div className="space-y-2.5">
                        <div>
                          <label className="block text-slate-300 text-xs font-medium mb-1">Full Name *</label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={e => {
                              setFormData(prev => ({ ...prev, name: e.target.value }));
                              if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                            }}
                            placeholder="John Doe"
                            className={`w-full px-3 py-2 bg-slate-800 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all text-sm ${
                              errors.name ? 'border-red-500/70' : 'border-white/10'
                            }`}
                          />
                          {errors.name && <p className="text-red-400 text-xs mt-0.5">{errors.name}</p>}
                        </div>

                        <div>
                          <label className="block text-slate-300 text-xs font-medium mb-1">Email Address *</label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={e => {
                              setFormData(prev => ({ ...prev, email: e.target.value }));
                              if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                            }}
                            placeholder="john@example.com"
                            className={`w-full px-3 py-2 bg-slate-800 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all text-sm ${
                              errors.email ? 'border-red-500/70' : 'border-white/10'
                            }`}
                          />
                          {errors.email && <p className="text-red-400 text-xs mt-0.5">{errors.email}</p>}
                        </div>

                        <div>
                          <label className="block text-slate-300 text-xs font-medium mb-1">Phone Number *</label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={e => {
                              setFormData(prev => ({ ...prev, phone: e.target.value }));
                              if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
                            }}
                            placeholder="+234 712 000 2022"
                            className={`w-full px-3 py-2 bg-slate-800 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all text-sm ${
                              errors.phone ? 'border-red-500/70' : 'border-white/10'
                            }`}
                          />
                          {errors.phone && <p className="text-red-400 text-xs mt-0.5">{errors.phone}</p>}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Product Selection */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-3"
                    >
                      <div>
                        <h3 className="text-base font-semibold text-white mb-0.5">Select Products</h3>
                        <p className="text-slate-400 text-xs">Choose what you're interested in</p>
                      </div>

                      {!hasPreSelectedProducts && (
                        <div className="p-2.5 bg-amber-900/30 border border-amber-600/50 rounded-lg flex gap-2 text-amber-200 text-xs">
                          <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                          <span>Select from shop first, or browse below</span>
                        </div>
                      )}

                      {hasPreSelectedProducts && !showManualSelection && (
                        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-2.5">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Check size={14} className="text-cyan-400" />
                              <span className="text-cyan-300 font-semibold text-xs">{formData.products.length} selected</span>
                            </div>
                            <button
                              onClick={() => setShowManualSelection(true)}
                              className="text-xs text-blue-400 hover:text-cyan-300 underline"
                            >
                              Change
                            </button>
                          </div>
                          <div className="space-y-1 max-h-28 overflow-y-auto">
                            {formData.products.map((product, idx) => (
                              <div key={idx} className="flex items-center justify-between p-1.5 bg-cyan-500/5 rounded text-xs">
                                <span className="text-cyan-200 truncate">{product}</span>
                                <button
                                  onClick={() => {
                                    setFormData(prev => ({
                                      ...prev,
                                      products: prev.products.filter(p => p !== product),
                                    }));
                                  }}
                                  className="text-xs text-red-400 hover:text-red-300 flex-shrink-0"
                                >
                                  ✕
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {(showManualSelection || !hasPreSelectedProducts) && (
                        <div className="space-y-1.5">
                          {hasPreSelectedProducts && showManualSelection && (
                            <button
                              onClick={() => setShowManualSelection(false)}
                              className="text-xs text-blue-400 hover:text-cyan-300 underline"
                            >
                              ← Back to selection
                            </button>
                          )}

                          {loadingCategories ? (
                            <div className="flex items-center justify-center py-4">
                              <Loader className="animate-spin text-cyan-500" size={18} />
                            </div>
                          ) : (
                            <div className="space-y-1.5 max-h-64 overflow-y-auto">
                              {allCategories.map((category) => (
                                <div key={category.id}>
                                  <button
                                    onClick={() =>
                                      setSelectedManualCategory(
                                        selectedManualCategory === category.id ? null : category.id
                                      )
                                    }
                                    className={`w-full p-2 rounded-lg border transition-all text-left flex items-center justify-between text-xs ${
                                      selectedManualCategory === category.id
                                        ? 'border-cyan-500 bg-cyan-500/15'
                                        : 'border-white/10 bg-slate-800/40 hover:border-white/20'
                                    }`}
                                  >
                                    <div className="flex-1 min-w-0">
                                      <h4 className={`font-semibold text-sm ${
                                        selectedManualCategory === category.id
                                          ? 'text-cyan-300'
                                          : 'text-white'
                                      }`}>
                                        {category.name}
                                      </h4>
                                    </div>
                                    <ChevronRight
                                      size={14}
                                      className={`flex-shrink-0 ml-1 transition-transform ${
                                        selectedManualCategory === category.id ? 'rotate-90' : ''
                                      }`}
                                    />
                                  </button>

                                  <AnimatePresence>
                                    {selectedManualCategory === category.id && (
                                      <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mt-1 ml-2 space-y-0.5 border-l-2 border-cyan-500/30 pl-2 overflow-hidden"
                                      >
                                        {category.products?.map((product: any) => (
                                          <button
                                            key={product.id}
                                            onClick={() => {
                                              const isSelected = formData.products.includes(product.name);
                                              setFormData(prev => ({
                                                ...prev,
                                                products: isSelected
                                                  ? prev.products.filter(p => p !== product.name)
                                                  : [...prev.products, product.name],
                                              }));
                                            }}
                                            className={`w-full p-1.5 rounded text-left flex items-center gap-1 text-xs transition-all ${
                                              formData.products.includes(product.name)
                                                ? 'bg-cyan-500/20 text-cyan-300'
                                                : 'text-slate-400 hover:text-slate-300'
                                            }`}
                                          >
                                            <div
                                              className={`w-3 h-3 rounded border flex items-center justify-center flex-shrink-0 ${
                                                formData.products.includes(product.name)
                                                  ? 'bg-cyan-500 border-cyan-500'
                                                  : 'border-slate-400'
                                              }`}
                                            >
                                              {formData.products.includes(product.name) && (
                                                <Check size={7} className="text-white" />
                                              )}
                                            </div>
                                            <span className="truncate">{product.name}</span>
                                          </button>
                                        ))}
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Step 3: Confirm Order */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-3"
                    >
                      <div>
                        <h3 className="text-base font-semibold text-white mb-0.5">Confirm Order</h3>
                        <p className="text-slate-400 text-xs">Review before submitting</p>
                      </div>

                      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-2.5">
                        <h4 className="text-blue-300 font-semibold text-xs mb-1.5">Products ({formData.products.length})</h4>
                        <div className="space-y-0.5 max-h-24 overflow-y-auto">
                          {formData.products.map((product, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-300">
                              <Check size={10} className="text-blue-400 flex-shrink-0" />
                              <span className="truncate">{product}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-300 text-xs font-medium mb-1">Quantity *</label>
                        <input
                          type="number"
                          value={formData.quantity}
                          onChange={e => {
                            setFormData(prev => ({ ...prev, quantity: e.target.value }));
                            if (errors.quantity) setErrors(prev => ({ ...prev, quantity: '' }));
                          }}
                          placeholder="e.g., 2"
                          min="1"
                          className={`w-full px-3 py-2 bg-slate-800 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all text-sm ${
                            errors.quantity ? 'border-red-500/70' : 'border-white/10'
                          }`}
                        />
                        {errors.quantity && <p className="text-red-400 text-xs mt-0.5">{errors.quantity}</p>}
                      </div>

                      <div>
                        <label className="block text-slate-300 text-xs font-medium mb-1">Additional Notes (Optional)</label>
                        <textarea
                          value={formData.message}
                          onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                          placeholder="Any special requirements..."
                          rows={1}
                          className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all resize-none text-xs"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer - Fixed Buttons */}
              <div className="flex-shrink-0 px-5 py-3 bg-slate-900/50 border-t border-white/10 flex gap-2">
                {step > 1 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="flex-1 py-2 bg-slate-700/50 hover:bg-slate-700 text-white font-semibold rounded-lg transition-all text-xs sm:text-sm"
                  >
                    Back
                  </button>
                )}

                {step < 3 && (
                  <button
                    onClick={() => setStep(step + 1)}
                    disabled={
                      (step === 1 && (!formData.name || !formData.email || !formData.phone)) ||
                      (step === 2 && formData.products.length === 0)
                    }
                    className={`flex-1 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 text-xs sm:text-sm ${
                      (step === 1 && (!formData.name || !formData.email || !formData.phone)) ||
                      (step === 2 && formData.products.length === 0)
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    }`}
                  >
                    Next <ChevronRight size={14} />
                  </button>
                )}

                {step === 3 && (
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-1 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 disabled:from-slate-600 disabled:to-slate-600 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 text-xs sm:text-sm"
                  >
                    {loading ? (
                      <>
                        <Loader size={14} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Check size={14} />
                        Send Quote
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Bottom padding for safe area */}
              <div className="h-2" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
