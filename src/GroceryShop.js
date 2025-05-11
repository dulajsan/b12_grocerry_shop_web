import { useState } from 'react';
import { ShoppingCart, Menu, X, Phone, Mail, MapPin } from 'lucide-react';

// Sample grocery data
const groceryItems = [
  { id: 1, name: 'Fresh Apples', category: 'Fruits', price: 2.99, image: '/api/placeholder/200/200', featured: true },
  { id: 2, name: 'Organic Bananas', category: 'Fruits', price: 1.99, image: '/api/placeholder/200/200', featured: true },
  { id: 3, name: 'Fresh Tomatoes', category: 'Vegetables', price: 3.49, image: '/api/placeholder/200/200', featured: false },
  { id: 4, name: 'Whole Milk', category: 'Dairy', price: 4.29, image: '/api/placeholder/200/200', featured: true },
  { id: 5, name: 'Sourdough Bread', category: 'Bakery', price: 4.99, image: '/api/placeholder/200/200', featured: false },
  { id: 6, name: 'Fresh Eggs', category: 'Dairy', price: 3.99, image: '/api/placeholder/200/200', featured: false },
  { id: 7, name: 'Avocados', category: 'Fruits', price: 2.49, image: '/api/placeholder/200/200', featured: false },
  { id: 8, name: 'Bell Peppers', category: 'Vegetables', price: 1.99, image: '/api/placeholder/200/200', featured: false }
];

// Navigation links
const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Products', href: '#products' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' }
];

const ProductCard = ({ item }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="text-gray-500 mb-2">{item.category}</p>
        <div className="flex justify-between items-center">
          <span className="text-green-600 font-bold">${item.price.toFixed(2)}</span>
          <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md flex items-center gap-1">
            <ShoppingCart size={16} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const GroceryShop = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [cartCount, setCartCount] = useState(0);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  // Filter products based on selection
  const filteredProducts = activeFilter === 'all' 
    ? groceryItems 
    : groceryItems.filter(item => item.category === activeFilter);
  
  // Get unique categories
  const categories = ['all', ...new Set(groceryItems.map(item => item.category))];
  
  // Get featured products
  const featuredProducts = groceryItems.filter(item => item.featured);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    // Handle form submission logic here
    console.log({ contactName, contactEmail, contactMessage });
    // Reset form
    setContactName('');
    setContactEmail('');
    setContactMessage('');
    // Show confirmation (in a real app you'd use a proper notification)
    alert('Message sent! We will get back to you soon.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">FreshGrocer</h1>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="hover:text-green-200">
                  {link.name}
                </a>
              ))}
            </nav>
            
            {/* Cart Icon */}
            <div className="flex items-center">
              <div className="relative">
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartCount}
                  </span>
                )}
              </div>
              
              {/* Mobile Menu Button */}
              <button 
                className="ml-4 md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4">
              <div className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    className="hover:text-green-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </nav>
          )}
        </div>
      </header>
      
      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-r from-green-500 to-green-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Fresh Groceries Delivered to Your Door</h2>
          <p className="text-xl mb-8">Quality products at affordable prices</p>
          <button className="bg-white text-green-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100">
            Shop Now
          </button>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
      
      {/* All Products */}
      <section id="products" className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Products</h2>
          
          {/* Category Dropdown for Mobile */}
          <div className="md:hidden mb-6">
            <select 
              className="w-full p-2 border rounded-md"
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex flex-col md:flex-row">
            {/* Category Sidebar for Desktop */}
            <div className="hidden md:block w-64 pr-8">
              <h3 className="text-xl font-semibold mb-4">Categories</h3>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category}>
                    <button
                      className={`block w-full text-left px-4 py-2 rounded-md ${
                        activeFilter === category 
                          ? 'bg-green-500 text-white' 
                          : 'hover:bg-gray-100'
                      }`}
                      onClick={() => setActiveFilter(category)}
                    >
                      {category === 'all' ? 'All Categories' : category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Products Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((item) => (
                  <ProductCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="md:flex items-center gap-12">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img 
                src="/api/placeholder/600/400" 
                alt="Our store" 
                className="rounded-lg shadow-md w-full"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">About FreshGrocer</h2>
              <p className="mb-4">
                At FreshGrocer, we believe in providing the highest quality groceries to our customers.
                Founded in 2010, we have been serving the community with fresh, locally-sourced produce
                and a wide variety of essential grocery items.
              </p>
              <p className="mb-4">
                Our mission is to make healthy eating accessible to everyone by offering affordable
                prices without compromising on quality.
              </p>
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2">Store Hours</h3>
                <ul className="space-y-1">
                  <li>Monday - Friday: 8:00 AM - 9:00 PM</li>
                  <li>Saturday: 8:00 AM - 7:00 PM</li>
                  <li>Sunday: 10:00 AM - 6:00 PM</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Contact Us</h2>
          <div className="md:flex gap-8">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-1">Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 border rounded-md"
                      placeholder="Your name"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Email</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-2 border rounded-md"
                      placeholder="Your email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Message</label>
                    <textarea 
                      className="w-full px-4 py-2 border rounded-md h-32"
                      placeholder="Your message"
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                    ></textarea>
                  </div>
                  <button 
                    type="button" 
                    onClick={handleSubmit}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white p-6 rounded-lg shadow-md h-full">
                <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-green-500 mt-1" />
                    <div>
                      <h4 className="font-medium">Address</h4>
                      <p>123 Grocery Lane, Fresh City, FC 12345</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="text-green-500 mt-1" />
                    <div>
                      <h4 className="font-medium">Phone</h4>
                      <p>(555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="text-green-500 mt-1" />
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <p>info@freshgrocer.com</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <img 
                    src="/api/placeholder/500/300" 
                    alt="Map location" 
                    className="w-full rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-green-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="md:flex justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-4">FreshGrocer</h2>
              <p className="max-w-md">Your neighborhood grocery store offering fresh, quality products for your everyday needs.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
                <ul className="space-y-2">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <a href={link.href} className="hover:text-green-300">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Categories</h3>
                <ul className="space-y-2">
                  {categories.slice(1).map((category) => (
                    <li key={category}>
                      <a href="#products" className="hover:text-green-300">
                        {category}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-2 md:col-span-1">
                <h3 className="text-lg font-semibold mb-3">Newsletter</h3>
                <p className="mb-3">Subscribe to get updates on new products and special offers.</p>
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    className="px-3 py-2 rounded-l-md text-black flex-1"
                  />
                  <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-r-md">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-green-700 mt-8 pt-6 text-center">
            <p>&copy; {new Date().getFullYear()} FreshGrocer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GroceryShop;