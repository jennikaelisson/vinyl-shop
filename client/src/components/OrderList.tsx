import { useEffect, useState } from "react";

interface IOrder {
    _id: string;
    totalPrice: number;
    orderDate: Date;
    paymentId: string;
    status: string;
    lineItems: ILineItems[];
}

interface ILineItems {
    _id: string;
    orderId: string;
    quantity: number;
    product: string;
    totalPrice: number; 
}

const OrderList = () => {
  const [products, setProducts] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<string | null>(null);

  useEffect(() => {
    const gatherProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/orders");
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
        products?.map((product: IOrder) => (
          <div key={product._id}>
            <h3>{product._id}</h3>
            <h4>{product.tota}</h4>
            {/* Uncomment the following lines if you have image URLs */}
            {/* <img src={product.image} alt="Product image" /> */}
            <h4>{product.price / 100} kr</h4>
            <p>{product.releaseYear}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderList;
