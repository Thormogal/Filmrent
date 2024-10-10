import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import Cart from "./cart";
import '../CSS/Cart.css';
import CartSummary from "./CartSummary";
import { IoMdArrowRoundBack } from "react-icons/io";
import Payment from "./Payment";
import { useState } from "react";


const ShoppingCart = () => {

    const [showCart, setShowCart] = useState(true);

    const handleBackClick = () => {
        if(showCart) {

        } else {
            setShowCart(true)
        }
    }

    const cart = useSelector(state => state.cart)
    return ( 
        <div className="shoppingcart">
            <div>
                {showCart ? <Cart /> : <Payment />}
                {/* <Cart /> */}
                {/* <Payment /> */}
                <div className="flex-left" onClick={() =>  handleBackClick()}>
                    <IoMdArrowRoundBack className="icon" />
                    <p>{showCart ? "Continue shopping!" : "Back to Cart"}</p>
                 </div>
            </div>
            <CartSummary showCart={showCart} setShowCart={setShowCart}/>
        </div>
     );
}
 
export default ShoppingCart;