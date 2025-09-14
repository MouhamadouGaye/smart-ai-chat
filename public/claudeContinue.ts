// import React, { useState, useReducer, useEffect } from 'react';
// import { ShoppingCart, Plus, Minus, X, CreditCard, Truck, Shield, Star, Tag, Check } from 'lucide-react';

// // Types
// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   image: string;
//   description: string;
//   stock: number;
//   rating: number;
//   category: string;
// }

// interface CartItem extends Product {
//   quantity: number;
// }

// interface CartState {
//   items: CartItem[];
//   discount: number;
//   appliedDiscountCode: string | null;
// }

// interface CheckoutData {
//   email: string;
//   firstName: string;
//   lastName: string;
//   address: string;
//   city: string;
//   zipCode: string;
//   cardNumber: string;
//   expiryDate: string;
//   cvv: string;
// }

// type CartAction =
//   | { type: 'ADD_ITEM'; payload: Product }
//   | { type: 'REMOVE_ITEM'; payload: number }
//   | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
//   | { type: 'APPLY_DISCOUNT'; payload: { code: string; amount: number } }
//   | { type: 'CLEAR_CART' };

// // Cart Reducer
// const cartReducer = (state: CartState, action: CartAction): CartState => {
//   switch (action.type) {
//     case 'ADD_ITEM': {
//       const existingItem = state.items.find(item => item.id === action.payload.id);
//       if (existingItem) {
//         return {
//           ...state,
//           items: state.items.map(item =>
//             item.id === action.payload.id
//               ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) }
//               : item
//           )
//         };
//       }
//       return {
//         ...state,
//         items: [...state.items, { ...action.payload, quantity: 1 }]
//       };
//     }
//     case 'REMOVE_ITEM':
//       return {
//         ...state,
//         items: state.items.filter(item => item.id !== action.payload)
//       };
//     case 'UPDATE_QUANTITY':
//       return {
//         ...state,
//         items: state.items.map(item =>
//           item.id === action.payload.id
//             ? { ...item, quantity: Math.max(0, Math.min(action.payload.quantity, item.stock)) }
//             : item
//         ).filter(item => item.quantity > 0)
//       };
//     case 'APPLY_DISCOUNT':
//       return {
//         ...state,
//         discount: action.payload.amount,
//         appliedDiscountCode: action.payload.code
//       };
//     case 'CLEAR_CART':
//       return { items: [], discount: 0, appliedDiscountCode: null };
//     default:
//       return state;
//   }
// };

// // Product Data
// const products: Product[] = [
//   {
//     id: 1,
//     name: "Premium Wireless Headphones",
//     price: 299.99,
//     image: "🎧",
//     description: "High-quality wireless headphones with noise cancellation",
//     stock: 15,
//     rating: 4.8,
//     category: "Audio"
//   },
//   {
//     id: 2,
//     name: "Smart Watch Pro",
//     price: 399.99,
//     image: "⌚",
//     description: "Advanced fitness tracking and smart features",
//     stock: 8,
//     rating: 4.6,
//     category: "Wearables"
//   },
//   {
//     id: 3,
//     name: "Wireless Gaming Mouse",
//     price: 89.99,
//     image: "🖱️",
//     description: "Ergonomic wireless mouse with precision tracking",
//     stock: 25,
//     rating: 4.5,
//     category: "Gaming"
//   },
//   {
//     id: 4,
//     name: "Mechanical Keyboard RGB",
//     price: 179.99,
//     image: "⌨️",
//     description: "RGB mechanical keyboard with tactile switches",
//     stock: 3,
//     rating: 4.9,
//     category: "Gaming"
//   },
//   {
//     id: 5,
//     name: "USB-C Hub Pro",
//     price: 59.99,
//     image: "🔌",
//     description: "Multi-port USB-C hub with HDMI and charging",
//     stock: 0,
//     rating: 4.3,
//     category: "Accessories"
//   },
//   {
//     id: 6,
//     name: "Portable SSD 1TB",
//     price: 149.99,
//     image: "💾",
//     description: "High-speed 1TB portable solid state drive",
//     stock: 12,
//     rating: 4.7,
//     category: "Storage"
//   }
// ];

// const discountCodes = {
//   'SAVE10': 0.10,
//   'WELCOME20': 0.20,
//   'STUDENT15': 0.15,
//   'TECH25': 0.25
// };

// // Product Card Component
// const ProductCard: React.FC<{ product: Product; onAddToCart: (product: Product) => void; cartItem?: CartItem }> = ({
//   product,
//   onAddToCart,
//   cartItem
// }) => {
//   const getStockStatus = () => {
//     if (product.stock === 0) return { text: 'Out of Stock', className: 'text-red-500' };
//     if (product.stock <= 5) return { text: `Only ${product.stock} left!`, className: 'text-yellow-500' };
//     return { text: `${product.stock} in stock`, className: 'text-green-500' };
//   };

