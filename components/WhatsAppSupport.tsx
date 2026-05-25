'use client';

import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export default function WhatsAppSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Gate Automation');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const whatsappPhone = '2347120002022';

  const validateForm = () => {
    const newErrors: { name?: string; phone?: string } = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!phone.trim()) newErrors.phone = 'Phone is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendMessage = () => {
    if (!validateForm()) return;

    const messageText = `Hello! My name is ${name}\nPhone: ${phone}\n\nService Interest: ${service}${message ? `\n\nMessage:\n${message}` : ''}`;

    window.open(
      `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(messageText)}`,
      '_blank'
    );

    setName('');
    setPhone('');
    setService('Gate Automation');
    setMessage('');
    setErrors({});
    setIsOpen(false);
  };

  return (
    <>
      {/* Sticky WhatsApp Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="
          fixed bottom-6 right-6 z-40
          w-14 h-14 rounded-full
          bg-blue-600 hover:bg-blue-700
          text-white shadow-lg
          flex items-center justify-center
          transition-colors duration-200
          sm:w-16 sm:h-16 sm:bottom-8 sm:right-8
        "
        title="Chat with us on WhatsApp"
        aria-label="Open WhatsApp chat"
      >
        <MessageCircle size={24} />
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="
            fixed inset-0 z-50
            bg-black/50
            flex items-center justify-center p-4
            animate-in fade-in duration-200
          "
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="
              w-full max-w-lg
              max-h-[90vh] overflow-y-auto
              rounded-2xl
              bg-white
              border border-gray-200
              shadow-xl overflow-hidden
              animate-in scale-in-95 duration-300
            "
          >
            {/* Header */}
            <div className="bg-blue-600 p-4 sm:p-6 relative">
              <button
                onClick={() => setIsOpen(false)}
                className="
                  absolute top-3 right-3 sm:top-4 sm:right-4
                  text-white/70 hover:text-white
                  transition-colors duration-150
                  p-1 rounded-lg hover:bg-white/10
                "
                aria-label="Close chat"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-3 sm:gap-4 pt-2">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/20 flex items-center justify-center">
                  <MessageCircle size={24} className="text-white" />
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-white">
                    WhatsApp Support
                  </h2>
                  <p className="text-white/90 text-xs sm:text-sm">
                    Instant chat with our team
                  </p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-4 sm:p-6 space-y-4">
              {/* Name Input */}
              <div>
                <label className="block text-gray-700 text-sm mb-2 font-medium">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                  placeholder="John Doe"
                  className={`
                    w-full px-4 py-3
                    bg-white border rounded-xl
                    text-gray-900 placeholder-gray-400
                    transition-colors duration-200
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${errors.name ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'}
                    text-sm sm:text-base
                  `}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Phone Input */}
              <div>
                <label className="block text-gray-700 text-sm mb-2 font-medium">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors({ ...errors, phone: undefined });
                  }}
                  placeholder="+234 712 000 2022"
                  className={`
                    w-full px-4 py-3
                    bg-white border rounded-xl
                    text-gray-900 placeholder-gray-400
                    transition-colors duration-200
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${errors.phone ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'}
                    text-sm sm:text-base
                  `}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              {/* Service Select */}
              <div>
                <label className="block text-gray-700 text-sm mb-2 font-medium">
                  Service Interested In
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="
                    w-full px-4 py-3
                    bg-white border border-gray-300 hover:border-gray-400
                    rounded-xl text-gray-900
                    transition-colors duration-200
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    cursor-pointer
                    text-sm sm:text-base
                  "
                >
                  <option value="Gate Automation">Gate Automation</option>
                  <option value="CCTV Surveillance Camera">CCTV Surveillance Camera</option>
                  <option value="Solar / Inverter">Solar / Inverter</option>
                </select>
              </div>

              {/* Message Textarea */}
              <div>
                <label className="block text-gray-700 text-sm mb-2 font-medium">
                  Additional Message (Optional)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us more about your inquiry..."
                  rows={3}
                  className="
                    w-full px-4 py-3
                    bg-white border border-gray-300 hover:border-gray-400
                    rounded-xl text-gray-900 placeholder-gray-400
                    transition-colors duration-200
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    resize-none
                    text-sm sm:text-base
                  "
                />
              </div>

              {/* Send Button */}
              <button
                onClick={sendMessage}
                disabled={!name.trim() || !phone.trim()}
                className="
                  mt-6 w-full
                  bg-blue-600 hover:bg-blue-700
                  disabled:bg-gray-300 disabled:cursor-not-allowed
                  text-white font-medium
                  py-4 rounded-xl
                  flex items-center justify-center gap-2
                  transition-colors duration-200
                  text-sm sm:text-base
                "
              >
                Send to WhatsApp
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
