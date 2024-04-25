import { useState } from "react";
import { useCart } from "../Context/CartContext";

const Cart = () => {
    const { cart, addToCart } = useCart();
    const [updatedCart, setUpdatedCart] = useState(cart);

    const increaseQuantity = (index) => {
        const newCart = [...updatedCart];
        newCart[index].quantity++;
        setUpdatedCart(newCart);
    };

    const decreaseQuantity = (index) => {
        const newCart = [...updatedCart];
        if (newCart[index].quantity > 1) {
            newCart[index].quantity--;
            setUpdatedCart(newCart);
        }
    };

    const removeProduct = (index) => {
        const newCart = [...updatedCart];
        newCart.splice(index, 1);
        setUpdatedCart(newCart);
    };

    const updateQuantity = (index, quantity) => {
        const newCart = [...updatedCart];
        newCart[index].quantity = quantity;
        setUpdatedCart(newCart);
    };

    const handleQuantityChange = (event, index) => {
        const quantity = parseInt(event.target.value);
        updateQuantity(index, quantity);
    };

    const handleUpdateCart = () => {
        setUpdatedCart(cart);
    };

    return (
        <>
            <h2>My Cart</h2>
            <div>
                {updatedCart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <ul>
                        {updatedCart.map((item, index) => (
                            <li key={index}>
                                <img src={item.product.image} alt={item.product.title} />
                                <div>
                                    <h3>{item.product.title}</h3>
                                    <p>Artist: {item.product.artist}</p>
                                    <p>Price: {item.product.price} kr</p>
                                    <label htmlFor={`quantity-${index}`}>Quantity:</label>
                                    <input
                                        id={`quantity-${index}`}
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(e, index)}
                                    />
                                    <button onClick={() => increaseQuantity(index)}>+</button>
                                    <button onClick={() => decreaseQuantity(index)}>-</button>
                                    <button onClick={() => removeProduct(index)}>Remove</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <button onClick={handleUpdateCart}>Update Cart</button>
        </>
    );
};

export default Cart;
