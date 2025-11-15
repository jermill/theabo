import { useState, useEffect } from 'react';
import { ShoppingCart, ChevronLeft, ChevronRight, Plus, Minus, X, Menu, Star, Check, ChevronDown, Instagram, Twitter, Facebook, Mail } from 'lucide-react';

function App() {
  const [currentView, setCurrentView] = useState<'front' | 'back'>('front');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState(0);
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

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    setCartItems(cartItems + quantity);
    setIsCartOpen(true);
    setTimeout(() => setIsCartOpen(false), 3000);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
        isScrolled ? 'shadow-md' : 'border-b border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-gray-900">ABORIGINALS</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                <ShoppingCart size={24} />
                {cartItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-700"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 animate-fade-in">
            Know Who You Are
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 animate-fade-in-delay">
            A powerful statement piece that honors the journey of rediscovering our true heritage
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 animate-fade-in-delay-2">
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
              className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group cursor-zoom-in"
              onMouseEnter={() => setIsImageZoomed(true)}
              onMouseLeave={() => setIsImageZoomed(false)}
            >
              <img
                src={currentView === 'front' ? product.images.front : product.images.back}
                alt={`T-shirt ${currentView} view`}
                className={`w-full h-full object-cover transition-transform duration-500 ${
                  isImageZoomed ? 'scale-110' : 'scale-100'
                }`}
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
                    ? 'bg-gray-900 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Front
              </button>
              <button
                onClick={() => setCurrentView('back')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  currentView === 'back'
                    ? 'bg-gray-900 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Back
              </button>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                {product.name}
              </h2>
              <p className="text-4xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed">
              {product.description}
            </p>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                Features
              </h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <Check size={18} className="text-gray-900 mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                Size <span className="text-red-600">*</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border-2 rounded-md text-sm font-medium transition-all ${
                      selectedSize === size
                        ? 'border-gray-900 bg-gray-900 text-white'
                        : 'border-gray-300 text-gray-700 hover:border-gray-900'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                Quantity
              </h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-gray-300 rounded-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="px-4 py-2 min-w-[60px] text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </div>

            <button 
              onClick={handleAddToCart}
              className="w-full bg-gray-900 text-white py-4 px-8 rounded-md text-lg font-semibold hover:bg-gray-800 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <ShoppingCart size={24} />
              Add to Cart
            </button>

            <div className="pt-6 border-t border-gray-200 space-y-2 text-sm text-gray-600">
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
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            What Our Customers Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                <p className="text-sm font-semibold text-gray-900">— {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <ChevronDown
                    size={20}
                    className={`text-gray-600 transition-transform ${
                      openFaq === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 py-4 bg-gray-50 text-gray-600 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
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
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">All Products</a></li>
                <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Best Sellers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Size Guide</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Mail size={24} />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
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
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-out animate-slide-in">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-bold">Shopping Cart</h3>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-gray-500 hover:text-gray-900 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 80px)' }}>
              {cartItems === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500 mb-2">Your cart is empty</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="text-gray-900 font-semibold hover:underline"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 pb-4 border-b">
                    <img
                      src={product.images.front}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{product.name}</h4>
                      <p className="text-sm text-gray-600">Size: {selectedSize}</p>
                      <p className="text-sm text-gray-600">Qty: {quantity}</p>
                    </div>
                    <p className="font-semibold">${(product.price * quantity).toFixed(2)}</p>
                  </div>
                  <div className="pt-4">
                    <div className="flex justify-between mb-4">
                      <span className="font-semibold">Total</span>
                      <span className="font-bold text-xl">${(product.price * quantity).toFixed(2)}</span>
                    </div>
                    <button className="w-full bg-gray-900 text-white py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors mb-2">
                      Checkout
                    </button>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="w-full bg-gray-100 text-gray-900 py-3 rounded-md font-semibold hover:bg-gray-200 transition-colors"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
