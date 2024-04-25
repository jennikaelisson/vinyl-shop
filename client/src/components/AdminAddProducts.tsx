import React, { useState } from "react";

const AdminAddProducts = () => {
  const [formData, setFormData] = useState({
    artist: "",
    title: "",
    price: 0,
    releaseYear: 0,
    image: "",
    quantityInStock: 0,
    category: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to add product");
      }
      alert("Product added successfully");
      // Clear form data after successful submission
      setFormData({
        artist: "",
        title: "",
        price: 0,
        releaseYear: 0,
        image: "",
        quantityInStock: 0,
        category: "",
      });
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product");
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
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
          Category:
          <input type="text" name="category" value={formData.category} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AdminAddProducts;
