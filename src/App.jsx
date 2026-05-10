import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SplashScreen from './components/SplashScreen';

import Home from './pages/Home/Home';
import Menu from './pages/Menu/Menu';
import BookEvent from './pages/BookEvent/BookEvent';
import ReserveCart from './pages/ReserveCart/ReserveCart';
import OrderConfirmation from './pages/OrderConfirmation/OrderConfirmation';
import Contact from './pages/Contact/Contact';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <CartProvider>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/book-event" element={<BookEvent />} />
            <Route path="/reserve-cart" element={<ReserveCart />} />
            <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}
