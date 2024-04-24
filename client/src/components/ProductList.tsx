import { useEffect, useState } from "react";

interface IProduct {
    _id: string;
    artist: string;
    title: string;
    price: number;
    releaseYear: number;
    image: string;
    quantityInStock: number;
    status: string;
    category: object;
}

const ProductList = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<string | null>(null);

  useEffect(() => {
    const gatherProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        console.log(data);
        setProducts(data);
      } catch (error) {
        setErrors(errors);
      } finally {
        setLoading(false);
      }
    };
    gatherProducts();
  }, []);

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
            <h3>{product.artist}</h3>
            <h4>{product.title}</h4>
            {/* Uncomment the following lines if you have image URLs */}
            <img src={product.image} alt="Product image" />
            <h4>Price: {product.price} kr</h4>
            <p>Release year: {product.releaseYear}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductList;
