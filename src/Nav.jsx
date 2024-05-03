import { useState } from 'react';
import Gallery from './Gallery.jsx'
import Bot from './Bot.jsx'
import Submit from './Submit.jsx'
import Cart from './Cart.jsx';
import './Nav.css';


const Header = ({ username, onLogout, onCartClick }) => {
  return (
    <header className="header">
      <div
        className="header-item"
      >
        Welcome,   {username}
      </div>
      <div
        className="header-item"
        onClick={onLogout}
      >
        <span className="gg-log-out"></span>
      </div>
      <div
        className="header-item"
        onClick={onCartClick}
      >
        <span className="gg-shopping-bag"></span>
      </div>
    </header>
  );
};

const Footer = ({ }) => {
  return (
    <footer className="footer">
      Pravicy
    </footer>
  );
};


const Nav = ({ username, onLogout }) => {
  const [currentView, setCurrentView] = useState('gallery');

  const [cartItems, setCartItems] = useState([]);

  const [galleryData, setGalleryData] = useState([
    { id: 1, image: 'pic1.png', name: 'Island series_1', price: 12122 },
    { id: 2, image: 'pic2.png', name: 'Island series_2', price: 12122 },
    { id: 3, image: 'pic3.png', name: 'Island series_3', price: 12122 },
    { id: 4, image: 'pic4.png', name: 'Island series_4', price: 12122 },
    { id: 5, image: 'pic5.png', name: 'Island series_5', price: 12122 },
    { id: 6, image: 'pic6.png', name: 'Island series_6', price: 12122 },
    { id: 7, image: 'pic7.png', name: 'Island series_7', price: 12122 },
    { id: 8, image: 'pic8.png', name: 'Island series_8', price: 12122 },
    { id: 9, image: 'pic9.png', name: 'Island series_9', price: 12122 },
  ]);
  
  const [lastId, setLastId] = useState(0);

  const handleView = (view) => {
    setCurrentView(view);
  };

  const handleCart = (id) => {
    const selectedItem = galleryData.find(item => item.id === id);
    setCartItems(prevItems => [...prevItems, selectedItem]);
  };

  const handleCartView = () => {
    setCurrentView('cart');
  };

  const addImage = (imageFile, imageName) => {
    const newId = lastId + 1;
    const newImage = {
      id: newId,
      image: URL.createObjectURL(imageFile),
      name: imageName,
      price: 12122,
    };

    setGalleryData([newImage, ...galleryData]);
    setLastId(newId);
  };


  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="nav-container">
      <Header username={username} onLogout={onLogout} onCartClick={handleCartView} />

      <div className="navbar">
        <div
          className={`navbar-item ${currentView === 'gallery' ? 'active' : ''}`}
          onClick={() => handleView('gallery')}
        >
          Gallery
        </div>
        <div
          className={`navbar-item ${currentView === 'bot' ? 'active' : ''}`}
          onClick={() => handleView('bot')}
        >
          Bot
        </div>
        <div
          className={`navbar-item ${currentView === 'submit' ? 'active' : ''}`}
          onClick={() => handleView('submit')}
        >
          Submit
        </div>
      </div>

      {currentView === 'gallery' && <Gallery galleryData={galleryData} handleCart={handleCart} />}
      {currentView === 'bot' && <Bot username={username} />}
      {currentView === 'submit' && <Submit addImage={addImage} />}
      {currentView === 'cart' && <Cart cartItems={cartItems} onClearCart={handleClearCart} />}

      <Footer />
    </div>
  );
};

export default Nav;