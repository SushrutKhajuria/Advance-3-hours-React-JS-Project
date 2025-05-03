import { useState } from 'react';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import AddProductModal from './components/AddProductModal';
import './App.css';

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <ProductProvider>
      <CartProvider>
        <div className="App">
          <header>
            <h1>Shoe Store</h1>
            <button 
              onClick={() => setShowModal(true)}
              className="add-product-btn"
              style={{ backgroundColor: '#3498db', color: 'white', padding: '10px 15px' }}
            >
              Add Product
            </button>
          </header>

          <Cart />
          
          {showModal && (
            <>
              <div 
                className="overlay" 
                onClick={() => setShowModal(false)} 
              />
              <AddProductModal onClose={() => setShowModal(false)} />
            </>
          )}

          <main>
            <ProductList />
          </main>
        </div>
      </CartProvider>
    </ProductProvider>
  );
}

export default App;