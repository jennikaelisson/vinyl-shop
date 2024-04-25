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
  category?: ICategory;
}

interface ICategory { 
  _id: string;
  name: string;
  decription: string;
  childOf: string;
}

const SixtiesList = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<string | null>(null);

  useEffect(() => {
    const gatherProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/products/");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        console.log(data);
        const filteredProducts = data.filter((product: IProduct) => product.category?.childOf === "6623d2efd3d9dfb5c2677af9");
        setProducts(filteredProducts);
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
          <div
            key={product._id}
            className="product-card col-3 col-m-3 col-s-2 col-xs-1"
          >
            <img src={product.image} alt="Product image" />
            <h3>{product.artist}</h3>
            <h4>{product.category ? product.category.childOf : "Unknown Category"}</h4>
            <h4>Price: {product.price} kr</h4>
            <p>Release year: {product.releaseYear}</p>
            <button>Add</button>
          </div>
        ))
      )}
    </div>
  );
};

export default SixtiesList;
