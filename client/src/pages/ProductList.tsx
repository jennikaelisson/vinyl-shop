import { useEffect, useState } from "react";
import { IProduct, useCart } from "../Context/CartContext";

// interface IShowProduct {
//     _id: string;
//     artist: string;
//     title: string;
//     price: number;
//     releaseYear: number;
//     image: string;
//     quantityInStock: number;
//     status: string;
//     category: object;
// }

const ProductList = () => {
  const [products, setProducts] = useState<IProduct[]>();
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<string | null>(null);

  const { addToCart } = useCart();
  console.log("addToCart function:", addToCart);


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
    <div className="grid">
      {products?.length === 0 ? (
        <div>No products available</div>
      ) : (
        products?.map((product: IProduct) => (
          <div key={product._id} className="product-card col-3 col-m-3 col-s-2 col-xs-1">
            <img src={product.image} alt={product.artist} />
            <h3>{product.artist}</h3>
            <h4>{product.title}</h4>
            
            <h4>Price: {product.price} kr</h4>
            <p>Release year: {product.releaseYear}</p>
            <button onClick={() => addToCart(product)}>
            Add to cart
          </button>          </div>
        ))
      )}
    </div>
  );
};

export default ProductList;
