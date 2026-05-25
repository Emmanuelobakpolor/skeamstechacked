'use client';

import Image from 'next/image';
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Search, Loader, Minus, Plus } from 'lucide-react';
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
      <div className="relative h-80 sm:h-96 overflow-hidden rounded-2xl bg-gray-100">
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
                  className="relative w-full h-full flex-shrink-0 bg-gray-100 flex items-center justify-center p-4 sm:p-8"
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
              <div className="relative w-full h-full bg-gray-100 flex items-center justify-center">
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
                      ? 'bg-blue-600 w-5 h-2'
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
            className="flex-shrink-0 bg-gray-200 hover:bg-gray-300 text-gray-700 w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-200"
            aria-label="Previous product"
          >
            ‹
          </button>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex-1 line-clamp-2 px-2">
            {currentProductData.name}
          </h3>
          <button
            onClick={nextProduct}
            className="flex-shrink-0 bg-gray-200 hover:bg-gray-300 text-gray-700 w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-200"
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
            <h3 className="text-xl sm:text-xl font-semibold text-gray-900 mb-2">{currentProductData.name}</h3>
          )}
          <p className="text-gray-500 text-sm sm:text-base mb-2 sm:mb-3 line-clamp-2">{currentProductData.description}</p>
          <p className="text-xs sm:text-sm text-blue-600 font-semibold">✓ {currentProductData.application}</p>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
          {currentProductData.specs.speed && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl p-2 sm:p-3">
              <p className="text-gray-500 text-xs font-medium uppercase">Speed</p>
              <p className="text-gray-900 font-semibold text-xs sm:text-sm mt-1">{currentProductData.specs.speed}</p>
            </div>
          )}
          {currentProductData.specs.weight && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl p-2 sm:p-3">
              <p className="text-gray-500 text-xs font-medium uppercase">Weight</p>
              <p className="text-gray-900 font-semibold text-xs sm:text-sm mt-1">{currentProductData.specs.weight}</p>
            </div>
          )}
          {currentProductData.specs.voltage && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl p-2 sm:p-3">
              <p className="text-gray-500 text-xs font-medium uppercase">Voltage</p>
              <p className="text-gray-900 font-semibold text-xs sm:text-sm mt-1">{currentProductData.specs.voltage}</p>
            </div>
          )}
          {currentProductData.specs.power && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl p-2 sm:p-3">
              <p className="text-gray-500 text-xs font-medium uppercase">Power</p>
              <p className="text-gray-900 font-semibold text-xs sm:text-sm mt-1">{currentProductData.specs.power}</p>
            </div>
          )}
          {currentProductData.specs.storage && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl p-2 sm:p-3">
              <p className="text-gray-500 text-xs font-medium uppercase">Storage</p>
              <p className="text-gray-900 font-semibold text-xs sm:text-sm mt-1">{currentProductData.specs.storage}</p>
            </div>
          )}
          {currentProductData.specs.connectivity && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl p-2 sm:p-3">
              <p className="text-gray-500 text-xs font-medium uppercase">Connectivity</p>
              <p className="text-gray-900 font-semibold text-xs sm:text-sm mt-1">{currentProductData.specs.connectivity}</p>
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
      <div className="relative h-80 sm:h-96 overflow-hidden rounded-2xl bg-gray-100">
        {/* Image Track */}
        <div
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentImage * 100}%)` }}
        >
          {imageUrls.length > 0 ? (
            imageUrls.map((url, idx) => (
              <div
                key={idx}
                className="relative w-full h-full flex-shrink-0 bg-gray-100 flex items-center justify-center p-4 sm:p-8"
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
            <div className="relative w-full h-full bg-gray-100 flex items-center justify-center">
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
                    ? 'bg-blue-600 w-5 h-2'
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
          <h3 className="text-xl sm:text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
          {product.description && (
            <p className="text-gray-500 text-sm sm:text-base mb-2 sm:mb-3 line-clamp-2">
              {product.description}
            </p>
          )}
          {product.application && (
            <p className="text-xs sm:text-sm text-blue-600 font-semibold">✓ {product.application}</p>
          )}
        </div>

        {/* Specs Grid — dynamic rendering */}
        {Object.keys(product.specs).length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
            {Object.entries(product.specs).map(([key, value]) =>
              value ? (
                <div
                  key={key}
                  className="bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl p-2 sm:p-3"
                >
                  <p className="text-gray-500 text-xs font-medium uppercase">{key}</p>
                  <p className="text-gray-900 font-semibold text-xs sm:text-sm mt-1">{value}</p>
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
  selections: Record<string, Record<string, number>>;
  categories: typeof categories;
  onRequestQuote: (categoryId: string) => void;
  onClearAll: () => void;
}

function FloatingQuoteBar({ selections, categories: cats, onRequestQuote, onClearAll }: FloatingQuoteBarProps) {
  const totalSelected = Object.values(selections).reduce((sum, obj) => sum + Object.keys(obj).length, 0);

  if (totalSelected === 0) return null;

  const activeCategoryEntries = Object.entries(selections).filter(([, obj]) => Object.keys(obj).length > 0);

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-40 p-4 md:p-6"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg p-4 md:p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Left: Summary */}
          <div className="flex-1 min-w-0">
            <p className="text-gray-900 font-medium text-sm">
              {totalSelected} product{totalSelected !== 1 ? 's' : ''} selected
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
              {activeCategoryEntries.map(([catId, productsObj]) => {
                const catLabel = cats.find(c => c.id === catId)?.title ?? catId;
                return (
                  <span key={catId} className="text-xs text-gray-500">
                    {catLabel}: {Object.keys(productsObj).length}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3 flex-shrink-0 flex-wrap justify-end">
            <button
              onClick={onClearAll}
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              Clear all
            </button>

            {/* Always show main "Request Quote" button for all selections */}
            <motion.button
              onClick={() => onRequestQuote('multiple')}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Request Quote
            </motion.button>
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
  const [selections, setSelections] = useState<Record<string, Record<string, number>>>({
    'sliding-gate': {},
    'swing-gate': {},
    'garage-door': {},
  });

  // Tabs and filters
  const [shopTabs, setShopTabs] = useState<ShopTab[]>([]);
  const [activeTabId, setActiveTabId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<AdminProduct[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loadingTabs, setLoadingTabs] = useState(true);
  const [currentImageIndices, setCurrentImageIndices] = useState<Record<number, number>>({});
  const searchTimeoutRef = useRef<NodeJS.Timeout>();


  // Remove trailing /api if present, since we add it ourselves in the fetch URLs
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api';
  const apiUrl = baseUrl.endsWith('/api') ? baseUrl.slice(0, -4) : baseUrl;

  const totalSelected = Object.values(selections).reduce((sum, obj) => sum + Object.keys(obj).length, 0);

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
      const current = prev[categoryId] ?? {};
      const isSelected = productName in current;
      if (isSelected) {
        const { [productName]: _, ...rest } = current;
        return { ...prev, [categoryId]: rest };
      }
      return { ...prev, [categoryId]: { ...current, [productName]: 1 } };
    });
  };

  const updateQuantity = (categoryId: string, productName: string, qty: number) => {
    if (qty < 1) return;
    setSelections(prev => {
      const current = prev[categoryId] ?? {};
      return { ...prev, [categoryId]: { ...current, [productName]: qty } };
    });
  };

  const openQuoteModal = (categoryId: string, products: string[] = [], quantities: Record<string, number> = {}) => {
    // Build product strings with quantities
    const productsWithQty = products.map(p => {
      const qty = quantities[p];
      return qty && qty > 1 ? `${p} (x${qty})` : p;
    });
    setQuoteCategory(categoryId);
    setQuoteProducts(productsWithQty);
    setQuoteOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <GetQuote isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} defaultCategory={quoteCategory} defaultProducts={quoteProducts} />
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 md:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">

          {/* Content */}
          <motion.div
            className="relative z-10 max-w-3xl mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4 leading-tight">
              Automation Products & Solutions
            </h1>
            <p className="text-base text-gray-500 leading-relaxed">
              Browse our complete collection of gate automation, swing gate operators, and garage door solutions. Premium quality products engineered for performance and reliability.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="relative z-10 px-4 md:px-8 pt-8 pb-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          {/* Tab Buttons */}
          <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
            {shopTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => { setActiveTabId(tab.id); setSelectedCategory(null); setSearchQuery(''); setSearchResults(null); }}
                className={`px-6 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  activeTabId === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.display_name}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products, categories, features..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category Filter Pills */}
          {!searchResults && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === null
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Search Results</h2>
                <p className="text-lg text-gray-500">{searchResults.length} product{searchResults.length !== 1 ? 's' : ''} found</p>
              </div>
              {searchResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.map((product) => {
                    const categoryKey = `admin-${product.id}`;
                    const isSelected = product.name in (selections[categoryKey] ?? {});
                    return (
                      <motion.button
                        key={product.id}
                        onClick={() => {
                          if (!selections[categoryKey]) {
                            setSelections(prev => ({ ...prev, [categoryKey]: {} }));
                          }
                          toggleProduct(categoryKey, product.name);
                        }}
                        className={`text-left p-4 rounded-xl border-2 transition-all duration-200 group ${
                          isSelected
                            ? 'bg-blue-50 border-blue-600'
                            : 'bg-white border-gray-200 hover:border-blue-400'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {product.image_url && (
                          <div className="relative w-full h-40 mb-3 bg-gray-100 rounded-lg overflow-hidden">
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
                                ? 'bg-blue-600 border-blue-600'
                                : 'border-gray-300 bg-transparent group-hover:border-blue-400'
                            }`}
                          >
                            {isSelected && <Check size={12} className="text-white" strokeWidth={3} />}
                          </div>
                          <h4 className={`text-base font-semibold transition-colors ${
                            isSelected ? 'text-blue-600' : 'text-gray-900 group-hover:text-blue-600'
                          }`}>
                            {product.name}
                          </h4>
                        </div>
                        <p className="text-xs text-gray-500 mb-2">{product.application}</p>
                        {Object.entries(product.specs).length > 0 && (
                          <div className="grid grid-cols-2 gap-1.5 text-xs">
                            {Object.entries(product.specs).map(([key, value]) => (
                              <div key={key} className="text-gray-500">
                                <span className="text-blue-600 font-semibold capitalize">{key}:</span> {value}
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-400">No products match your search. Try different keywords.</p>
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
              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">{category.title}</h2>
                <p className="text-lg text-gray-500">{category.subtitle}</p>
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
                    <h3 className="text-xl font-semibold text-gray-900">Available Models</h3>
                    {Object.keys(selections[category.id] ?? {}).length > 0 && (
                      <button
                        onClick={() => setSelections(prev => ({ ...prev, [category.id]: {} }))}
                        className="text-xs text-blue-600 hover:text-blue-700 transition-colors underline"
                      >
                        Clear {Object.keys(selections[category.id]).length} selected
                      </button>
                    )}
                  </div>
                  <div className="space-y-3">
                    {category.products.map((product) => {
                      const isSelected = product.name in (selections[category.id] ?? {});
                      const qty = selections[category.id]?.[product.name] ?? 1;
                      return (
                        <motion.div
                          key={product.id}
                          className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 group ${
                            isSelected
                              ? 'bg-blue-50 border-blue-600'
                              : 'bg-white border-gray-200 hover:border-blue-400'
                          }`}
                          whileHover={{ scale: 1.02 }}
                        >
                          <button
                            onClick={() => toggleProduct(category.id, product.name)}
                            className="w-full text-left"
                            aria-pressed={isSelected}
                            aria-label={`${isSelected ? 'Deselect' : 'Select'} ${product.name}`}
                          >
                            <div className="flex items-start gap-3">
                              {/* Checkbox */}
                              <div
                                className={`mt-0.5 w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                                  isSelected
                                    ? 'bg-blue-600 border-blue-600'
                                    : 'border-gray-300 bg-transparent group-hover:border-blue-400'
                                }`}
                              >
                                {isSelected && <Check size={12} className="text-white" strokeWidth={3} />}
                              </div>

                              {/* Content */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                  <h4 className={`text-base font-semibold transition-colors ${
                                    isSelected ? 'text-blue-600' : 'text-gray-900 group-hover:text-blue-600'
                                  }`}>
                                    {product.name}
                                  </h4>
                                  {isSelected && (
                                    <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded-full">
                                      Selected
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-gray-500 mb-2">{product.application}</p>
                                <div className="grid grid-cols-2 gap-1.5 text-xs">
                                  {Object.entries(product.specs).map(([key, value]) =>
                                    value ? (
                                      <div key={key} className="text-gray-500">
                                        <span className="text-blue-600 font-semibold capitalize">{key}:</span> {value}
                                      </div>
                                    ) : null
                                  )}
                                </div>
                              </div>
                            </div>
                          </button>

                          {/* Quantity Picker — shown when selected */}
                          {isSelected && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between"
                            >
                              <span className="text-xs text-blue-600 font-medium">Quantity</span>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={(e) => { e.stopPropagation(); updateQuantity(category.id, product.name, qty - 1); }}
                                  className="w-7 h-7 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 flex items-center justify-center transition-colors"
                                  disabled={qty <= 1}
                                >
                                  <Minus size={14} />
                                </button>
                                <span className="text-gray-900 font-semibold text-sm w-8 text-center">{qty}</span>
                                <button
                                  onClick={(e) => { e.stopPropagation(); updateQuantity(category.id, product.name, qty + 1); }}
                                  className="w-7 h-7 rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-colors"
                                >
                                  <Plus size={14} />
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Get Quote Button at Bottom */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
                <motion.button
                  onClick={() => openQuoteModal(category.id, Object.keys(selections[category.id] ?? {}), selections[category.id] ?? {})}
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Quote for {category.title}
                </motion.button>
                {totalSelected > 0 && (
                  <motion.button
                    onClick={() => {
                      const allProducts = Object.values(selections).flatMap(obj => Object.keys(obj));
                      const allQuantities = Object.values(selections).reduce((acc, obj) => ({ ...acc, ...obj }), {});
                      openQuoteModal('', allProducts, allQuantities);
                    }}
                    className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Quote for All {totalSelected} Selected
                  </motion.button>
                )}
              </div>
            </motion.div>
            );
          })}

          {/* Dynamic Tabs (Non-Hardcoded) — each product standalone with select + quantity */}
          {!searchResults && !isAutomationTab && (
            <>
              {loadingTabs ? (
                <div className="flex items-center justify-center py-16">
                  <Loader className="animate-spin text-blue-600" size={32} />
                </div>
              ) : !currentTab || currentTab.categories.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-gray-400 text-lg">No products yet in {currentTab?.display_name}. Check back soon!</p>
                </div>
              ) : (
                currentTab.categories.map((adminCategory, idx) => {
                  const shouldShow = selectedCategory === null || selectedCategory === adminCategory.id.toString();
                  if (!shouldShow) return null;
                  const categoryKey = `admin-cat-${adminCategory.id}`;

                  return (
                    <motion.div
                      key={adminCategory.id}
                      className="space-y-8"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                    >
                      {/* Category Header */}
                      <div className="border-b border-gray-200 pb-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-2">{adminCategory.name}</h2>
                            {adminCategory.subtitle && <p className="text-lg text-gray-500">{adminCategory.subtitle}</p>}
                          </div>
                          {Object.keys(selections[categoryKey] ?? {}).length > 0 && (
                            <button
                              onClick={() => setSelections(prev => ({ ...prev, [categoryKey]: {} }))}
                              className="text-sm text-blue-600 hover:text-blue-700 transition-colors underline"
                            >
                              Clear {Object.keys(selections[categoryKey]).length} selected
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Each product displayed individually */}
                      {adminCategory.products.map((product, productIdx) => {
                        const isSelected = product.name in (selections[categoryKey] ?? {});
                        const qty = selections[categoryKey]?.[product.name] ?? 1;

                        return (
                          <div key={product.id} className="space-y-4">
                            {/* Product Carousel */}
                            <AdminProductCarousel product={product} />

                            {/* Select + Quantity Bar */}
                            <div className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                              isSelected
                                ? 'bg-blue-50 border-blue-600'
                                : 'bg-white border-gray-200'
                            }`}>
                              <div className="flex items-center justify-between gap-4">
                                <button
                                  onClick={() => toggleProduct(categoryKey, product.name)}
                                  className="flex items-center gap-3 flex-1 min-w-0"
                                  aria-pressed={isSelected}
                                  aria-label={`${isSelected ? 'Deselect' : 'Select'} ${product.name}`}
                                >
                                  <div
                                    className={`w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                                      isSelected
                                        ? 'bg-blue-600 border-blue-600'
                                        : 'border-gray-300 bg-transparent hover:border-blue-400'
                                    }`}
                                  >
                                    {isSelected && <Check size={12} className="text-white" strokeWidth={3} />}
                                  </div>
                                  <span className={`text-base font-semibold transition-colors ${
                                    isSelected ? 'text-blue-600' : 'text-gray-900'
                                  }`}>
                                    {isSelected ? 'Selected' : 'Select this product'}
                                  </span>
                                </button>

                                {/* Quantity — always visible when selected */}
                                {isSelected && (
                                  <div className="flex items-center gap-2 flex-shrink-0">
                                    <span className="text-xs text-blue-600 font-medium mr-1">Qty</span>
                                    <button
                                      onClick={() => updateQuantity(categoryKey, product.name, qty - 1)}
                                      className="w-7 h-7 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 flex items-center justify-center transition-colors"
                                      disabled={qty <= 1}
                                    >
                                      <Minus size={14} />
                                    </button>
                                    <span className="text-gray-900 font-semibold text-sm w-8 text-center">{qty}</span>
                                    <button
                                      onClick={() => updateQuantity(categoryKey, product.name, qty + 1)}
                                      className="w-7 h-7 rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-colors"
                                    >
                                      <Plus size={14} />
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Divider between products */}
                            {productIdx < adminCategory.products.length - 1 && (
                              <div className="border-t border-gray-200 pt-8" />
                            )}
                          </div>
                        );
                      })}

                      {/* Get Quote Button at Bottom */}
                      <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
                        <motion.button
                          onClick={() => openQuoteModal(categoryKey, Object.keys(selections[categoryKey] ?? {}), selections[categoryKey] ?? {})}
                          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors duration-200"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Get Quote for {adminCategory.name}
                        </motion.button>
                        {totalSelected > 0 && (
                          <motion.button
                            onClick={() => {
                              const allProducts = Object.values(selections).flatMap(obj => Object.keys(obj));
                              const allQuantities = Object.values(selections).reduce((acc, obj) => ({ ...acc, ...obj }), {});
                              openQuoteModal('', allProducts, allQuantities);
                            }}
                            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors duration-200"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Get Quote for All {totalSelected} Selected
                          </motion.button>
                        )}
                      </div>
                    </motion.div>
                  );
                })
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-4 md:px-8 py-20 border-t border-gray-200">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Ready to Automate?</h2>
          <p className="text-base text-gray-500 mb-8">
            Contact us today for product specifications, pricing, and professional installation services.
          </p>
          <motion.button
            onClick={() => openQuoteModal('')}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors duration-200"
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
            onRequestQuote={(categoryId) => openQuoteModal(categoryId, Object.keys(selections[categoryId] ?? {}), selections[categoryId] ?? {})}
            onClearAll={() => setSelections({ 'sliding-gate': {}, 'swing-gate': {}, 'garage-door': {} })}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
