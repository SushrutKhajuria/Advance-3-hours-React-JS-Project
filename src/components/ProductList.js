import { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import { CartContext } from '../context/CartContext';

const ProductList = () => {
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);

  return (
    <div>
      {products.map(product => (
        <div key={product.id} className="product">
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          {Object.entries(product.quantities).map(([size, qty]) => (
            qty > 0 && (
              <button key={size} onClick={() => addToCart({ id: product.id, size, price: product.price, name: product.name })}>
                Buy {size} ({qty} left)
              </button>
            )
          ))}
        </div>
      ))}
    </div>
  );
};

export default ProductList;