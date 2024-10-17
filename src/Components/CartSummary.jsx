import { useDispatch, useSelector } from 'react-redux';
import '../CSS/Cart.css';
import { RiCoupon5Line } from "react-icons/ri";
import { useState } from 'react';
import { MdDelete } from "react-icons/md";
import { remmoveCoupon, setCoupon } from '../features/cart';
import { showToast } from '../features/toastSlice';

const CartSummary = ({ showCart, setShowCart }) => {
    const [couponDiscount, setCouponDiscount] = useState(0);
    const [showAddCoupon, setShowAddCoupon] = useState(false);
    const [code, setCode] = useState('');
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const calculateTotalFullPrice = () => {
        return cart.cart.reduce((total, item) => total + item.fullPrice, 0);
    };

    const calculateTotalDiscount = () => {
        return cart.cart.reduce((total, item) => {
            const finalPrice = item.discount > 0
                ? item.fullPrice * (1 - item.discount / 100)
                : item.fullPrice;
            return total + (item.fullPrice - finalPrice);
        }, 0);
    };

    const calculateCouponDiscount = () => {
        return cart.coupon ? cart.coupon.discountValue : 0;
    };

    const calculateTotalPrice = () => {
        const totalPriceBeforeCoupon = cart.cart.reduce((total, item) => {
            return total + (item.discount > 0
                ? item.fullPrice * (1 - item.discount / 100)
                : item.fullPrice);
        }, 0);
        const couponDiscountValue = calculateCouponDiscount();
        return totalPriceBeforeCoupon - couponDiscountValue;
    };

    const handleAddCouponCode = (text) => {
        const foundCoupon = cart.coupons.find(c => c.code === text);
        if (foundCoupon) {
            const message = `Coupon ${foundCoupon.code} was added`;
            dispatch(setCoupon(foundCoupon));
            dispatch(showToast({ showToast: true, message: message }));
        }
        setShowAddCoupon(!showAddCoupon);
    };

    const handleDeleteCode = () => {
        dispatch(remmoveCoupon());
        const message = "Coupon was removed";
        dispatch(showToast({ showToast: true, message: message }));
    };

    const totalFullPrice = calculateTotalFullPrice();
    const totalDiscount = calculateTotalDiscount() + calculateCouponDiscount();
    const totalPrice = calculateTotalPrice();

    return (
        <section className="cart-summary box-shadow">
            <div className='top-border'></div>
            <div className='cart-top bottom-border padding-30'>
                <p id='title'>Order Summary</p>
            </div>
            <div className="coupon flex">
                <div className='flex-left-payment'>
                    <RiCoupon5Line className='icon' />
                    <p>Coupons</p>
                </div>
                {!showAddCoupon && cart.coupon === null &&
                    <button className="coupon-button" onClick={() => setShowAddCoupon(!showAddCoupon)}>Add</button>
                }
            </div>
            {showAddCoupon &&
                <div className="flex coupon">
                    <input
                        type="text"
                        placeholder='Coupon code'
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                    <button className="coupon-button" onClick={() => handleAddCouponCode(code)}>Add</button>
                </div>
            }
            {cart.coupon !== null &&
                <div className="active-coupon flex">
                    <p>"{cart.coupon.code}"</p>
                    <MdDelete className="icon-delete" onClick={() => handleDeleteCode()} />
                </div>
            }
            <div className="bottom-border"></div>
            <div className="bottom-border flex">
                <p id='items'>{`Price details (${cart.cart.length} items)`} </p>
            </div>
            <div className="summary">
                <p className='gray'>Total:</p>
                <p>${cart.totalFullPrice}</p>
                <p className='gray'>Discount:</p>
                <p className='discounted-price'>${cart.totalDiscount}</p>
                <p className='gray'>Coupon Discount:</p>
                <p className='discounted-price'>${cart.totalCouponsDiscount}</p>
            </div>
            <div className="bottom-border"></div>
            <div className="summary summary-total flex">
                <p>Total Amount:</p>
                <p>${cart.totalPrice}</p>
            </div>
            {cart.totalSavings > 0 && (
                <div style={{ color: 'green', textAlign: 'center', fontStyle: 'italic' }}>
                    <p>
                        You save ${cart.totalSavings} {cart.savingsMessage}!
                    </p>
                </div>
            )}


            <div className="flex">
                {showCart &&
                    <button className='order-button' onClick={() => setShowCart(!showCart)}>
                        Place Order
                    </button>
                }
            </div>
            <div className='bot-border'></div>
        </section>
    );
};

export default CartSummary;