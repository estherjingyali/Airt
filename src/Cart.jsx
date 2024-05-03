import { useState } from 'react';
import './Cart.css';

const Cart = ({ cartItems, onClearCart }) => {

    const [checkoutStatus, setCheckoutStatus] = useState(null);

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price, 0);
    };

    const handleCheckout = () => {
        
        setCheckoutStatus('Checkout failed. This user does not have enough kittyxoin.');
        setTimeout(() => {
          setCheckoutStatus('');
        }, 2000);
      };

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    {cartItems.map((item) => (
                        <div key={item.id} className="cart-item">
                            <img src={item.image} alt={item.name} />
                            <p>  {item.name} </p>
                            <p>^..^{item.price.toFixed(2)}</p>
                            
                        </div>
                    ))}
                    <div className="cart-summary">
                        <p>Total: ^..^{getTotalPrice().toFixed(2)}</p>
                        {checkoutStatus && <p>{checkoutStatus}</p>}
                        <button onClick={handleCheckout} className="cart-button">checkout</button>
                        <button onClick={onClearCart} className="cart-button">clear cart</button>
                    </div>
                </div>
            )}
            
        </div>
    );
};

export default Cart;
