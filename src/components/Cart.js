import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { cart, clearCart } = useContext(CartContext);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={`${item.id}-${item.size}`}>
                {item.name} ({item.size}) × {item.quantity}: 
                ₹{item.price * item.quantity}
              </li>
            ))}
          </ul>
          <p>Total: ₹{totalPrice}</p>
          <button onClick={clearCart}>Place Order</button>
        </>
      )}
    </div>
  );
};

export default Cart;