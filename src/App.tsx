import { useState } from 'react';
import { ShoppingCart, Plus, Minus, Check, ChevronDown, Music, ExternalLink } from 'lucide-react';

function App() {
  const [currentView, setCurrentView] = useState<'front' | 'back'>('front');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const product = {
    name: 'Dear "Black" People',
    price: 49.99,
    description: 'Know who u are. A powerful statement piece that honors the journey of rediscovering our true heritage.',
    images: {
      front: '/ABO-FRONT Mockup.jpg',
      back: '/ABO-BACK Mockup.jpg',
    },
  };

  const checkoutUrl = 'https://buy.stripe.com/fZuaEXa6S3rVaFD1Begbm05';

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    window.open(checkoutUrl, '_blank');
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
        {/* Glass Header */}
        <div className="glass-card fixed top-4 left-4 right-4 z-50 max-w-md mx-auto">
          <h1 className="text-xl font-semibold text-brand-dark text-center py-3">ABO</h1>
        </div>

        {/* Main Product Image */}
        <div className="w-full max-w-sm mb-8 mt-20">
          <div className="relative aspect-square">
            <img
              src={currentView === 'front' ? product.images.front : product.images.back}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>
          
          {/* View Toggle */}
          <div className="flex gap-2 justify-center mt-4">
            <button
              onClick={() => setCurrentView('front')}
              className={`glass-button px-6 py-2 rounded-full text-sm font-medium transition-all ${
                currentView === 'front' ? 'opacity-100' : 'opacity-70'
              }`}
            >
              Front
            </button>
            <button
              onClick={() => setCurrentView('back')}
              className={`glass-button px-6 py-2 rounded-full text-sm font-medium transition-all ${
                currentView === 'back' ? 'opacity-100' : 'opacity-70'
              }`}
            >
              Back
            </button>
          </div>
        </div>

        {/* Product Info Card */}
        <div className="glass-card w-full max-w-sm mb-6">
          <h2 className="text-2xl font-bold text-brand-dark mb-2">{product.name}</h2>
          <p className="text-3xl font-bold text-brand-dark mb-4">${product.price.toFixed(2)}</p>
          <p className="text-brand-medium-gray text-sm leading-relaxed mb-6">{product.description}</p>
        </div>

        {/* Size Selection */}
        <div className="glass-card w-full max-w-sm mb-6">
          <h3 className="text-sm font-semibold text-brand-dark uppercase tracking-wide mb-4">
            Size <span className="text-red-500">*</span>
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`glass-button py-3 rounded-xl text-sm font-medium transition-all ${
                  selectedSize === size
                    ? 'opacity-100 ring-2 ring-brand-cream ring-offset-2'
                    : 'opacity-80'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="glass-card w-full max-w-sm mb-6">
          <h3 className="text-sm font-semibold text-brand-dark uppercase tracking-wide mb-4">Quantity</h3>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="glass-button w-12 h-12 rounded-full flex items-center justify-center"
            >
              <Minus size={20} className="text-brand-cream" />
            </button>
            <span className="text-2xl font-semibold text-brand-dark min-w-[40px] text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="glass-button w-12 h-12 rounded-full flex items-center justify-center"
            >
              <Plus size={20} className="text-brand-cream" />
            </button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="glass-card w-full max-w-sm mb-6 bg-brand-dark text-brand-cream py-4 rounded-2xl text-lg font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-transform"
        >
          <ShoppingCart size={24} />
          Add to Cart
        </button>

        {/* Features */}
        <div className="glass-card w-full max-w-sm mb-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-brand-medium-gray">
              <Check size={18} className="text-brand-dark flex-shrink-0" />
              <span>100% organic cotton</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-brand-medium-gray">
              <Check size={18} className="text-brand-dark flex-shrink-0" />
              <span>Free shipping over $50</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-brand-medium-gray">
              <Check size={18} className="text-brand-dark flex-shrink-0" />
              <span>30-day returns</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 py-12">
        <div className="max-w-sm mx-auto">
          <h2 className="text-2xl font-bold text-brand-dark mb-6 text-center">FAQ</h2>
          <div className="space-y-3">
            {[
              {
                question: 'What sizes are available?',
                answer: 'We offer sizes XS through XXL. All sizes are unisex and fit true to size.',
              },
              {
                question: 'What is the return policy?',
                answer: 'We offer a 30-day return policy. Items must be unworn, unwashed, and in original packaging.',
              },
              {
                question: 'How long does shipping take?',
                answer: 'Standard shipping takes 5-7 business days. Free shipping is included on orders over $50.',
              },
            ].map((faq, index) => (
              <div key={index} className="glass-card">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-4 py-4 text-left flex items-center justify-between"
                >
                  <span className="font-semibold text-brand-dark text-sm">{faq.question}</span>
                  <ChevronDown
                    size={18}
                    className={`text-brand-medium-gray transition-transform flex-shrink-0 ${
                      openFaq === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-4 pb-4 text-brand-medium-gray text-sm animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Artist Section */}
      <section className="px-4 py-12">
        <div className="max-w-sm mx-auto">
          <div className="glass-card">
            <div className="flex items-center gap-3 mb-4">
              <Music size={20} className="text-brand-dark" />
              <h3 className="font-semibold text-brand-dark">Support the Artist</h3>
            </div>
            <p className="text-brand-medium-gray text-sm mb-4 leading-relaxed">
              sondaeblu - Nanticoke Lenni-Lenape American, raised Wilmington, DE. Currently operating bicoastal. DJ & Producer. Genres include Aboriginal Soul, House, & Amapiano.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { name: 'Spotify', url: 'https://open.spotify.com/artist/6Dj1n06xA9YJpeQKGBXo7l?si=HcMygfNjQU6_8zQFwerjYQ&dl_branch=1' },
                { name: 'Instagram', url: 'https://instagram.com/sondaeblu' },
                { name: 'Bandcamp', url: 'https://sondaeblu.bandcamp.com/follow_me' },
                { name: 'Soundcloud', url: 'https://soundcloud.com/sondaeblu' },
                { name: 'Twitter', url: 'https://twitter.com/sondaeblu' },
                { name: 'YouTube', url: 'https://www.youtube.com/@sondaeblu' },
              ].map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-button px-4 py-2 rounded-full text-xs font-medium flex items-center gap-2"
                >
                  <span>{link.name}</span>
                  <ExternalLink size={12} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 text-center">
        <p className="text-brand-medium-gray text-xs">
          &copy; {new Date().getFullYear()} ABO. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
