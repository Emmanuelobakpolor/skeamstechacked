import Navigation from '@/components/Navigation';
import Shop from '@/components/Shop';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Shop - SKEAM Technologies | Automation Products',
  description: 'Browse our collection of gate automation products, swing gate operators, and garage door solutions. Professional automation equipment for residential and commercial use.',
};

export default function ShopPage() {
  return (
    <>
      <Navigation />
      <main className="overflow-x-hidden pt-20">
        <Shop />
        <Footer />
      </main>
    </>
  );
}
