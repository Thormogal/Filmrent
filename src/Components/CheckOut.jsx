import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import Cart from "./cart";
import '../CSS/Cart.css';
import CartSummary from "./CartSummary";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoMdArrowRoundForward } from "react-icons/io";
import Payment from "./Payment";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { setDummyData } from "../features/cart";


const ShoppingCart = () => {

    const [showCart, setShowCart] = useState(true);
    const [showPart, setShowPart] = useState(1);
    
    const [screenSize, setScreenSize] = useState(getScreenSize());
    const dispatch = useDispatch();

    function getScreenSize() {
        const width = window.innerWidth;

        if (width <= 600) {
            return 'mobile';
        } else if (width > 600 && width <= 1024) {
            return 'tablet';
        } else {
            return 'desktop';
        }
    }

    useEffect(() => {
        const handleResize = () => {
            setScreenSize(getScreenSize());
        };

        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
        };
        
    }, []);

    const handleBackClick = () => {
        if(showCart) {

        } else {
            setShowCart(true)
        }
    }
    const handleBackClickTablet = () => {
        if(showPart > 1) {
            setShowPart(showPart-1);
        }
    }

    const CheckoutMobileScreen = () => {
        return (<section className="shoppingcart" >
        <section className="checkout-tablet">
            <motion.div key="cart"
                initial={{ height: 100 }}  
                animate={{ height: showPart === 1 ? 'auto' : 60 }}
                style= {{overflow: 'hidden'}}
                transition={{ duration: 0.3 }} 
                onClick={() => setShowPart(1)}>
                    <Cart />
            </motion.div>
            <motion.div key="summary"
                initial={{ height: 100 }}  
                animate={{ height: showPart === 2 ? 'auto' : 60}}
                style= {{overflow: 'hidden'}}
                transition={{ duration: 0.3 }} 
                onClick={() => setShowPart(2)}>
                    
                    <CartSummary showCart={false} setShowCart={setShowCart}/>
                
            </motion.div>
            <motion.div key="payment"
                initial={{ height: 100 }}  
                animate={{ height: showPart === 3 ? 'auto' : 60 }}
                style= {{overflow: 'hidden'}}
                transition={{ duration: 0.3 }}
                onClick={() => setShowPart(3)} >
                    <Payment />
            </motion.div>
           
        </section>
        
        <div className="flex space-between">
                <div className="flex-left pointer " onClick={() =>  handleBackClickTablet()}>
                    <IoMdArrowRoundBack className="icon" />
                    <p>{showPart === 1 ? "Continue shopping" : showPart === 2 ? "Back to Cart" : "Back to summary"}</p>
                    
                </div>
                {showPart !== 3 && <div className="flex-left " onClick={() => setShowPart(showPart+1)}>
                    
                        <p>Next</p>
                        <IoMdArrowRoundForward className="icon" />
                    
                </div>}
            </div>

    </section>
)
    }

    const CheckoutTabletScreen = () => {
        return (
            <section className="shoppingcart" >
                <section className="checkout-tablet">
                    <motion.div key="cart"
                    initial={{ height: 100 }}  
                    animate={{ height: showPart === 1 ? 'auto' : 60 }}
                    style= {{overflow: 'hidden'}}
                    transition={{ duration: 0.3 }} 
                    onClick={() => setShowPart(1)}>
                        <Cart />
                    </motion.div>
                    <motion.div key="summary"
                    initial={{ height: 100 }}  
                    animate={{ height: showPart === 2 ? 'auto' : 60}}
                    style= {{overflow: 'hidden'}}
                    transition={{ duration: 0.3 }} 
                    onClick={() => setShowPart(2)}>
                        
                            <CartSummary showCart={showCart} setShowCart={setShowCart}/>
                        
                    </motion.div>
                    <motion.div key="payment"
                    initial={{ height: 100 }}  
                    animate={{ height: showPart === 3 ? 'auto' : 60 }}
                    style= {{overflow: 'hidden'}}
                    transition={{ duration: 0.3 }}
                    onClick={() => setShowPart(3)} >
                        <Payment />
                    </motion.div>
                   
                </section>
                
                <div className="flex space-between">
                        <div className="flex-left pointer " onClick={() =>  handleBackClickTablet()}>
                            <IoMdArrowRoundBack className="icon" />
                            <p>{showPart === 1 ? "Continue shopping" : showPart === 2 ? "Back to Cart" : "Back to summary"}</p>
                            
                        </div>
                        {showPart !== 3 && <div className="flex-left " onClick={() => setShowPart(showPart+1)}>
                            
                                <p>Next</p>
                                <IoMdArrowRoundForward className="icon" />
                            
                        </div>}
                    </div>

            </section>
        )
    }

    const CheckoutDesktopScreen = () => {
    return (<AnimatePresence mode="wait">
            <div className="shoppingcart">
                <div>
                    {showCart ? 
                    <motion.div
                        key="cart"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Cart /> 
                    </motion.div>: 
                    <motion.div
                        key="payment"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Payment />
                     </motion.div>}
                    <div>
                        <div className="flex-left pointer" onClick={() =>  handleBackClick()}>
                            <IoMdArrowRoundBack className="icon" />
                            <p>{showCart ? "Continue shopping" : "Back to Cart"}</p>
                            
                        </div>
                        
                    </div>
                </div>
                <CartSummary showCart={showCart} setShowCart={setShowCart}/>
            </div>
        </AnimatePresence>)
    }
    

   

    const cart = useSelector(state => state.cart)
    return ( 
        <div>
            {screenSize === 'mobile' && <CheckoutMobileScreen />}
            {screenSize === 'tablet' && <CheckoutTabletScreen />}
            {screenSize === 'desktop' && <CheckoutDesktopScreen />}
        </div>
        // <AnimatePresence mode="wait">
        //     <div className="shoppingcart">
        //         <div>
        //             {showCart ? 
        //             <motion.div
        //                 key="cart"
        //                 initial={{ opacity: 0 }}
        //                 animate={{ opacity: 1 }}
        //                 exit={{ opacity: 0 }}
        //                 transition={{ duration: 0.5 }}
        //             >
        //                 <Cart /> 
        //             </motion.div>: 
        //             <motion.div
        //                 key="payment"
        //                 initial={{ opacity: 0 }}
        //                 animate={{ opacity: 1 }}
        //                 exit={{ opacity: 0 }}
        //                 transition={{ duration: 0.5 }}
        //             >
        //                 <Payment />
        //              </motion.div>}
        //             <div className="flex space-between">
        //                 <div className="flex-left pointer" onClick={() =>  handleBackClick()}>
        //                     <IoMdArrowRoundBack className="icon" />
        //                     <p>{showCart ? "Continue shopping" : "Back to Cart"}</p>
                            
        //                 </div>
        //                 <div className="flex-left pointer" onClick={() => handleNext()}>
        //                     <p>Next</p>
        //                     <IoMdArrowRoundForward className="icon" />
        //                 </div>
        //             </div>
        //         </div>
        //         <CartSummary showCart={showCart} setShowCart={setShowCart}/>
        //     </div>
        // </AnimatePresence>
     );
}
 
export default ShoppingCart;