import * as React from "react";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

const ProductList = () => {
  const [products, setProducts] = useState();

  

  useEffect(() => {
    const gatherProducts = async () => {
      const response = await fetch("http://localhost:3000/products", {method: "POST",
            headers: {
                "Content-type": "application/json"
            }
        });
      const data = await response.json();
      console.log(data.data);
      setProducts(data.data);
    };
    gatherProducts();
  }, []);

  return (
    <div>
      {products?.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          {/* <img src={product.images} alt="Product image" /> */}
          <h4>{product.default_price.unit_amount / 100} kr</h4>
          <p>{product.description}</p>
         
        </div>
      ))}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("productList") as HTMLElement);
root.render(<ProductList />);
