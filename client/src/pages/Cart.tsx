// import { ChangeEvent, useEffect, useState } from "react";
// import { useCart, ICartItem } from "../Context/CartContext";

// const Cart = () => {
//     const { cart } = useCart();
//     const [updatedCart, setUpdatedCart] = useState(cart);

//     useEffect(() => {
//         setUpdatedCart(cart);
//     }, [cart]);

//     const increaseQuantity = (index: number) => {
//         const newCart: ICartItem[] = [...updatedCart];
//         newCart[index].quantity++;
//         setUpdatedCart(newCart);
//     };
    
//     const decreaseQuantity = (index: number) => {
//         const newCart: ICartItem[] = [...updatedCart];
//         if (newCart[index].quantity > 1) {
//             newCart[index].quantity--;
//             setUpdatedCart(newCart);
//         }
//     };
    
//     const removeProduct = (index: number) => {
//         const newCart: ICartItem[] = [...updatedCart];
//         newCart.splice(index, 1);
//         setUpdatedCart(newCart);
//     };
    
//     const updateQuantity = (index: number, quantity: number) => {
//         const newCart: ICartItem[] = [...updatedCart];
//         newCart[index].quantity = quantity;
//         setUpdatedCart(newCart);
//     };
    
//     const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
//         const quantity: number = parseInt(event.target.value);
//         updateQuantity(index, quantity);
//     };
    
//     const handleUpdateCart = () => {
//         setUpdatedCart(cart);
//     };
    
//     return (
//         <>
//             <h2>My Cart</h2>
//             <div>
//                 {updatedCart.length === 0 ? (
//                     <p>Your cart is empty.</p>
//                 ) : (
//                     <>
//                         <ul className="grid">
//                             {updatedCart.map((item: ICartItem, index: number) => (
//                                 <li key={index} className="product-card col-3 col-m-3 col-s-2 col-xs-1">
//                                     <img src={item.product.image} alt={item.product.title} />
//                                     <div>
//                                         <h3>{item.product.title}</h3>
//                                         <p>Artist: {item.product.artist}</p>
//                                         <p>Price: {item.product.price} kr</p>
//                                         <label htmlFor={`quantity-${index}`}>Quantity:</label>
//                                         <input
//                                             id={`quantity-${index}`}
//                                             type="number"
//                                             min="1"
//                                             value={item.quantity}
//                                             onChange={(e) => handleQuantityChange(e, index)}
//                                         />
//                                         <button onClick={() => increaseQuantity(index)}>+</button>
//                                         <button onClick={() => decreaseQuantity(index)}>-</button>
//                                         <button onClick={() => removeProduct(index)}>Remove</button>
//                                     </div>
//                                 </li>
//                             ))}
//                         </ul>
//                         <div><button>Pay</button></div>
//                     </>
//                 )}
//             </div>
//             <button onClick={handleUpdateCart}>Update Cart</button>
//         </>
//     );
// };

// export default Cart;    

import { useEffect, useState } from "react";
import { useCart, ICartItem } from "../Context/CartContext";
import { Link } from "react-router-dom";
// import user from "../Context/UserContext";

const Cart = () => {
    const { cart } = useCart();
    const [updatedCart, setUpdatedCart] = useState(cart);

    useEffect(() => {
        setUpdatedCart(cart);
    }, [cart]);

    // const handlePayment = async () => {
    //     // if (!user) {
    //     //     alert("Du måste logga in för att genomföra köpet!");
    //     //     return;
    //     //   }
    //     const cartItems = cart.map((item) => ({
    //         product: item.product._id,
    //         quantity: item.quantity,
    //       }));

    //     const response = await fetch("http://localhost:3000/create-new-order", {
    //         method: "POST",
    //         headers: {
    //             "Content-type": "application/json"
    //         },
    //         credentials: "include",
    //         body: JSON.stringify(
    //            cartItems
    //         )
    //     })
    //     const data = await response.json()
    //     localStorage.setItem("sessionId", JSON.stringify(data.sessionId))
    //     window.location = data.url  
    // }
    // const increaseQuantity = (index: number) => {
    //     const newCart: ICartItem[] = [...updatedCart];
    //     newCart[index].quantity++;
    //     setUpdatedCart(newCart);
    // };
    
    // const decreaseQuantity = (index: number) => {
    //     const newCart: ICartItem[] = [...updatedCart];
    //     if (newCart[index].quantity > 1) {
    //         newCart[index].quantity--;
    //         setUpdatedCart(newCart);
    //     }
    // };
    
    // const removeProduct = (index: number) => {
    //     const newCart: ICartItem[] = [...updatedCart];
    //     newCart.splice(index, 1);
    //     setUpdatedCart(newCart);
    // };
    
    // const updateQuantity = (index: number, quantity: number) => {
    //     const newCart: ICartItem[] = [...updatedCart];
    //     newCart[index].quantity = quantity;
    //     setUpdatedCart(newCart);
    // };
    
    // const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    //     const quantity: number = parseInt(event.target.value);
    //     updateQuantity(index, quantity);
    // };
    
    // const handleUpdateCart = () => {
    //     setUpdatedCart(cart);
    // };
    
    return (
        <>
            <h2>My Cart</h2>
            <div>
                {updatedCart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <>
                        <ul className="grid">
                            {updatedCart.map((item: ICartItem, index: number) => (
                                <li key={index} className="product-card col-3 col-m-3 col-s-2 col-xs-1">
                                    <img src={item.product.image} alt={item.product.title} />
                                    <div>
                                        <h3>{item.product.title}</h3>
                                        <p>Artist: {item.product.artist}</p>
                                        <p>Price: {item.product.price} kr</p>
                                        {/* <label htmlFor={`quantity-${index}`}>Quantity:</label>
                                        <input
                                            id={`quantity-${index}`}
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) => handleQuantityChange(e, index)}
                                        />
                                        <button onClick={() => increaseQuantity(index)}>+</button>
                                        <button onClick={() => decreaseQuantity(index)}>-</button>
                                        <button onClick={() => removeProduct(index)}>Remove</button> */}
                                    </div>
                                </li>
                            ))}
                        </ul>
                        {/* <div><button onClick={handlePayment}>Pay</button></div> */}

                        <Link
							to="/confirmation"
							className="btn button link-color d-none d-md-inline"
						>
Pay						</Link>                    </>
                )}
            </div>
            {/* <button onClick={handleUpdateCart}>Update Cart</button> */}
        </>
    );
};

export default Cart;   