//   const stockStatus = getStockStatus();
//   const isOutOfStock = product.stock === 0;
//   const isMaxQuantity = cartItem && cartItem.quantity >= product.stock;

//   return (
//     <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
//       <div className="text-6xl text-center mb-4">{product.image}</div>
//       <h3 className="text-xl font-bold mb-2 text-gray-800">{product.name}</h3>
//       <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

//       <div className="flex justify-between items-center mb-3">
//         <span className="text-2xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
//         <div className="flex items-center gap-1">
//           <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//           <span className="text-sm font-medium">{product.rating}</span>
//         </div>
//       </div>

//       <div className={`text-sm font-medium mb-4 ${stockStatus.className}`}>
//         {stockStatus.text}
//       </div>

//       <div className="flex items-center justify-between">
//         <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
//           {product.category}
//         </span>
//         <button
//           onClick={() => onAddToCart(product)}
//           disabled={isOutOfStock || isMaxQuantity}
//           className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
//             isOutOfStock || isMaxQuantity
//               ? 'bg-gray-300 cursor-not-allowed text-gray-500'
//               : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white hover:shadow-lg'
//           }`}
//         >
//           {isOutOfStock ? 'Out of Stock' :
//            cartItem ? `In Cart (${cartItem.quantity})` : 'Add to Cart'}
//         </button>
//       </div>
//     </div>
//   );
// };

// // Cart Item Component
// const CartItemComponent: React.FC<{
//   item: CartItem;
//   onUpdateQuantity: (id: number, quantity: number) => void;
//   onRemove: (id: number) => void;
// }> = ({ item, onUpdateQuantity, onRemove }) => {
//   return (
//     <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
//       <div className="text-3xl">{item.image}</div>
//       <div className="flex-1">
//         <h4 className="font-semibold text-gray-800">{item.name}</h4>
//         <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
//         <p className="text-sm font-medium text-blue-600">
//           Total: ${(item.price * item.quantity).toFixed(2)}
//         </p>
//       </div>
//       <div className="flex items-center gap-3">
//         <button
//           onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
//           className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
//         >
//           <Minus className="w-4 h-4" />
//         </button>
//         <span className="w-8 text-center font-medium">{item.quantity}</span>
//         <button
//           onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
//           disabled={item.quantity >= item.stock}
//           className="w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white flex items-center justify-center transition-colors"
//         >
//           <Plus className="w-4 h-4" />
//         </button>
//       </div>
//       <button
//         onClick={() => onRemove(item.id)}
//         className="w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors"
//       >
//         <X className="w-4 h-4" />
//       </button>
//     </div>
//   );
// };

// // Checkout Form Component
// const CheckoutForm: React.FC<{
//   onSubmit: (data: CheckoutData) => void;
//   onBack: () => void;
//   total: number;
// }> = ({ onSubmit, onBack, total }) => {
//   const [formData, setFormData] = useState<CheckoutData>({
//     email: '',
//     firstName: '',
//     lastName: '',
//     address: '',
//     city: '',
//     zipCode: '',
//     cardNumber: '',
//     expiryDate: '',
//     cvv: ''
//   });

//   const [errors, setErrors] = useState<Partial<CheckoutData>>({});

//   const validateForm = (): boolean => {
//     const newErrors: Partial<CheckoutData> = {};

//     if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Valid email is required';
//     }
//     if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
//     if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
//     if (!formData.address.trim()) newErrors.address = 'Address is required';
//     if (!formData.city.trim()) newErrors.city = 'City is required';
//     if (!formData.zipCode.trim()) newErrors.zipCode = 'Zip code is required';
//     if (!formData.cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
//       newErrors.cardNumber = 'Valid 16-digit card number is required';
//     }
//     if (!formData.expiryDate.match(/^\d{2}\/\d{2}$/)) {
//       newErrors.expiryDate = 'Valid expiry date (MM/YY) is required';
//     }
//     if (!formData.cvv.match(/^\d{3,4}$/)) {
//       newErrors.cvv = 'Valid CVV is required';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (validateForm()) {
//       onSubmit(formData);
//     }
//   };

//   const handleInputChange = (field: keyof CheckoutData, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//     if (errors[field]) {
//       setErrors(prev => ({ ...prev, [field]: undefined }));
//     }
//   };

//   const formatCardNumber = (value: string) => {
//     return value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
//   };

