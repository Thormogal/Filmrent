import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";
import { Link } from "react-router-dom";
import { removeFromCart } from '../features/cart';

const CartSmall = ({showSmallCart, setShowSmallCart}) => {
    
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch();
    const calculateTotalFullPrice = () => {
        return cart.reduce((total, item) => total + item.fullPrice, 0);
    }

    return ( 
        <div className="cart-small small-cart-space-between">
            <div className="cart-title bottom-border ">
                <p id="title">Shopping Cart</p>
                <MdOutlineCancel className="icon " onClick={() => setShowSmallCart(!showSmallCart)}/>
            </div>
            <div className="cart-all">
            
            <div>
            {cart.length === 0 && <p>Shopping cart is empty</p>}
            {cart.map((item, index) => {
                const imageURL = `https://image.tmdb.org/t/p/original${item.poster_path}`
                return (
                
                <div className="movie-cart-small flex bottom-border" key={index}>
                    <img src={imageURL} alt="" className="icon"/>
                    <div className="left">
                        <Link to={`/movie-info/${item.movieID}`} >
                            <p onClick={() => setShowSmallCart(!showSmallCart)}>{item.title}</p>
                        </Link>
                        
                        {item.discount > 0 ? 
                <div className='price-small-cart flex-left'> 
                    <p className='discounted-price'>${item.fullPrice - item.discount}</p>
                    <p className='fullprice-discount'>${item.fullPrice}</p> 
                </div> : 
                <div className='price-small-cart flex-left'>
                    <p>${item.fullPrice}</p>  
                </div>
                }
                    </div>
                    <div>
                        <MdDelete className='icon-delete' onClick={() => dispatch(removeFromCart(item.id))}/>
                    </div>
                </div>
            )})}
            </div>
            </div>
            <div className="">
                
                <p id="title">Total: ${calculateTotalFullPrice()}</p>
                <Link to="/Checkout" >
                    <button className="go-to-checkout" onClick={() => setShowSmallCart(!showSmallCart)}>Check Out</button>
                </Link>
            </div>
        </div>
     );
}
 
export default CartSmall;