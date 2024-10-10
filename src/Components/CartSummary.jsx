import { useDispatch, useSelector } from 'react-redux';
import '../CSS/Cart.css';
import { RiCoupon5Line } from "react-icons/ri";
import { useState } from 'react';



const CartSummary = ({showCart, setShowCart}) => {

    const [coupon, setCoupon] = useState(0.1);

    const cart = useSelector(state => state.cart);

    const calculateTotalFullPrice = () => {
        return cart.reduce((total, item) => total + item.fullPrice, 0);
    }
    const calculateDiscount = () => {
        return cart.reduce((total, item) => total + item.discount, 0);
    }
    const calculateCouponDiscount = () => {
         return Math.round(((calculateTotalFullPrice() - calculateDiscount())*coupon)*100)/100;
    }
    const calculateTotal = () => {
        return calculateTotalFullPrice() - calculateDiscount() - calculateCouponDiscount();
    }

    
    return ( 
        <section className="cart-summary box-shadow">
            <div className='top-border'>

            </div>
            <p className='cart-top bottom-border' id='title'>Order Summary</p>
            {/* <p className='cart-top padding-bottom-20' id='items'>{`Price Details (${cart.length} items)`}</p> */}
            
            <div className="coupon flex bottom-border">
                <RiCoupon5Line className='icon'/>
                <p>Coupons</p>
                <button>Add</button>
            </div>
            <div className="bottom-border flex">
                <p id='items'>{`Price details (${cart.length} items)`} </p>
                
            </div>
            <div className="summary">
                
                    <p>Total: </p>
                    <p>${calculateTotalFullPrice()}</p>
               
                    <p>Discount:</p>
                    <p className='discounted-price'>${calculateDiscount()}</p>
                
                    <p>Coupon Discount:</p>
                    <p>${calculateCouponDiscount()}</p>
                
            </div>
            <div className="bottom-border"></div>
            <div className="flex">
                <p>Total Ammount: </p>
                <p>${calculateTotal()}</p>
            </div>
            <div className="flex">
                {showCart && <button className='order-button' onClick={() => setShowCart(!showCart)}>Place Order</button>}
            </div>
            <div className='bot-border'>

            </div>
        </section>
     );
}
 
export default CartSummary;