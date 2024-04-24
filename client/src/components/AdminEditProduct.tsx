import React, { useEffect, useState } from "react";

interface IProduct {
  _id: string;
  artist: string;
  title: string;
  price: number;
  releaseYear: number;
  image: string;
  quantityInStock: number;
  status: string;
  category: string;
}

const AdminEditProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<string | null>(null);
  const [editableProductId, setEditableProductId] = useState<string | null>(null);

  useEffect(() => {
    const gatherProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setErrors(errors);
      } finally {
        setLoading(false);
      }
    };
    gatherProducts();
  }, []);

  const handleEdit = (productId: string) => {
    setEditableProductId(productId);
  };

  const handleSave = async (productId: string, updatedProduct: IProduct) => {
    try {
      const response = await fetch(`http://localhost:3000/products/${productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });
      if (!response.ok) {
        throw new Error("Failed to update product");
      }
      // Refresh product list after saving
      const updatedProducts = products.map((product) =>
        product._id === productId ? updatedProduct : product
      );
      setProducts(updatedProducts);
      setEditableProductId(null);
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (errors) {
    return <div>Error: {errors}</div>;
  }

  return (
    <div>
      {products?.length === 0 ? (
        <div>No products available</div>
      ) : (
        products?.map((product: IProduct) => (
          <div key={product._id}>
            {editableProductId === product._id ? (
              <EditProductForm
                product={product}
                onSave={(updatedProduct) => handleSave(product._id, updatedProduct)}
                onCancel={() => setEditableProductId(null)}
              />
            ) : (
              <>
                <h3>{product.artist}</h3>
                <h4>{product.title}</h4>
                <img src={product.image} alt="Product image" />
                <h4>Price: {product.price} kr</h4>
                <p>Release year: {product.releaseYear}</p>
                <button onClick={() => handleEdit(product._id)}>Edit</button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

interface EditProductFormProps {
  product: IProduct;
  onSave: (updatedProduct: IProduct) => void;
  onCancel: () => void;
}

const EditProductForm: React.FC<EditProductFormProps> = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState<IProduct>(product);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Artist:
        <input type="text" name="artist" value={formData.artist} onChange={handleChange} />
      </label>
      <br />
      <label>
        Title:
        <input type="text" name="title" value={formData.title} onChange={handleChange} />
      </label>
      <br />
      <label>
        Price:
        <input type="number" name="price" value={formData.price} onChange={handleChange} />
      </label>
      <br />
      <label>
        Release Year:
        <input type="number" name="releaseYear" value={formData.releaseYear} onChange={handleChange} />
      </label>
      <br />
      <label>
        Image:
        <input type="text" name="image" value={formData.image} onChange={handleChange} />
      </label>
      <br />
      <label>
        Quantity in Stock:
        <input type="number" name="quantityInStock" value={formData.quantityInStock} onChange={handleChange} />
      </label>
      <br />
      <label>
        Status:
        <input type="text" name="status" value={formData.status} onChange={handleChange} />
      </label>
      <br />
      <label>
        Category:
        <input type="text" name="category" value={formData.category} onChange={handleChange} />
      </label>
      <br />
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default AdminEditProducts;
