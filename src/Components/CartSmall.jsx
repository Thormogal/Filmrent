import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";
import { Link } from "react-router-dom";
import { removeFromCart } from '../features/cart';
import {motion} from 'framer-motion';

const CartSmall = ({ showSmallCart, setShowSmallCart }) => {

    const cart = useSelector(state => state.cart.cart);
    const dispatch = useDispatch();

    const calculateTotalFullPrice = () => {
        return cart.reduce((total, item) => total + item.finalPrice, 0);
    };

    const calculateTotalDiscount = () => {
        return cart.reduce((total, item) => total + (item.fullPrice - item.finalPrice), 0);
    };
    const handleDelete = (item) => {
        const id = item.id;
        
        const message = `${item.title} was removed from your cart.`
        dispatch(removeFromCart({id, message}));
        
    }

    return (
        <div className="cart-small small-cart-space-between no-padding">
            <div className="cart-title bottom-border no-padding">
                <p id="title">Shopping Cart</p>
                <p id="items">{cart.length} Items</p>
                <MdOutlineCancel className="icon" onClick={() => setShowSmallCart(!showSmallCart)} />
            </div>
            <div className="cart-all">
                {cart.length === 0 && <p>Shopping cart is empty</p>}
                {cart.map((item, index) => {
                    const imageURL = `https://image.tmdb.org/t/p/original${item.poster_path}`;
                    return (
                        <div className="movie-cart-small flex bottom-border" key={index}>
                            <img src={imageURL} alt="" className="icon" />
                            <div className="left">
                                <Link to={`/movie-info/${item.movieID}`} >
                                    <p onClick={() => setShowSmallCart(!showSmallCart)}>{item.title}</p>
                                </Link>

                                {item.discount > 0 ?
                                    <div className='price-small-cart flex-left'>
                                        <p className='discounted-price'>${item.finalPrice.toFixed(2)}</p>
                                        <p className='fullprice-discount'>${item.fullPrice.toFixed(2)}</p>
                                    </div> :
                                    <div className='price-small-cart flex-left'>
                                        <p>${item.finalPrice.toFixed(2)}</p>
                                    </div>
                                }
                            </div>
                            <div>
                                <MdDelete className='icon-delete' onClick={() => handleDelete(item)} />
                            </div>
                        </div>
                    );
                })}
            </div>
            <div>
                <p id="title">Total: ${calculateTotalFullPrice().toFixed(2)}</p>
                
                {calculateTotalDiscount() > 0 && (
                    <p style={{ color: 'green', textAlign: 'center', fontStyle: 'italic' }}>
                        You save ${calculateTotalDiscount().toFixed(2)}!
                    </p>
                )}
                
                <Link to="/Checkout">
                    <button className="go-to-checkout" onClick={() => setShowSmallCart(!showSmallCart)}>Check Out</button>
                </Link>
            </div>
        </div>
    );
};

export default CartSmall;
