import { MdPayment } from "react-icons/md";
import mastercardLogo from '../assets/mastercard.png';
import visaLogo from '../assets/visa.png';
import swish from '../assets/swish.png';
import { FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";


const Payment = () => {

    const [paymentMethod, setPaymentMethod] = useState('card');

    const handleChangePaymentMethod = (e) => {
        setPaymentMethod(e);
    }

    return (
        
            <section className="payment box-shadow">
            <div className="flex cart-top bottom-border">
                    <div className="cart-title">
                        <FaShoppingCart className="icon"/>
                        <p id="title">Payment</p>
                    </div>
                    <p id="items"></p>
                </div>

                <motion.section className="credit-card" 
                initial={{ height: 100 }}  
                animate={{ height: paymentMethod === 'card' ? 'auto' : 60 }}
                
                transition={{ duration: 0.3 }} >
                    <div className="flex-left-payment">
                        <input type="radio" 
                            name="paymentMethod" 
                            id="" 
                            className="input-radio"
                            checked={paymentMethod === 'card'}
                            value="card"
                            onChange={(e) => handleChangePaymentMethod(e.target.value)}/>
                        <MdPayment className="icon"/>
                        <p>Credit / Debit Card</p>
                        {paymentMethod=== 'card' && 
                        <div className="flex-left-payment"
                        
                        >
                            
                            <img src={mastercardLogo} alt="" className="icon-card"/>
                            <img src={visaLogo} alt="" className="icon-card"/>
                        </div>}
                    </div>
                    {paymentMethod === 'card' && <div className="payment-info">
                        
                            
                            <input type="text" placeholder="Card Number"/>
                            <input type="text" placeholder="Name on Card"/>
                            
                            <div className="flex ">
                                <input type="text" placeholder="Expiration Date (MM/DD)"/>
                                <input type="text" name="" id="" placeholder="CVV" className="margin-left-5"/>
                            </div>
                        
                    </div>}
                </motion.section>

                <motion.section className="swish"
                initial={{ height: 100 }}  
                animate={{ height: paymentMethod === 'swish' ? 'auto' : 60 }} 
                transition={{ duration: 0.3 }} >
                    <div className="flex-left-payment">
                    <input type="radio" 
                            name="paymentMethod" 
                            id="" 
                            className="input-radio"
                            checked={paymentMethod === 'swish'}
                            value="swish"
                            onChange={(e) => handleChangePaymentMethod(e.target.value)}/>
                        <img src={swish} alt=""  className="icon-swish"/>
                        </div>
                        {paymentMethod === 'swish' && 
                        <div className="flex swish-div">
                            <input type="text" placeholder="Telephone Number"/>
                            <button className="open-swish">Open Swish</button>
                        </div>
                        }
                    
                </motion.section>
                <div className="flex-right">
                    <button className="order-button" >Confirm and pay</button>
                </div>
                <div className="margin-bottom-20">
            
                </div>
            </section>
        
      );
}
 
export default Payment;