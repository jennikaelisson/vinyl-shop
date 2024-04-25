import { useCart } from "../Context/CartContext";

const Cart = () => {
     
    const {cart} = useCart();

    return <>My cart
    
    <div>
                Cart is {cart.length}
        </div></>
}

export default Cart;

