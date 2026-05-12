'use client';

import Image from 'next/image';
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Search, Loader } from 'lucide-react';
import GetQuote from './GetQuote';

interface Product {
  id: string;
  name: string;
  image: string;
  specs: {
    speed?: string;
    weight?: string;
    voltage?: string;
    storage?: string;
    connectivity?: string;
    power?: string;
  };
  description: string;
  application: string;
}

interface AdminProduct {
  id: number;
  name: string;
  description: string;
  application: string;
  image_url: string | null;
  specs: Record<string, string>;
  category_name: string;
  images?: Array<{ id: number; image_url: string; order: number }>;
}

interface AdminCategory {
  id: number;
  name: string;
  subtitle: string;
  products: AdminProduct[];
}

interface ShopTab {
  id: number;
  name: string;
  display_name: string;
  description: string;
  order: number;
  is_hardcoded: boolean;
  categories: AdminCategory[];
}

const categories = [
  {
    id: 'sliding-gate',
    title: 'Sliding Gate Automation',
    subtitle: 'Powerful and reliable sliding gate operators',
    products: [
      {
        id: 'sg-1',
        name: 'D3 Smart',
        image: '/images/D3-SMART-BRAND.png',
        description: 'Premium entry-level sliding gate motor delivering the perfect combination of affordability, reliability, and cutting-edge technology.',
        application: 'Domestic gates weighing up to 300kg',
        specs: {
          speed: '24 m/min',
          weight: '300kg',
          voltage: '12V',
          storage: '32 users',
        },
      },
      {
        id: 'sg-2',
        name: 'D5 EVO Smart',
        image: '/images/D5EVO SMART PRODUCT.png',
        description: 'The next evolution of the world-renowned D5. Built for light-industrial gates, packed with smart technology designed to make your life easier, safer, and more convenient.',
        application: 'Residential/Light-Industrial gates weighing up to 500kg',
        specs: {
          speed: '24 m/min',
          weight: '500kg',
          voltage: '12V',
          storage: '1500 users',
        },
      },
      {
        id: 'sg-3',
        name: 'D10 Smart',
        image: '/images/D10 SMART BRANDED NEW.png',
        description: 'Built to handle the demands of busy sites and heavy gates, performing up to 750 operations per day with a rugged die-cast aluminium gearbox.',
        application: 'Commercial/Industrial gates weighing up to 1000kg',
        specs: {
          speed: '26 m/min',
          weight: '1000kg',
          voltage: '24V',
          storage: '1500 users',
        },
      },
      {
        id: 'sg-4',
        name: 'D20 Smart',
        image: '/images/D2O SMART BRANDED.png',
        description: 'Ultimate power and SMART precision for industrial and commercial sites requiring unmatched power and durability.',
        application: 'Commercial/Industrial gates weighing up to 2000kg',
        specs: {
          speed: '18 m/min',
          weight: '2000kg',
          voltage: '24V',
          storage: '1500 users',
        },
      },
      {
        id: 'sg-5',
        name: 'D6 Smart 35',
        image: '/images/D6 SMART BRANDED.png',
        description: 'Delivers unmatched speed, security, and reliability. The perfect choice for domestic, residential, and light-industrial properties.',
        application: 'Domestic/Residential/Light-Industrial gates weighing up to 600kg',
        specs: {
          speed: '35 m/min',
          weight: '600kg',
          voltage: '24V',
          storage: '1500 users',
        },
      },
      {
        id: 'sg-6',
        name: 'D10 Turbo Smart',
        image: '/images/D1O TURBO BRANDED NEW.png',
        description: 'Combines lightning-fast speed with advanced security features. Unrivalled speed and SMART control for convenience and safety.',
        application: 'Residential gates weighing up to 250kg',
        specs: {
          speed: '43 m/min',
          weight: '250kg',
          voltage: '24V',
          storage: '1500 users',
        },
      },
    ],
  },
  {
    id: 'swing-gate',
    title: 'Swing Gate Automation',
    subtitle: 'Professional swing gate operators for residential & commercial',
    products: [
      {
        id: 'swg-1',
        name: 'R6 Rotary Swing Gate Motor',
        image: '/images/R6 SWING GATE BRANDED.png',
        description: 'The ultimate solution for homeowners looking to enhance their property\'s functionality. Seamless operation with unmatched peace of mind.',
        application: 'Domestic and commercial swing gates up to 750kg',
        specs: {
          speed: '15 seconds',
          weight: '750kg',
          voltage: '12V',
        },
      },
      {
        id: 'swg-2',
        name: 'Vantage Smart',
        image: '/images/VANTAGE SMART BRANDED.png',
        description: 'A low-profile, in-line linear swing gate operator perfect for most domestic and commercial applications. Reliability meets elegance.',
        application: 'Domestic (V300) & Commercial (V400/V500)',
        specs: {
          speed: '14.3 seconds',
          weight: '500kg',
          voltage: '12V',
        },
      },
      {
        id: 'swg-3',
        name: 'Vantage Smart+',
        image: '/images/SWING GATE VANTAGE PLUS BRANDED.png',
        description: 'The premium low-profile, in-line linear swing gate operator with the latest smart technology integration for seamless home automation.',
        application: 'Domestic (V300) & Commercial (V400/V500)',
        specs: {
          speed: '14.3 seconds',
          weight: '500kg',
          voltage: '12V',
        },
      },
    ],
  },
  {
    id: 'garage-door',
    title: 'Garage Door Operators',
    subtitle: 'Durable garage door automation solutions',
    products: [
      {
        id: 'gd-1',
        name: 'SDO5 Smart+',
        image: '/images/BRANDED DESIGN FOR GARAGE DOOR.png',
        description: 'Quiet performance for everyday living. Brings SMART+ remote access to your garage door motor, built for reliable daily access and SMARTer control.',
        application: 'Standard domestic and larger/heavier garage doors',
        specs: {
          speed: '9 m/min',
          weight: '1200N (T12)',
          power: 'Mains',
          connectivity: 'SMART+',
        },
      },
      {
        id: 'gd-2',
        name: 'SDO4 Smart',
        image: '/images/BRAND DESIGN GARAGE 5.png',
        description: 'Where convenience and security take centre stage. Control your garage door from your smartphone with real-time notifications.',
        application: 'Standard domestic and larger/heavier garage doors',
        specs: {
          speed: '9 m/min',
          weight: '1200N (T12)',
          power: '24V',
          connectivity: 'SMART Legacy',
        },
      },
    ],
  },
];

