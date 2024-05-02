import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart, ICartItem } from "../Context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const [customer, setCustomer] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: {
      street: "",
      city: "",
    },
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomer((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        [name]: value,
      },
    }));
  };

  const handlePayment = async () => {
    const lineItems = cart.map((item: ICartItem) => ({
      product: item.product._id,
      quantity: item.quantity,
    }));

    console.log(customer);
    console.log(lineItems);

    const response = await fetch("http://localhost:3000/create-new-order", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        customer,
        lineItems,
      }),
    });

    const data = await response.json();
    console.log(data);
    localStorage.setItem("orderId", JSON.stringify(data.id)); // Sparar orderns ID i localStorage
    console.log(localStorage.getItem("orderId"));
    navigate("/confirmation"); // Navigera till bekräftelsessidan
  };

  return (
    <>
      <h2>My Cart</h2>
      <div>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul className="grid">
              {cart.map((item: ICartItem, index: number) => (
                <li
                  key={index}
                  className="product-card col-3 col-m-3 col-s-2 col-xs-1"
                >
                  <img src={item.product.image} alt={item.product.title} />
                  <div>
                    <h3>{item.product.title}</h3>
                    <p>Artist: {item.product.artist}</p>
                    <p>Price: {item.product.price} kr</p>
                  </div>
                </li>
              ))}
            </ul>

            <div>
              <h3>Customer details:</h3>
              <input
                type="text"
                name="email"
                placeholder="id"
                value={customer.email}
                onChange={handleInputChange}
              />
              <br />
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={customer.firstName}
                onChange={handleInputChange}
              />
              <br />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={customer.lastName}
                onChange={handleInputChange}
              />
              <br />
              <input
                type="text"
                name="street"
                placeholder="Street"
                value={customer.address.street}
                onChange={handleAddressChange}
              />
              <br />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={customer.address.city}
                onChange={handleAddressChange}
              />
            </div>
            <Link
              to="/confirmation"
              className="link-color d-none d-md-inline"
              onClick={handlePayment}
            >
              To payment
            </Link>
            {/* <button onClick={handlePayment}>KÖP</button> */}
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