//   const formatExpiryDate = (value: string) => {
//     const cleaned = value.replace(/\D/g, '');
//     if (cleaned.length >= 2) {
//       return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
//     }
//     return cleaned;
//   };

//   return (
//     <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
//       <div className="flex items-center justify-between mb-8">
//         <h2 className="text-3xl font-bold text-gray-800">Checkout</h2>
//         <div className="text-2xl font-bold text-blue-600">${total.toFixed(2)}</div>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Contact Information */}
//         <div className="bg-gray-50 p-6 rounded-xl">
//           <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
//             <CreditCard className="w-5 h-5" />
//             Contact Information
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
//               <input
//                 type="email"
//                 value={formData.email}
//                 onChange={(e) => handleInputChange('email', e.target.value)}
//                 className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                   errors.email ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 placeholder="john@example.com"
//               />
//               {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
//               <input
//                 type="text"
//                 value={formData.firstName}
//                 onChange={(e) => handleInputChange('firstName', e.target.value)}
//                 className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                   errors.firstName ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 placeholder="John"
//               />
//               {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
//               <input
//                 type="text"
//                 value={formData.lastName}
//                 onChange={(e) => handleInputChange('lastName', e.target.value)}
//                 className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                   errors.lastName ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 placeholder="Doe"
//               />
//               {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
//             </div>
//           </div>
//         </div>

//         {/* Shipping Address */}
//         <div className="bg-gray-50 p-6 rounded-xl">
//           <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
//             <Truck className="w-5 h-5" />
//             Shipping Address
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
//               <input
//                 type="text"
//                 value={formData.address}
//                 onChange={(e) => handleInputChange('address', e.target.value)}
//                 className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                   errors.address ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 placeholder="123 Main Street"
//               />
//               {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
//               <input
//                 type="text"
//                 value={formData.city}
//                 onChange={(e) => handleInputChange('city', e.target.value)}
//                 className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                   errors.city ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 placeholder="New York"
//               />
//               {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Zip Code</label>
//               <input
//                 type="text"
//                 value={formData.zipCode}
//                 onChange={(e) => handleInputChange('zipCode', e.target.value)}
//                 className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                   errors.zipCode ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 placeholder="10001"
//               />
//               {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
//             </div>
//           </div>
//         </div>

//         {/* Payment Information */}
//         <div className="bg-gray-50 p-6 rounded-xl">
//           <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
//             <Shield className="w-5 h-5" />
//             Payment Information
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
//               <input
//                 type="text"
//                 value={formatCardNumber(formData.cardNumber)}
//                 onChange={(e) => handleInputChange('cardNumber', e.target.value.replace(/\s/g, ''))}
//                 className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                   errors.cardNumber ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 placeholder="1234 5678 9012 3456"
//                 maxLength={19}
//               />
//               {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
//               <input
//                 type="text"
//                 value={formatExpiryDate(formData.expiryDate)}
//                 onChange={(e) => handleInputChange('expiryDate', e.target.value.replace(/\D/g, ''))}
//                 className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                   errors.expiryDate ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 placeholder="MM/YY"
//                 maxLength={5}
//               />
//               {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
//               <input
//                 type="text"
//                 value={formData.cvv}
//                 onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
//                 className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                   errors.cvv ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 placeholder="123"
//                 maxLength={4}
//               />
//               {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
//             </div>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex gap-4 pt-6">
//           <button
//             type="button"
//             onClick={onBack}
//             className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
//           >
//             Back to Cart
//           </button>
//           <button
//             type="submit"
//             className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105"
//           >
//             Complete Order
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// // Order Confirmation Component
// const OrderConfirmation: React.FC<{
//   orderData: CheckoutData;
//   cartItems: CartItem[];
//   total: number;
//   onStartOver: () => void;
// }> = ({ orderData, cartItems, total, onStartOver }) => {
//   const orderNumber = Math.random().toString(36).substring(2, 8).toUpperCase();

//   return (
//     <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
//       <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
//         <Check className="w-8 h-8 text-green-600" />
//       </div>

//       <h2 className="text-3xl font-bold text-gray-800 mb-2">Order Confirmed!</h2>
//       <p className="text-gray-600 mb-6">Thank you for your purchase, {orderData.firstName}!</p>

//       <div className="bg-gray-50 rounded-xl p-6 mb-6 text-left">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-lg font-semibold">Order #{orderNumber}</h3>
//           <span className="text-2xl font-bold text-green-600">${total.toFixed(2)}</span>
//         </div>

//         <div className="space-y-2 mb-4">
//           {cartItems.map(item => (
//             <div key={item.id} className="flex justify-between">
//               <span>{item.name} × {item.quantity}</span>
//               <span>${(item.price * item.quantity).toFixed(2)}</span>
//             </div>
//           ))}
//         </div>

