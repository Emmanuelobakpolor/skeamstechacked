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

  // Phone number without + or spaces for wa.me API
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

    // Reset form after sending
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
          bg-gradient-to-br from-green-400 via-blue-600 to-cyan-500
          text-white shadow-2xl
          flex items-center justify-center
          hover:shadow-lg hover:scale-110
          active:scale-95
          transition-all duration-200 ease-out
          group
          sm:w-16 sm:h-16 sm:bottom-8 sm:right-8
        "
        title="Chat with us on WhatsApp"
        aria-label="Open WhatsApp chat"
      >
        <MessageCircle size={24} className="group-hover:rotate-6 transition-transform duration-200 sm:size-28" />
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="
            fixed inset-0 z-50
            bg-black/80 backdrop-blur-md
            flex items-center justify-center p-4
            animate-in fade-in duration-200
          "
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="
              w-full max-w-lg
              max-h-[90vh] overflow-y-auto
              rounded-2xl sm:rounded-3xl
              border border-cyan-500/30 hover:border-cyan-500/50
              shadow-2xl overflow-hidden
              animate-in scale-in-95 duration-300
              transform transition-all
            "
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 via-blue-600 to-cyan-500 p-4 sm:p-6 relative">
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
                <X size={15} className="sm:size-20" />
              </button>

              <div className="flex items-center gap-3 sm:gap-4 pt-2">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors duration-150">
                  <MessageCircle size={24} className="sm:size-28 text-white" />
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
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
                <label className="block text-slate-300 text-sm mb-2 font-medium">
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
                    bg-slate-800 border rounded-xl
                    text-white placeholder-slate-500
                    transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-cyan-500
                    ${errors.name ? 'border-red-500/70' : 'border-white/10 hover:border-white/20'}
                    text-sm sm:text-base
                  `}
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Phone Input */}
              <div>
                <label className="block text-slate-300 text-sm mb-2 font-medium">
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
                    bg-slate-800 border rounded-xl
                    text-white placeholder-slate-500
                    transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-cyan-500
                    ${errors.phone ? 'border-red-500/70' : 'border-white/10 hover:border-white/20'}
                    text-sm sm:text-base
                  `}
                />
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
              </div>

              {/* Service Select */}
              <div>
                <label className="block text-slate-300 text-sm mb-2 font-medium">
                  Service Interested In
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="
                    w-full px-4 py-3
                    bg-slate-800 border border-white/10 hover:border-white/20
                    rounded-xl text-white
                    transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-cyan-500
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
                <label className="block text-slate-300 text-sm mb-2 font-medium">
                  Additional Message (Optional)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us more about your inquiry..."
                  rows={3}
                  className="
                    w-full px-4 py-3
                    bg-slate-800 border border-white/10 hover:border-white/20
                    rounded-xl text-white placeholder-slate-500
                    transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-cyan-500
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
                  blue-blue-600 to-cyan-500
                  hover:from-green-400 hover:via-blue-500 hover:to-cyan-400
                  disabled:from-slate-600 disabled:via-slate-600 disabled:to-slate-600
                  text-white font-semibold
                  py-4 rounded-2xl
                  flex items-center justify-center gap-2
                  transition-all duration-200
                  hover:shadow-lg disabled:shadow-none disabled:cursor-not-allowed
                  disabled:opacity-50
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
