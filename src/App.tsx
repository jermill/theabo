import { useState, useEffect } from 'react';
import { ShoppingCart, ChevronLeft, ChevronRight, Plus, Minus, X, Menu, Star, Check, ChevronDown, Instagram, Twitter, Facebook, Mail, Music, ExternalLink } from 'lucide-react';

function App() {
  const [currentView, setCurrentView] = useState<'front' | 'back'>('front');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const product = {
    name: 'Dear "Black" People',
    price: 49.99,
    description: 'Know who u are. A powerful statement piece that honors the journey of rediscovering our true heritage. From Indigenous roots to modern identity, this shirt sparks conversations about cultural reclamation. Premium quality black t-shirt with minimalist white text design.',
    features: [
      '100% organic cotton',
      'Minimalist white text design',
      'Black premium quality fabric',
      'Unisex fit',
      'Machine washable',
      'Free shipping included',
    ],
    images: {
      front: '/ABO-FRONT Mockup.jpg',
      back: '/ABO-BACK Mockup.jpg',
    },
  };

  const testimonials = [
    {
      name: 'Marcus T.',
      rating: 5,
      text: 'This shirt is more than clothing—it\'s a statement. The quality is exceptional and the message resonates deeply.',
    },
    {
      name: 'Jasmine K.',
      rating: 5,
      text: 'Love the fit and the powerful message. Gets compliments everywhere I go. Highly recommend!',
    },
    {
      name: 'David R.',
      rating: 5,
      text: 'Premium quality fabric and the design is perfect. This is a conversation starter for sure.',
    },
  ];

  const faqs = [
    {
      question: 'What sizes are available?',
      answer: 'We offer sizes XS through XXL. All sizes are unisex and fit true to size. Check our size guide for detailed measurements.',
    },
    {
      question: 'What is the return policy?',
      answer: 'We offer a 30-day return policy. Items must be unworn, unwashed, and in original packaging with tags attached.',
    },
    {
      question: 'How long does shipping take?',
      answer: 'Standard shipping takes 5-7 business days. Free shipping is included on orders over $50. Express shipping options are available at checkout.',
    },
    {
      question: 'What material is the t-shirt made from?',
      answer: 'Our t-shirts are made from 100% organic cotton, ensuring comfort, durability, and environmental responsibility.',
    },
    {
      question: 'Is the design printed or embroidered?',
      answer: 'The text design is screen-printed using high-quality, long-lasting ink that won\'t crack or fade with proper care.',
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleView = () => {
    setCurrentView(currentView === 'front' ? 'back' : 'front');
  };

  const checkoutUrl = 'https://buy.stripe.com/fZuaEXa6S3rVaFD1Begbm05';

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    // Redirect to Stripe checkout
    window.open(checkoutUrl, '_blank');
  };

  const handleCheckout = () => {
    window.open(checkoutUrl, '_blank');
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Sticky Header */}
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-brand-cream transition-all duration-300 ${
        isScrolled ? 'shadow-md' : 'border-b border-brand-medium-gray'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-brand-dark">ABO - The Aboriginals</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={handleCheckout}
                className="relative p-2 text-brand-dark-gray hover:text-brand-dark transition-colors"
                title="Go to checkout"
              >
                <ShoppingCart size={24} />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-brand-dark-gray"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-brand-cream to-brand-cream">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-brand-dark mb-4 animate-fade-in">
            Know Who You Are
          </h2>
          <p className="text-xl md:text-2xl text-brand-medium-gray mb-8 animate-fade-in-delay">
            A powerful statement piece that honors the journey of rediscovering our true heritage
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-brand-medium-gray animate-fade-in-delay-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span>4.9/5 from 200+ customers</span>
          </div>
        </div>
      </section>

      {/* Main Product Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div 
              className="relative aspect-square rounded-lg overflow-hidden group cursor-zoom-in"
              onMouseEnter={() => setIsImageZoomed(true)}
              onMouseLeave={() => setIsImageZoomed(false)}
            >
              <img
                src={currentView === 'front' ? product.images.front : product.images.back}
                alt={`T-shirt ${currentView} view`}
                className={`w-full h-full object-contain transition-transform duration-500 ${
                  isImageZoomed ? 'scale-110' : 'scale-100'
                }`}
                style={{ background: 'transparent' }}
              />

              <button
                onClick={toggleView}
                className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all flex items-center justify-center"
                aria-label={`View ${currentView === 'front' ? 'back' : 'front'}`}
              >
                <span className="bg-white px-4 py-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                  {currentView === 'front' ? (
                    <>
                      <span>View Back</span>
                      <ChevronRight size={20} />
                    </>
                  ) : (
                    <>
                      <ChevronLeft size={20} />
                      <span>View Front</span>
                    </>
                  )}
                </span>
              </button>
            </div>

            <div className="flex gap-2 justify-center">
              <button
                onClick={() => setCurrentView('front')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  currentView === 'front'
                    ? 'bg-brand-dark text-brand-cream shadow-md'
                    : 'bg-brand-cream text-brand-dark-gray hover:bg-brand-medium-gray hover:text-brand-cream'
                }`}
              >
                Front
              </button>
              <button
                onClick={() => setCurrentView('back')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  currentView === 'back'
                    ? 'bg-brand-dark text-brand-cream shadow-md'
                    : 'bg-brand-cream text-brand-dark-gray hover:bg-brand-medium-gray hover:text-brand-cream'
                }`}
              >
                Back
              </button>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-2">
                {product.name}
              </h2>
              <p className="text-4xl font-bold text-brand-dark">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <p className="text-lg text-brand-medium-gray leading-relaxed">
              {product.description}
            </p>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-brand-dark uppercase tracking-wide">
                Features
              </h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-brand-medium-gray">
                    <Check size={18} className="text-brand-dark mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-brand-dark uppercase tracking-wide">
                Size <span className="text-red-600">*</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border-2 rounded-md text-sm font-medium transition-all ${
                      selectedSize === size
                        ? 'border-brand-dark bg-brand-dark text-brand-cream'
                        : 'border-brand-medium-gray text-brand-dark-gray hover:border-brand-dark'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-brand-dark uppercase tracking-wide">
                Quantity
              </h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-brand-medium-gray rounded-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-brand-cream transition-colors"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="px-4 py-2 min-w-[60px] text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-brand-cream transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </div>

            <button 
              onClick={handleAddToCart}
              className="w-full bg-brand-dark text-brand-cream py-4 px-8 rounded-md text-lg font-semibold hover:bg-brand-dark-gray transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <ShoppingCart size={24} />
              Add to Cart
            </button>

            <div className="pt-6 border-t border-brand-medium-gray space-y-2 text-sm text-brand-medium-gray">
              <p className="flex items-center gap-2">
                <Check size={16} className="text-green-600" />
                Free shipping on orders over $50
              </p>
              <p className="flex items-center gap-2">
                <Check size={16} className="text-green-600" />
                30-day return policy
              </p>
              <p className="flex items-center gap-2">
                <Check size={16} className="text-green-600" />
                Secure checkout
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Testimonials Section */}
      <section className="bg-brand-cream py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark text-center mb-12">
            What Our Customers Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-brand-cream border border-brand-medium-gray p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-brand-medium-gray mb-4 italic">"{testimonial.text}"</p>
                <p className="text-sm font-semibold text-brand-dark">— {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-brand-medium-gray rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-brand-cream transition-colors"
                >
                  <span className="font-semibold text-brand-dark">{faq.question}</span>
                  <ChevronDown
                    size={20}
                    className={`text-brand-medium-gray transition-transform ${
                      openFaq === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 py-4 bg-brand-cream text-brand-medium-gray animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-dark text-brand-cream py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">ABORIGINALS</h3>
              <p className="text-gray-400">
                Know who you are. Rediscover your heritage.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-brand-medium-gray">
                <li><a href="#" className="hover:text-brand-cream transition-colors">All Products</a></li>
                <li><a href="#" className="hover:text-brand-cream transition-colors">New Arrivals</a></li>
                <li><a href="#" className="hover:text-brand-cream transition-colors">Best Sellers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-brand-medium-gray">
                <li><a href="#" className="hover:text-brand-cream transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-brand-cream transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-brand-cream transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-brand-cream transition-colors">Size Guide</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex gap-4">
                <a href="#" className="text-brand-medium-gray hover:text-brand-cream transition-colors">
                  <Instagram size={24} />
                </a>
                <a href="#" className="text-brand-medium-gray hover:text-brand-cream transition-colors">
                  <Twitter size={24} />
                </a>
                <a href="#" className="text-brand-medium-gray hover:text-brand-cream transition-colors">
                  <Facebook size={24} />
                </a>
                <a href="#" className="text-brand-medium-gray hover:text-brand-cream transition-colors">
                  <Mail size={24} />
                </a>
              </div>
            </div>
          </div>
          
          {/* Support the Artist Section */}
          <div className="border-t border-brand-dark-gray pt-8 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Music size={20} className="text-brand-medium-gray" />
              <h4 className="font-semibold text-lg">Support the Artist</h4>
            </div>
            <p className="text-brand-medium-gray text-sm mb-4">
              sondaeblu - Nanticoke Lenni-Lenape American, raised Wilmington, DE. Currently operating bicoastal. DJ & Producer. Genres include Aboriginal Soul, House, & Amapiano.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://open.spotify.com/artist/6Dj1n06xA9YJpeQKGBXo7l?si=HcMygfNjQU6_8zQFwerjYQ&dl_branch=1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-brand-medium-gray hover:text-brand-cream transition-colors text-sm"
              >
                <Music size={16} />
                <span>Spotify</span>
                <ExternalLink size={14} />
              </a>
              <a 
                href="https://instagram.com/sondaeblu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-brand-medium-gray hover:text-brand-cream transition-colors text-sm"
              >
                <Instagram size={16} />
                <span>Instagram</span>
                <ExternalLink size={14} />
              </a>
              <a 
                href="https://sondaeblu.bandcamp.com/follow_me" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-brand-medium-gray hover:text-brand-cream transition-colors text-sm"
              >
                <Music size={16} />
                <span>Bandcamp</span>
                <ExternalLink size={14} />
              </a>
              <a 
                href="https://soundcloud.com/sondaeblu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-brand-medium-gray hover:text-brand-cream transition-colors text-sm"
              >
                <Music size={16} />
                <span>Soundcloud</span>
                <ExternalLink size={14} />
              </a>
              <a 
                href="https://twitter.com/sondaeblu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-brand-medium-gray hover:text-brand-cream transition-colors text-sm"
              >
                <Twitter size={16} />
                <span>Twitter</span>
                <ExternalLink size={14} />
              </a>
              <a 
                href="https://www.youtube.com/@sondaeblu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-brand-medium-gray hover:text-brand-cream transition-colors text-sm"
              >
                <Music size={16} />
                <span>YouTube</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          <div className="border-t border-brand-dark-gray pt-8 text-center text-brand-medium-gray text-sm">
            <p>&copy; {new Date().getFullYear()} ABORIGINALS. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black bg-opacity-50 animate-fade-in"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-brand-cream shadow-xl transform transition-transform duration-300 ease-out animate-slide-in">
            <div className="flex items-center justify-between p-6 border-b border-brand-medium-gray">
              <h3 className="text-xl font-bold text-brand-dark">Shopping Cart</h3>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-brand-medium-gray hover:text-brand-dark transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 80px)' }}>
              <div className="space-y-4">
                <div className="flex items-center gap-4 pb-4 border-b border-brand-medium-gray">
                  <img
                    src={product.images.front}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-brand-dark">{product.name}</h4>
                    {selectedSize && <p className="text-sm text-brand-medium-gray">Size: {selectedSize}</p>}
                    <p className="text-sm text-brand-medium-gray">Qty: {quantity}</p>
                  </div>
                  <p className="font-semibold text-brand-dark">${(product.price * quantity).toFixed(2)}</p>
                </div>
                <div className="pt-4">
                  <div className="flex justify-between mb-4">
                    <span className="font-semibold text-brand-dark">Total</span>
                    <span className="font-bold text-xl text-brand-dark">${(product.price * quantity).toFixed(2)}</span>
                  </div>
                    <button 
                      onClick={handleCheckout}
                      className="w-full bg-brand-dark text-brand-cream py-3 rounded-md font-semibold hover:bg-brand-dark-gray transition-colors mb-2"
                    >
                      Proceed to Checkout
                    </button>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="w-full bg-brand-cream border border-brand-medium-gray text-brand-dark py-3 rounded-md font-semibold hover:bg-brand-medium-gray hover:text-brand-cream transition-colors"
                    >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