//         <div className="border-t pt-4">
//           <p><strong>Shipping to:</strong></p>
//           <p>{orderData.address}</p>
//           <p>{orderData.city}, {orderData.zipCode}</p>
//           <p className="mt-2"><strong>Email:</strong> {orderData.email}</p>
//         </div>
//       </div>

//       <div className="bg-blue-50 rounded-xl p-4 mb-6">
//         <p className="text-blue-800 text-sm">
//           📧 A confirmation email has been sent to {orderData.email}
//         </p>
//         <p className="text-blue-800 text-sm">
//           📦 Estimated delivery: 3-5 business days
//         </p>
//       </div>

//       <button
//         onClick={onStartOver}
//         className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105"
//       >
//         Continue Shopping
//       </button>
//     </div>
//   );
// };

// // Main E-commerce App
// const ECommerceApp: React.FC = () => {
//   const [cartState, dispatch] = useReducer(cartReducer, {
//     items: [],
//     discount: 0,
//     appliedDiscountCode: null
//   });

//   const [currentView, setCurrentView] = useState<'products' | 'checkout' | 'confirmation'>('products');
//   const [discountInput, setDiscountInput] = useState('');
//   const [orderData, setOrderData] = useState<CheckoutData | null>(null);
//   const [showCart, setShowCart] = useState(false);

//   const calculateTotals = () => {
//     const subtotal = cartState.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//     const tax = subtotal * 0.08;
//     const shipping = subtotal > 100 ? 0 : 15.99;

//     // Recalculate discount if code is applied
//     let currentDiscount = 0;
//     if (cartState.appliedDiscountCode && discountCodes[cartState.appliedDiscountCode as keyof typeof discountCodes]) {
//       currentDiscount = subtotal * discountCodes[cartState.appliedDiscountCode as keyof typeof discountCodes];
//     }

//     const total = Math.max(0, subtotal + tax + shipping - currentDiscount);

//     return { subtotal, tax, shipping, total, discount: currentDiscount };
//   };

//   const addToCart = (product: Product) => {
//     dispatch({ type: 'ADD_ITEM', payload: product });
//   };

//   const removeFromCart = (productId: number) => {
//     dispatch({ type: 'REMOVE_ITEM', payload: productId });
//   };

//   const updateQuantity = (productId: number, quantity: number) => {
//     dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
//   };

//   const applyDiscount = () => {
//     const code = discountInput.toUpperCase().trim();
//     if (!code) return;

//     const discountRate = discountCodes[code as keyof typeof discountCodes];
//     if (discountRate) {
//       const { subtotal } = calculateTotals();
//       const discountAmount = subtotal * discountRate;
//       dispatch({ type: 'APPLY_DISCOUNT', payload: { code, amount: discountAmount } });
//       setDiscountInput('');
//       alert(`Discount applied! You saved $${discountAmount.toFixed(2)}`);
//     } else {
//       alert('Invalid discount code. Try: SAVE10, WELCOME20, STUDENT15, TECH25');
//     }
//   };

//   const proceedToCheckout = () => {
//     if (cartState.items.length === 0) {
//       alert('Your cart is empty!');
//       return;
//     }
//     setCurrentView('checkout');
//     setShowCart(false);
//   };

//   const handleCheckoutSubmit = (data: CheckoutData) => {
//     setOrderData(data);
//     setCurrentView('confirmation');
//   };

//   const startOver = () => {
//     dispatch({ type: 'CLEAR_CART' });
//     setOrderData(null);
//     setCurrentView('products');
//     setShowCart(false);
//   };

//   const { subtotal, tax, shipping, total, discount } = calculateTotals();
//   const totalItems = cartState.items.reduce((sum, item) => sum + item.quantity, 0);

//   if (currentView === 'checkout') {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
//         <CheckoutForm
//           onSubmit={handleCheckoutSubmit}
//           onBack={() => setCurrentView('products')}
//           total={total}
//         />
//       </div>
//     );
//   }

//   if (currentView === 'confirmation' && orderData) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 flex items-center">
//         <OrderConfirmation
//           orderData={orderData}
//           cartItems={cartState.items}
//           total={total}
//           onStartOver={startOver}
//         />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <header className="bg-white rounded-2xl shadow-lg p-6 mb-8">
//           <div className="flex justify-between items-center">
//             <div>
//               <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                 TechStore Pro
//               </h1>
//               <p className="text-gray-600 mt-1">Premium Tech Products & Gadgets</p>
//             </div>
//             <div className="
