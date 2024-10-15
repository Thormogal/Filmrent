import { useDispatch, useSelector } from 'react-redux';
import '../CSS/Cart.css';
import { RiCoupon5Line } from "react-icons/ri";
import { useState } from 'react';
import { MdDelete } from "react-icons/md";

const CartSummary = ({ showCart, setShowCart }) => {
    const coupons = [
        { code: "10%OFF", percentage: 0.1 },
        { code: "20%OFF", percentage: 0.2 },
        { code: "30%OFF", percentage: 0.3 }
    ];

    const [couponDiscount, setCouponDiscount] = useState(0);
    const [showAddCoupon, setShowAddCoupon] = useState(false);
    const [code, setCode] = useState('');
    const [coupon, setCoupon] = useState(null);

    const cart = useSelector(state => state.cart.cart);

    const calculateTotalFullPrice = () => {
        return cart.reduce((total, item) => total + item.fullPrice, 0).toFixed(2);
    };

    const calculateDiscount = () => {
        return cart.reduce((total, item) => total + (item.discount || 0), 0).toFixed(2);
    };

    const calculateCouponDiscount = () => {
        return ((calculateTotalFullPrice() - calculateDiscount()) * couponDiscount).toFixed(2);
    };

    const calculateTotal = () => {
        return (calculateTotalFullPrice() - calculateDiscount() - calculateCouponDiscount()).toFixed(2);
    };

    const calculateTotalSavings = () => {
        return (parseFloat(calculateDiscount()) + parseFloat(calculateCouponDiscount())).toFixed(2);
    };

    const getSavingsMessage = () => {
        const discountExists = parseFloat(calculateDiscount()) > 0;
        const couponExists = couponDiscount > 0;

        if (discountExists && couponExists) {
            return "with discount and coupons";
        } else if (discountExists) {
            return "with discount";
        } else if (couponExists) {
            return "with coupons";
        }
        return "";
    };

    const handleAddCouponCode = (text) => {
        const foundCoupon = coupons.find(c => c.code === text);
        if (foundCoupon) {
            setCoupon(foundCoupon);
            setCouponDiscount(foundCoupon.percentage);
        }
        setShowAddCoupon(!showAddCoupon);
    };

    const handleDeleteCode = () => {
        setCoupon(null);
        setCouponDiscount(0);
    };

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
                {!showAddCoupon && coupon === null &&
                    <button onClick={() => setShowAddCoupon(!showAddCoupon)}>Add</button>
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
                    <button onClick={() => handleAddCouponCode(code)}>+</button>
                </div>
            }
            {coupon !== null &&
                <div className="active-coupon flex">
                    <p>"{coupon.code}"</p>
                    <MdDelete className="icon-delete" onClick={() => handleDeleteCode()} />
                </div>
            }
            <div className="bottom-border"></div>
            <div className="bottom-border flex">
                <p id='items'>{`Price details (${cart.length} items)`} </p>
            </div>
            <div className="summary">
                <p className='gray'>Total:</p>
                <p>${calculateTotalFullPrice()}</p>
                <p className='gray'>Discount:</p>
                <p className='discounted-price'>${calculateDiscount()}</p>
                <p className='gray'>Coupon Discount:</p>
                <p>${calculateCouponDiscount()}</p>
            </div>
            <div className="bottom-border"></div>
            <div className="summary summary-total flex">
                <p>Total Amount:</p>
                <p>${calculateTotal()}</p>
            </div>


            {calculateTotalSavings() > 0 && (
                <div style={{ color: 'green', textAlign: 'center', fontStyle: 'italic' }}>
                    You save ${calculateTotalSavings()} {getSavingsMessage()}!
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