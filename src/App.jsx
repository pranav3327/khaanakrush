import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import SplashScreen from './components/SplashScreen.jsx';
import FloatingCart from './components/FloatingCart.jsx';

import Home from './pages/Home.jsx';
import BookEvent from './pages/BookEvent.jsx';
import Menu from './pages/Menu.jsx';
import CartPage from './pages/CartPage.jsx';
import OrderConfirmation from './pages/OrderConfirmation.jsx';
import ReserveCart from './pages/ReserveCart.jsx';
import Contact from './pages/Contact.jsx';
import About from './pages/About.jsx';
import ReviewsPage from './pages/ReviewsPage.jsx';
import Franchise from './pages/Franchise.jsx';

export default function App() {
  const [splashActive, setSplashActive] = useState(true);
  const [appVisible, setAppVisible] = useState(false);

  return (
    <CartProvider>
      {splashActive && (
        <SplashScreen 
          onStartExit={() => setAppVisible(true)} 
          onComplete={() => setSplashActive(false)} 
        />
      )}
      {(!splashActive || appVisible) && (
        <div className="app">
          <Navbar />
          <main className="appMain">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/book-event" element={<BookEvent />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
              <Route path="/reserve-cart" element={<ReserveCart />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/reviews" element={<ReviewsPage />} />
              <Route path="/franchise" element={<Franchise />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
          <FloatingCart />
        </div>
      )}
    </CartProvider>
  );
}