function ProductCarousel({ products }: { products: (Product | AdminProduct)[] }) {
  const [currentProduct, setCurrentProduct] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);

  const currentProductData = products[currentProduct];
  // Get all images for current product (both hardcoded and admin products)
  const productImages = ((currentProductData as any).images || []).map((img: any) => img.image_url || img.image);
  const mainImage = (currentProductData as any).image || (currentProductData as any).image_url;
  const allImages = productImages.length > 0 ? productImages : mainImage ? [mainImage] : [];

  // Auto-slide through images within a product
  useEffect(() => {
    if (allImages.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % allImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [allImages.length]);

  // Auto-slide through products every 8 seconds (or when images finish cycling)
  useEffect(() => {
    if (products.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentProduct(prev => (prev + 1) % products.length);
      setCurrentImage(0);
    }, 8000);
    return () => clearInterval(timer);
  }, [products.length]);

  const nextProduct = () => {
    setCurrentProduct(prev => (prev + 1) % products.length);
    setCurrentImage(0);
  };

  const prevProduct = () => {
    setCurrentProduct(prev => (prev - 1 + products.length) % products.length);
    setCurrentImage(0);
  };

  const nextImage = () => {
    if (allImages.length > 0) {
      setCurrentImage(prev => (prev + 1) % allImages.length);
    }
  };

  const prevImage = () => {
    if (allImages.length > 0) {
      setCurrentImage(prev => (prev - 1 + allImages.length) % allImages.length);
    }
  };

  if (products.length === 0) return null;

  return (
    <div className="relative w-full group">
      {/* Carousel - Images within Product */}
      <div className="relative h-80 sm:h-96 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900/20 to-slate-900/40">
        <div className="relative w-full h-full">
          {/* Images */}
          <div
            className="flex h-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentImage * 100}%)` }}
          >
            {allImages.length > 0 ? (
              allImages.map((imageUrl: string, idx: number) => (
                <div
                  key={idx}
                  className="relative w-full h-full flex-shrink-0 bg-blue-950 flex items-center justify-center p-4 sm:p-8"
                >
                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      alt={`${currentProductData.name} - Image ${idx + 1}`}
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={idx === currentImage}
                    />
                  )}
                </div>
              ))
            ) : (
              <div className="relative w-full h-full bg-blue-950 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-blue-600 mb-2">No image available</div>
                </div>
              </div>
            )}
          </div>

          {/* Left Gradient */}
          <div className="absolute inset-y-0 left-0 w-12 sm:w-16 bg-gradient-to-r from-black/40 to-transparent z-10 pointer-events-none" />

          {/* Right Gradient */}
          <div className="absolute inset-y-0 right-0 w-12 sm:w-16 bg-gradient-to-l from-black/40 to-transparent z-10 pointer-events-none" />

          {/* Image Navigation - Only show if multiple images */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 backdrop-blur-sm text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100"
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 backdrop-blur-sm text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100"
                aria-label="Next image"
              >
                ›
              </button>
            </>
          )}

          {/* Image Indicator Dots - Bottom left */}
          {allImages.length > 1 && (
            <div className="absolute bottom-4 left-4 flex gap-1.5 z-20">
              {allImages.map((_: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`rounded-full transition-all duration-300 ${
                    index === currentImage
                      ? 'bg-cyan-400 w-5 h-2'
                      : 'bg-white/40 w-2 h-2 hover:bg-white/60'
                  }`}
                  aria-label={`Image ${index + 1}`}
                  title={`Image ${index + 1} of ${allImages.length}`}
                />
              ))}
            </div>
          )}

          {/* Product Indicator - Bottom right (only if multiple products) */}
          {products.length > 1 && (
            <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs text-white font-medium z-20">
              {currentProduct + 1} / {products.length}
            </div>
          )}
        </div>
      </div>

      {/* Product Navigation Arrows - Below image carousel */}
      {products.length > 1 && (
        <div className="flex items-center justify-between mt-3 gap-2">
          <button
            onClick={prevProduct}
            className="flex-shrink-0 bg-blue-800/50 hover:bg-blue-700 backdrop-blur-sm text-white w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
            aria-label="Previous product"
          >
            ‹
          </button>
          <h3 className="text-base sm:text-lg font-bold text-white flex-1 line-clamp-2 px-2">
            {currentProductData.name}
          </h3>
          <button
            onClick={nextProduct}
            className="flex-shrink-0 bg-blue-800/50 hover:bg-blue-700 backdrop-blur-sm text-white w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
            aria-label="Next product"
          >
            ›
          </button>
        </div>
      )}

      {/* Product Info */}
      <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
        <div>
          {products.length === 1 && (
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{currentProductData.name}</h3>
          )}
          <p className="text-blue-200 text-sm sm:text-base mb-2 sm:mb-3 line-clamp-2">{currentProductData.description}</p>
          <p className="text-xs sm:text-sm text-cyan-300 font-semibold">✓ {currentProductData.application}</p>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
          {currentProductData.specs.speed && (
            <div className="bg-gradient-to-br from-blue-600/30 to-cyan-600/20 border border-blue-500/40 rounded-lg sm:rounded-xl p-2 sm:p-3">
              <p className="text-blue-300 text-xs font-semibold uppercase">Speed</p>
              <p className="text-cyan-300 font-bold text-xs sm:text-sm mt-1">{currentProductData.specs.speed}</p>
            </div>
          )}
          {currentProductData.specs.weight && (
            <div className="bg-gradient-to-br from-blue-600/30 to-cyan-600/20 border border-blue-500/40 rounded-lg sm:rounded-xl p-2 sm:p-3">
              <p className="text-blue-300 text-xs font-semibold uppercase">Weight</p>
              <p className="text-cyan-300 font-bold text-xs sm:text-sm mt-1">{currentProductData.specs.weight}</p>
            </div>
          )}
          {currentProductData.specs.voltage && (
            <div className="bg-gradient-to-br from-blue-600/30 to-cyan-600/20 border border-blue-500/40 rounded-lg sm:rounded-xl p-2 sm:p-3">
              <p className="text-blue-300 text-xs font-semibold uppercase">Voltage</p>
              <p className="text-cyan-300 font-bold text-xs sm:text-sm mt-1">{currentProductData.specs.voltage}</p>
            </div>
          )}
          {currentProductData.specs.power && (
            <div className="bg-gradient-to-br from-blue-600/30 to-cyan-600/20 border border-blue-500/40 rounded-lg sm:rounded-xl p-2 sm:p-3">
              <p className="text-blue-300 text-xs font-semibold uppercase">Power</p>
              <p className="text-cyan-300 font-bold text-xs sm:text-sm mt-1">{currentProductData.specs.power}</p>
            </div>
          )}
          {currentProductData.specs.storage && (
            <div className="bg-gradient-to-br from-blue-600/30 to-cyan-600/20 border border-blue-500/40 rounded-lg sm:rounded-xl p-2 sm:p-3">
              <p className="text-blue-300 text-xs font-semibold uppercase">Storage</p>
              <p className="text-cyan-300 font-bold text-xs sm:text-sm mt-1">{currentProductData.specs.storage}</p>
            </div>
          )}
          {currentProductData.specs.connectivity && (
            <div className="bg-gradient-to-br from-blue-600/30 to-cyan-600/20 border border-blue-500/40 rounded-lg sm:rounded-xl p-2 sm:p-3">
              <p className="text-blue-300 text-xs font-semibold uppercase">Connectivity</p>
              <p className="text-cyan-300 font-bold text-xs sm:text-sm mt-1">{currentProductData.specs.connectivity}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Admin Product Carousel Component
// ============================================================================

interface AdminProductCarouselProps {
  product: AdminProduct;
}

function AdminProductCarousel({ product }: AdminProductCarouselProps) {
  const [currentImage, setCurrentImage] = useState(0);

  // Use product gallery images, or fall back to hero image
  const rawImages = (product.images && product.images.length > 0)
    ? product.images
    : product.image_url
      ? [{ id: -1, image_url: product.image_url, order: 0 }]
      : [];

  const imageUrls: string[] = rawImages
    .slice()
    .sort((a, b) => a.order - b.order)
    .map(img => img.image_url)
    .filter(Boolean);

  // Reset image index when product changes
  useEffect(() => {
    setCurrentImage(0);
  }, [product.id]);

  // Auto-slide images every 4 seconds
  useEffect(() => {
    if (imageUrls.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % imageUrls.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [imageUrls.length, product.id]);

  const nextImage = () => {
    if (imageUrls.length > 0) {
      setCurrentImage(prev => (prev + 1) % imageUrls.length);
    }
  };

  const prevImage = () => {
    if (imageUrls.length > 0) {
      setCurrentImage(prev => (prev - 1 + imageUrls.length) % imageUrls.length);
    }
  };

  return (
    <div className="relative w-full group">
      {/* Image Carousel */}
      <div className="relative h-80 sm:h-96 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900/20 to-slate-900/40">
        {/* Image Track */}
        <div
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentImage * 100}%)` }}
        >
          {imageUrls.length > 0 ? (
            imageUrls.map((url, idx) => (
              <div
                key={idx}
                className="relative w-full h-full flex-shrink-0 bg-blue-950 flex items-center justify-center p-4 sm:p-8"
              >
                <Image
                  src={url}
                  alt={`${product.name} - Image ${idx + 1}`}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={idx === currentImage}
                />
              </div>
            ))
          ) : (
            <div className="relative w-full h-full bg-blue-950 flex items-center justify-center">
              <span className="text-blue-600">No image available</span>
            </div>
          )}
        </div>

        {/* Left Gradient */}
        <div className="absolute inset-y-0 left-0 w-12 sm:w-16 bg-gradient-to-r from-black/40 to-transparent z-10 pointer-events-none" />

        {/* Right Gradient */}
        <div className="absolute inset-y-0 right-0 w-12 sm:w-16 bg-gradient-to-l from-black/40 to-transparent z-10 pointer-events-none" />

        {/* Image Navigation Arrows — only if multiple images */}
        {imageUrls.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 backdrop-blur-sm text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 backdrop-blur-sm text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              ›
            </button>
          </>
        )}

        {/* Image Indicator Dots — bottom-left */}
        {imageUrls.length > 1 && (
          <div className="absolute bottom-4 left-4 flex gap-1.5 z-20">
            {imageUrls.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`rounded-full transition-all duration-300 ${
                  index === currentImage
                    ? 'bg-cyan-400 w-5 h-2'
                    : 'bg-white/40 w-2 h-2 hover:bg-white/60'
                }`}
                aria-label={`Image ${index + 1}`}
              />
            ))}
          </div>
        )}

      </div>

      {/* Product Info — below carousel */}
      <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{product.name}</h3>
          {product.description && (
            <p className="text-blue-200 text-sm sm:text-base mb-2 sm:mb-3 line-clamp-2">
              {product.description}
            </p>
          )}
          {product.application && (
            <p className="text-xs sm:text-sm text-cyan-300 font-semibold">✓ {product.application}</p>
          )}
        </div>

        {/* Specs Grid — dynamic rendering */}
        {Object.keys(product.specs).length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
            {Object.entries(product.specs).map(([key, value]) =>
              value ? (
                <div
                  key={key}
                  className="bg-gradient-to-br from-blue-600/30 to-cyan-600/20 border border-blue-500/40 rounded-lg sm:rounded-xl p-2 sm:p-3"
                >
                  <p className="text-blue-300 text-xs font-semibold uppercase">{key}</p>
                  <p className="text-cyan-300 font-bold text-xs sm:text-sm mt-1">{value}</p>
                </div>
              ) : null
            )}
          </div>
        )}
      </div>
    </div>
  );
}

interface FloatingQuoteBarProps {
  selections: Record<string, string[]>;
  categories: typeof categories;
  onRequestQuote: (categoryId: string) => void;
  onClearAll: () => void;
}

function FloatingQuoteBar({ selections, categories: cats, onRequestQuote, onClearAll }: FloatingQuoteBarProps) {
  const totalSelected = Object.values(selections).reduce((sum, arr) => sum + arr.length, 0);

  if (totalSelected === 0) return null;

  const activeCategoryEntries = Object.entries(selections).filter(([, arr]) => arr.length > 0);

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-40 p-4 md:p-6"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="max-w-4xl mx-auto bg-slate-900/95 backdrop-blur-md border border-cyan-500/40 rounded-2xl shadow-2xl shadow-cyan-500/10 p-4 md:p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Left: Summary */}
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-sm">
              {totalSelected} product{totalSelected !== 1 ? 's' : ''} selected
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
              {activeCategoryEntries.map(([catId, products]) => {
                const catLabel = cats.find(c => c.id === catId)?.title ?? catId;
                return (
                  <span key={catId} className="text-xs text-cyan-300">
                    {catLabel}: {products.length}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={onClearAll}
              className="text-sm text-blue-400 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-slate-800"
            >
              Clear all
            </button>

            {/* If single category, show one button; if multiple, show per-category buttons */}
            {activeCategoryEntries.length === 1 ? (
              <motion.button
                onClick={() => onRequestQuote(activeCategoryEntries[0][0])}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold rounded-xl transition-all shadow-lg text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Request Quote
              </motion.button>
            ) : (
              <div className="flex gap-2">
                {activeCategoryEntries.map(([catId]) => {
                  const cat = cats.find(c => c.id === catId);
                  return (
                    <motion.button
                      key={catId}
                      onClick={() => onRequestQuote(catId)}
                      className="px-3 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold rounded-xl transition-all shadow-lg text-xs"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Quote {cat?.title.split(' ')[0]}
                    </motion.button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Shop() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteCategory, setQuoteCategory] = useState('');
  const [quoteProducts, setQuoteProducts] = useState<string[]>([]);
  const [selections, setSelections] = useState<Record<string, string[]>>({
    'sliding-gate': [],
    'swing-gate': [],
    'garage-door': [],
  });

  // Tabs and filters
  const [shopTabs, setShopTabs] = useState<ShopTab[]>([]);
  const [activeTabId, setActiveTabId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<AdminProduct[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loadingTabs, setLoadingTabs] = useState(true);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();


  // Remove trailing /api if present, since we add it ourselves in the fetch URLs
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api';
  const apiUrl = baseUrl.endsWith('/api') ? baseUrl.slice(0, -4) : baseUrl;

  const totalSelected = Object.values(selections).reduce((sum, arr) => sum + arr.length, 0);

  // Fetch tabs with their categories on mount
  useEffect(() => {
    const fetchTabs = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/shop/tabs/`);
        if (res.ok) {
          const data: ShopTab[] = await res.json();
          setShopTabs(data);
          // Set active tab to first tab
          if (data.length > 0) {
            setActiveTabId(data[0].id);
          }
        } else {
          console.error('Failed to fetch shop tabs: HTTP', res.status);
        }
      } catch (error) {
        console.error('Failed to fetch shop tabs:', error);
      } finally {
        setLoadingTabs(false);
      }
    };
    fetchTabs();
  }, [apiUrl]);

  // Debounced search
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

    if (!query.trim()) {
      setSearchResults(null);
      return;
    }

    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`${apiUrl}/api/shop/search/?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setSearchResults(data);
        }
      } catch (error) {
        console.error('Search failed:', error);
      }
    }, 400);
  }, [apiUrl]);

  // Get current active tab data
  const currentTab = shopTabs.find(tab => tab.id === activeTabId);
  const tabCategories = currentTab?.categories.map(c => c.id.toString()) || [];

  // For Automation tab, we still use hardcoded categories
  const isAutomationTab = currentTab?.is_hardcoded === true;

  const toggleProduct = (categoryId: string, productName: string) => {
    setSelections(prev => {
      const current = prev[categoryId] ?? [];
      const isSelected = current.includes(productName);
      return {
        ...prev,
        [categoryId]: isSelected
          ? current.filter(p => p !== productName)
          : [...current, productName],
      };
    });
  };

  const openQuoteModal = (categoryId: string, products: string[] = []) => {
    setQuoteCategory(categoryId);
    setQuoteProducts(products);
    setQuoteOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-blue-950">
      <GetQuote isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} defaultCategory={quoteCategory} defaultProducts={quoteProducts} />
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 md:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Background Elements */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl" />

          {/* Content */}
          <motion.div
            className="relative z-10 max-w-3xl mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Automation Products & Solutions
            </h1>
            <p className="text-xl text-blue-200 leading-relaxed">
              Browse our complete collection of gate automation, swing gate operators, and garage door solutions. Premium quality products engineered for performance and reliability.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="relative z-10 px-4 md:px-8 pt-8 pb-8 border-b border-blue-600/40">
        <div className="max-w-7xl mx-auto">
          {/* Tab Buttons */}
          <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
            {shopTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => { setActiveTabId(tab.id); setSelectedCategory(null); setSearchQuery(''); setSearchResults(null); }}
                className={`px-6 py-2 rounded-lg font-semibold transition-all whitespace-nowrap ${
                  activeTabId === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                {tab.display_name}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search products, categories, features..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-blue-600/40 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Category Filter Pills */}
          {!searchResults && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === null
                    ? 'bg-cyan-500 text-white'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                All
              </button>
              {isAutomationTab ? (
                categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-cyan-500 text-white'
                        : 'bg-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    {cat.title}
                  </button>
                ))
              ) : (
                currentTab?.categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id.toString())}
                    className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                      selectedCategory === cat.id.toString()
                        ? 'bg-cyan-500 text-white'
                        : 'bg-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className={`relative z-10 px-4 md:px-8 transition-all duration-300 ${totalSelected > 0 ? 'pb-40' : 'pb-20'}`}>
        <div className="max-w-7xl mx-auto space-y-24">
          {/* Search Results */}
          {searchResults && (
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-white mb-2">Search Results</h2>
                <p className="text-lg text-blue-200">{searchResults.length} product{searchResults.length !== 1 ? 's' : ''} found</p>
              </div>
              {searchResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.map((product) => {
                    const categoryKey = `admin-${product.id}`;
                    const isSelected = selections[categoryKey]?.includes(product.name) ?? false;
                    return (
                      <motion.button
                        key={product.id}
                        onClick={() => {
                          if (!selections[categoryKey]) {
                            setSelections(prev => ({ ...prev, [categoryKey]: [] }));
                          }
                          toggleProduct(categoryKey, product.name);
                        }}
                        className={`text-left p-4 rounded-xl border-2 transition-all duration-200 group ${
                          isSelected
                            ? 'bg-cyan-500/15 border-cyan-500 shadow-lg shadow-cyan-500/10'
                            : 'bg-gradient-to-r from-blue-800/40 to-blue-700/20 border-blue-600/40 hover:border-blue-400 hover:from-blue-700/60 hover:to-blue-600/40'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {product.image_url && (
                          <div className="relative w-full h-40 mb-3 bg-slate-900 rounded-lg overflow-hidden">
                            <Image
                              src={product.image_url}
                              alt={product.name}
                              fill
                              className="object-contain p-2"
                            />
                          </div>
                        )}
                        <div className="flex items-start gap-2 mb-2">
                          <div
                            className={`mt-0.5 w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                              isSelected
                                ? 'bg-cyan-500 border-cyan-500'
                                : 'border-blue-400 bg-transparent group-hover:border-cyan-400'
                            }`}
                          >
                            {isSelected && <Check size={12} className="text-white" strokeWidth={3} />}
                          </div>
                          <h4 className={`text-base font-semibold transition-colors ${
                            isSelected ? 'text-cyan-300' : 'text-white group-hover:text-cyan-300'
                          }`}>
                            {product.name}
                          </h4>
                        </div>
                        <p className="text-xs text-blue-300 mb-2">{product.application}</p>
                        {Object.entries(product.specs).length > 0 && (
                          <div className="grid grid-cols-2 gap-1.5 text-xs">
                            {Object.entries(product.specs).map(([key, value]) => (
                              <div key={key} className="text-blue-200">
                                <span className="text-cyan-300 font-semibold capitalize">{key}:</span> {value}
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              ) : (
                <p className="text-slate-400">No products match your search. Try different keywords.</p>
              )}
            </div>
          )}

          {/* Automation Products Tab (Hardcoded) */}
          {!searchResults && isAutomationTab && categories.map((category, idx) => {
            const shouldShow = selectedCategory === null || selectedCategory === category.id;
            if (!shouldShow) return null;

            return (
              <motion.div
                key={category.id}
                className="space-y-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
              {/* Category Header */}
              <div className="border-b border-blue-600/40 pb-6">
                <h2 className="text-4xl font-bold text-white mb-2">{category.title}</h2>
                <p className="text-lg text-blue-200">{category.subtitle}</p>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Product Carousel */}
                <div>
                  <ProductCarousel products={category.products} />
                </div>

                {/* Product List */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-white">Available Models</h3>
                    {selections[category.id].length > 0 && (
                      <button
                        onClick={() => setSelections(prev => ({ ...prev, [category.id]: [] }))}
                        className="text-xs text-blue-400 hover:text-cyan-300 transition-colors underline"
                      >
                        Clear {selections[category.id].length} selected
                      </button>
                    )}
                  </div>
                  <div className="space-y-3">
                    {category.products.map((product) => {
                      const isSelected = selections[category.id].includes(product.name);
                      return (
                        <motion.button
                          key={product.id}
                          onClick={() => toggleProduct(category.id, product.name)}
                          className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 group ${
                            isSelected
                              ? 'bg-cyan-500/15 border-cyan-500 shadow-lg shadow-cyan-500/10'
                              : 'bg-gradient-to-r from-blue-800/40 to-blue-700/20 border-blue-600/40 hover:border-blue-400 hover:from-blue-700/60 hover:to-blue-600/40'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          aria-pressed={isSelected}
                          aria-label={`${isSelected ? 'Deselect' : 'Select'} ${product.name}`}
                        >
                          <div className="flex items-start gap-3">
                            {/* Checkbox */}
                            <div
                              className={`mt-0.5 w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                                isSelected
                                  ? 'bg-cyan-500 border-cyan-500'
                                  : 'border-blue-400 bg-transparent group-hover:border-cyan-400'
                              }`}
                            >
                              {isSelected && <Check size={12} className="text-white" strokeWidth={3} />}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className={`text-base font-semibold transition-colors ${
                                  isSelected ? 'text-cyan-300' : 'text-white group-hover:text-cyan-300'
                                }`}>
                                  {product.name}
                                </h4>
                                {isSelected && (
                                  <span className="text-xs text-cyan-400 font-medium bg-cyan-500/10 px-2 py-0.5 rounded-full">
                                    Selected
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-blue-300 mb-2">{product.application}</p>
                              <div className="grid grid-cols-2 gap-1.5 text-xs">
                                {Object.entries(product.specs).map(([key, value]) =>
                                  value ? (
                                    <div key={key} className="text-blue-200">
                                      <span className="text-cyan-300 font-semibold capitalize">{key}:</span> {value}
                                    </div>
                                  ) : null
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Get Quote Button at Bottom */}
              <div className="flex justify-center mt-8">
                <motion.button
                  onClick={() => openQuoteModal(category.id, selections[category.id])}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/30"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Quote for {category.title}
                </motion.button>
              </div>
            </motion.div>
            );
          })}

          {/* Dynamic Tabs (Non-Hardcoded) */}
          {!searchResults && !isAutomationTab && (
            <>
              {loadingTabs ? (
                <div className="flex items-center justify-center py-16">
                  <Loader className="animate-spin text-cyan-500" size={32} />
                </div>
              ) : !currentTab || currentTab.categories.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-slate-400 text-lg">No products yet in {currentTab?.display_name}. Check back soon!</p>
                </div>
              ) : (
                currentTab.categories.map((adminCategory, idx) => {
                  const shouldShow = selectedCategory === null || selectedCategory === adminCategory.id.toString();
                  if (!shouldShow) return null;

                  return (
                    <motion.div
                      key={adminCategory.id}
                      className="space-y-8"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                    >
                      <div className="border-b border-blue-600/40 pb-6">
                        <h2 className="text-4xl font-bold text-white mb-2">{adminCategory.name}</h2>
                        {adminCategory.subtitle && <p className="text-lg text-blue-200">{adminCategory.subtitle}</p>}
                      </div>

                      {/* Products with Carousel */}
                      {adminCategory.products.map((product, productIdx) => {
                        const categoryKey = `admin-cat-${adminCategory.id}`;
                        const isSelected = selections[categoryKey]?.includes(product.name) ?? false;
                        const [currentImageIdx, setCurrentImageIdx] = useState(0);

                        const productImages = product.images && product.images.length > 0
                          ? product.images.map(img => img.image_url)
                          : product.image_url
                            ? [product.image_url]
                            : [];

                        const nextImage = () => {
                          setCurrentImageIdx((prev) => (prev + 1) % productImages.length);
                        };

                        const prevImage = () => {
                          setCurrentImageIdx((prev) => (prev - 1 + productImages.length) % productImages.length);
                        };

                        return (
                          <div key={product.id} className="space-y-4">
                            {/* Image Carousel */}
                            <div className="relative w-full group">
                              <div className="relative h-80 sm:h-96 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900/20 to-slate-900/40">
                                {/* Image Track */}
                                <div
                                  className="flex h-full transition-transform duration-500 ease-out"
                                  style={{ transform: `translateX(-${currentImageIdx * 100}%)` }}
                                >
                                  {productImages.length > 0 ? (
                                    productImages.map((url, imgIdx) => (
                                      <div
                                        key={imgIdx}
                                        className="relative w-full h-full flex-shrink-0 bg-blue-950 flex items-center justify-center p-4 sm:p-8"
                                      >
                                        <Image
                                          src={url}
                                          alt={`${product.name} - Image ${imgIdx + 1}`}
                                          fill
                                          className="object-contain p-4"
                                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                          priority={imgIdx === currentImageIdx}
                                        />
                                      </div>
                                    ))
                                  ) : (
                                    <div className="relative w-full h-full bg-blue-950 flex items-center justify-center">
                                      <span className="text-blue-600">No image available</span>
                                    </div>
                                  )}
                                </div>

                                {/* Left Gradient */}
                                <div className="absolute inset-y-0 left-0 w-12 sm:w-16 bg-gradient-to-r from-black/40 to-transparent z-10 pointer-events-none" />

                                {/* Right Gradient */}
                                <div className="absolute inset-y-0 right-0 w-12 sm:w-16 bg-gradient-to-l from-black/40 to-transparent z-10 pointer-events-none" />

                                {/* Navigation Arrows — only if multiple images */}
                                {productImages.length > 1 && (
                                  <>
                                    <button
                                      onClick={prevImage}
                                      className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 backdrop-blur-sm text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100"
                                      aria-label="Previous image"
                                    >
                                      ‹
                                    </button>
                                    <button
                                      onClick={nextImage}
                                      className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 backdrop-blur-sm text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100"
                                      aria-label="Next image"
                                    >
                                      ›
                                    </button>
                                  </>
                                )}

                                {/* Image Indicator Dots — bottom-left */}
                                {productImages.length > 1 && (
                                  <div className="absolute bottom-4 left-4 flex gap-1.5 z-20">
                                    {productImages.map((_, imgIdx) => (
                                      <button
                                        key={imgIdx}
                                        onClick={() => setCurrentImageIdx(imgIdx)}
                                        className={`rounded-full transition-all duration-300 ${
                                          imgIdx === currentImageIdx
                                            ? 'bg-cyan-400 w-5 h-2'
                                            : 'bg-white/40 w-2 h-2 hover:bg-white/60'
                                        }`}
                                        aria-label={`Image ${imgIdx + 1}`}
                                      />
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Product Info */}
                            <div className="space-y-3 sm:space-y-4">
                              <div>
                                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{product.name}</h3>
                                <p className="text-blue-200 text-sm sm:text-base mb-2 sm:mb-3 line-clamp-2">{product.description}</p>
                                {product.application && <p className="text-xs sm:text-sm text-cyan-300 font-semibold">✓ {product.application}</p>}
                              </div>

                              {/* Specs Grid */}
                              {Object.keys(product.specs).length > 0 && (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
                                  {Object.entries(product.specs).map(([key, value]) =>
                                    value ? (
                                      <div key={key} className="bg-gradient-to-br from-blue-600/30 to-cyan-600/20 border border-blue-500/40 rounded-lg sm:rounded-xl p-2 sm:p-3">
                                        <p className="text-blue-300 text-xs font-semibold uppercase">{key}</p>
                                        <p className="text-cyan-300 font-bold text-xs sm:text-sm mt-1">{value}</p>
                                      </div>
                                    ) : null
                                  )}
                                </div>
                              )}
                            </div>

                            {/* Get Quote Button */}
                            <div className="flex justify-center">
                              <motion.button
                                onClick={() => {
                                  setSelections(prev => ({
                                    ...prev,
                                    [categoryKey]: isSelected
                                      ? selections[categoryKey]?.filter(name => name !== product.name) ?? []
                                      : [...(selections[categoryKey] ?? []), product.name]
                                  }));
                                  openQuoteModal(adminCategory.id.toString(),
                                    isSelected
                                      ? selections[categoryKey]?.filter(name => name !== product.name) ?? []
                                      : [...(selections[categoryKey] ?? []), product.name]
                                  );
                                }}
                                className={`px-8 py-3 rounded-lg font-bold transition-all duration-200 ${
                                  isSelected
                                    ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30'
                                    : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white'
                                }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                {isSelected ? '✓ Selected - Get Quote' : 'Get Quote'}
                              </motion.button>
                            </div>

                            {/* Divider between products */}
                            {productIdx < adminCategory.products.length - 1 && (
                              <div className="border-t border-blue-600/40 pt-8" />
                            )}
                          </div>
                        );
                      })}
                    </motion.div>
                  );
                })
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-4 md:px-8 py-20 border-t border-blue-600/40">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Automate?</h2>
          <p className="text-lg text-blue-200 mb-8">
            Contact us today for product specifications, pricing, and professional installation services.
          </p>
          <motion.button
            onClick={() => openQuoteModal('')}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get a Quote
          </motion.button>
        </div>
      </section>

      {/* Floating Quote Bar */}
      <AnimatePresence>
        {totalSelected > 0 && (
          <FloatingQuoteBar
            selections={selections}
            categories={categories}
            onRequestQuote={(categoryId) => openQuoteModal(categoryId, selections[categoryId])}
            onClearAll={() => setSelections({ 'sliding-gate': [], 'swing-gate': [], 'garage-door': [] })}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
