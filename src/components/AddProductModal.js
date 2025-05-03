import { useState, useContext } from 'react';
import { ProductContext } from '../context/ProductContext';

const AddProductModal = ({ onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantities, setQuantities] = useState({
    large: 0,
    medium: 0,
    small: 0
  });

  const { addProduct } = useContext(ProductContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
        name,
        description,
        price: parseFloat(price) || 0,
        quantities: { 
          large: parseInt(quantities.large) || 0,
          medium: parseInt(quantities.medium) || 0,
          small: parseInt(quantities.small) || 0
        }
      };
    console.log("Submitting product:", productData);

    const success = await addProduct(productData);

    if (success) {
        setName("");
        setDescription("");
        setPrice("");
        setQuantities({ large: 0, medium: 0, small: 0 });
        onClose(); 
      } else {
      console.error("Product NOT added");
      alert("Failed to add product. Check console for details.");
    }
  };

  return (
    <div className="modal">
      <h2>Add New Shoe</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Shoe Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <div className="size-quantities">
          <label>
            Large:
            <input
              type="number"
              min="0"
              value={quantities.large}
              onChange={(e) =>
                setQuantities({ ...quantities, large: parseInt(e.target.value) || 0 })
              }
            />
          </label>

          <label>
            Medium:
            <input
              type="number"
              min="0"
              value={quantities.medium}
              onChange={(e) =>
                setQuantities({ ...quantities, medium: parseInt(e.target.value) || 0 })
              }
            />
          </label>

          <label>
            Small:
            <input
              type="number"
              min="0"
              value={quantities.small}
              onChange={(e) =>
                setQuantities({ ...quantities, small: parseInt(e.target.value) || 0 })
              }
            />
          </label>
        </div>

        <button type="submit">Add Product</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default AddProductModal;
