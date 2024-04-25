import { useEffect, useState } from "react";

interface IOrder {
    _id: string;
    totalPrice: number;
    orderDate: string;
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
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<string | null>(null);

  useEffect(() => {
    const gatherOrders = async () => {
      try {
        const response = await fetch("http://localhost:3000/orders");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        console.log(data);
        setOrders(data);
      } catch (error) {
        setErrors(errors);
      } finally {
        setLoading(false);
      }
    };
    gatherOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (errors) {
    return <div>Error: {errors}</div>;
  }

  return (
    <div>
      {orders?.length === 0 ? (
        <div>No orders available</div>
      ) : (
        orders?.map((order: IOrder) => (
          <div key={order._id}>
            <h3>Confirmation number {order._id}</h3>
            <h4>Total amount: {order.totalPrice} kr</h4>
            {/* Uncomment the following lines if you have image URLs */}
            {/* <img src={product.image} alt="Product image" /> */}
            <h4>Date: {order.orderDate} </h4>
            <p>Delivery status: {order.status}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderList;
