
import { useState, useContext } from 'react';
import { ProductContext } from '../context/ProductContext';

const AddProductModal = ({ onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantities, setQuantities] = useState({ large: 0, medium: 0, small: 0 });
  const { addProduct } = useContext(ProductContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct({ id: Date.now(), name, description, price, quantities });
    onClose();
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Shoe Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <label>Large: <input type="number" value={quantities.large} onChange={(e) => setQuantities({ ...quantities, large: +e.target.value })} /></label>
        <label>Medium: <input type="number" value={quantities.medium} onChange={(e) => setQuantities({ ...quantities, medium: +e.target.value })} /></label>
        <label>Small: <input type="number" value={quantities.small} onChange={(e) => setQuantities({ ...quantities, small: +e.target.value })} /></label>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductModal;