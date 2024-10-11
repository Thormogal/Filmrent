import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import '../CSS/Cart.css';
import { FaShoppingCart } from "react-icons/fa";



const Cart = () => {

    const cart = useSelector(state => state.cart);

    return ( 
        <section className="cart box-shadow">
            <div className="flex cart-top bottom-border">
                <div className="cart-title">
                    <FaShoppingCart className="icon"/>
                    <p id="title">Shopping Cart</p>
                </div>
                <p id="items">{cart.length} Items</p>
            </div>
            <div className="cart-item flex-cart no-border">
                
                <p className="gray" id="product">Products</p>
                <p className="gray" id="price">Price</p>
                
            </div>
            <div className="margin-bottom-20">
            {cart.map((item, index) => (
                <div key={index}>
                    <CartItem item={item} />
                </div>
            ))}
            </div>
        </section>
     );
}
 
export default Cart;