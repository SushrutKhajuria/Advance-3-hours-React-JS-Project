import { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import { CartContext } from '../context/CartContext';

const ProductList = () => {
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);

  return (
    <div className="product-list">
      {products.length === 0 ? (
        <p>No products available. Add some shoes!</p>
      ) : (
        products.map(product => (
          <div key={product._id || product.id} className="product-card"> {/* Use _id if from API */}
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ₹{product.price}</p>
            <div className="size-buttons">
              {product.quantities && Object.entries(product.quantities).map(([size, quantity]) => (
                <button
                  key={size}
                  onClick={() => addToCart({
                    id: product._id || product.id, // Use _id if from API
                    size,
                    price: product.price,
                    name: product.name
                  })}
                  disabled={quantity <= 0}
                >
                  Buy {size} ({quantity} left)
                </button>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductList;