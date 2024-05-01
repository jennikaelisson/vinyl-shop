import { useEffect, useState } from "react";
import { IProduct } from "../Context/CartContext";

interface IOrder {
  _id: string;
  totalPrice: number;
  orderDate: string;
  paymentId: string;
  status: string;
  customer: ICustomer;
  lineItems: ILineItems[];
}

interface ICustomer {
  _id: string;
  firstName: string;
  lastName: string;
  address: {
    street: string;
    city: string;
  };
}

interface ILineItems {
  _id: string;
  orderId: string;
  quantity: number;
  product: IProduct;
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
    <div className="grid">
      {orders?.length === 0 ? (
        <div>No orders available</div>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-item col-3 align-left">
            <h2>Confirmation number: {order._id}</h2>
            <h4>Total amount: {order.totalPrice} kr</h4>
            <div className="customer-details">
              <h3>Name: {order.customer?.firstName} {order.customer?.lastName}</h3>
              <p>Address: {order.customer?.address.street}, {order.customer?.address.city}</p>
            </div>
            <h4>Order date: {order.orderDate} </h4>
            <p>Delivery status: {order.status}</p>
            <div className="line-items">
              <h3>Products:</h3>
              {order.lineItems.map((lineItem) => (
                <li key={lineItem._id} className="line-item">
                  <h4>{lineItem.product.artist} - {lineItem.product.title}</h4>
                  <p>Price: {lineItem.product.price} kr</p>
                </li>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderList;
