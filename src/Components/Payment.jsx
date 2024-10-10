import { MdPayment } from "react-icons/md";
import mastercardLogo from '../assets/mastercard.png';
import visaLogo from '../assets/visa.png';
import swish from '../assets/swish.png';
import { FaShoppingCart } from "react-icons/fa";


const Payment = () => {
    return (
        <section className="payment box-shadow">
        <div className="flex cart-top bottom-border">
                <div className="cart-title">
                    <FaShoppingCart className="icon"/>
                    <p id="title">Payment</p>
                </div>
                <p id="items">tems</p>
            </div>
            <section className="credit-card">
                <div className="flex-left-payment">
                    <input type="checkbox" name="" id="" />
                    <MdPayment />
                    <p>Credit / Debit Card</p>
                    <img src={mastercardLogo} alt="" className="icon-card"/>
                    <img src={visaLogo} alt="" className="icon-card"/>
                </div>
                <div className="payment-info">
                    <input type="text" placeholder="Card Number"/>
                    <input type="text" placeholder="Name on Card"/>
                    <div className="flex">
                        <input type="text" placeholder="Expiration Date (MM/DD)"/>
                        <input type="text" name="" id="" placeholder="CCV"/>
                    </div>
                </div>
            </section>
            <section className="swish">
                <div className="flex-left-payment">
                    <input type="checkbox" name="" id="" />
                    <img src={swish} alt=""  className="icon-swish"/>
                    <input type="text" placeholder="Telephone Number"/>
                    <button className="open-swish">Open Swish</button>
                </div>
            </section>
            <div className="flex-right">
                <button className="order-button">Confirm and pay</button>
            </div>
            <div className="margin-bottom-20">
           
            </div>
        </section>
      );
}
 
export default Payment;