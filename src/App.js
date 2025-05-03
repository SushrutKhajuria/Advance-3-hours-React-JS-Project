import { useState } from 'react';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import AddProductModal from './components/AddProductModal';

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <ProductProvider>
      <CartProvider>
        <div className="App">
          <button onClick={() => setShowModal(true)}>Add Product</button>
          <Cart />
          {showModal && <AddProductModal onClose={() => setShowModal(false)} />}
          <ProductList />
        </div>
      </CartProvider>
    </ProductProvider>
  );
}

export default App;