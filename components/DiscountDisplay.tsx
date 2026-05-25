'use client';

import { useEffect, useState } from 'react';
import { Tag, Percent, Clock } from 'lucide-react';

interface Discount {
  id: number;
  name: string;
  description: string | null;
  service_type: string;
  original_price: number;
  discount_price: number;
  discount_percentage: number;
  start_date: string;
  end_date: string;
  is_active: boolean;
  code: string | null;
  usage_limit: number | null;
  usage_count: number;
}

interface DiscountDisplayProps {
  serviceType?: string;
  showBadge?: boolean;
  className?: string;
}

export default function DiscountDisplay({
  serviceType,
  showBadge = true,
  className = ''
}: DiscountDisplayProps) {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

  useEffect(() => {
    fetchDiscounts();
  }, [serviceType]);

  const fetchDiscounts = async () => {
    try {
      setLoading(true);
      let url = `${API_URL}/discounts/`;

      if (serviceType) {
        url = `${API_URL}/discounts/service/${encodeURIComponent(serviceType)}`;
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch discounts');

      const data = await response.json();
      setDiscounts(Array.isArray(data) ? data : data.discounts || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return null;
  }

  if (error || discounts.length === 0) {
    return null;
  }

  const bestDiscount = discounts.reduce((best, current) =>
    current.discount_percentage > best.discount_percentage ? current : best
  );

  const isExpired = new Date(bestDiscount.end_date) < new Date();

  if (isExpired) {
    return null;
  }

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      {showBadge && (
        <div className="flex items-center gap-2 px-4 py-2 bg-red-500 rounded-full">
          <Percent className="w-4 h-4 text-white" />
          <span className="text-white font-medium text-sm">
            {bestDiscount.discount_percentage.toFixed(0)}% OFF
          </span>
        </div>
      )}

      {/* Price display */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500 line-through">
          ₦{bestDiscount.original_price.toLocaleString()}
        </span>
        <span className="text-lg font-semibold text-green-600">
          ₦{bestDiscount.discount_price.toLocaleString()}
        </span>
      </div>

      {/* Promo code badge */}
      {bestDiscount.code && (
        <div className="hidden md:flex items-center gap-1 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full">
          <Tag className="w-3 h-3 text-blue-600" />
          <span className="text-xs text-blue-600 font-mono">
            {bestDiscount.code}
          </span>
        </div>
      )}

      {/* Expiry indicator */}
      <div className="hidden md:flex items-center gap-1 text-xs text-gray-500">
        <Clock className="w-3 h-3" />
        <span>
          {new Date(bestDiscount.end_date).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}
