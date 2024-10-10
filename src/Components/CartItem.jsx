import { useDispatch } from 'react-redux';
import '../CSS/Cart.css';
import { MdDelete } from "react-icons/md";
import { removeFromCart } from '../features/cart';


const CartItem = ({item}) => {
//Testid : 533535
const imageURL = `https://image.tmdb.org/t/p/original${item.poster_path}`


    const dispatch = useDispatch();
    return ( 

        
        <div className="cart-item flex box-shadow">
            <div className='flex'>
                <img src={imageURL} alt="" />
                <p>{item.title}</p>
            </div>
            <div >
                <p className='discounted-price'>${item.fullPrice - item.discount}</p>
                {item.discount > 0 ? <p className='fullprice-discount'>${item.fullPrice}</p> : <p></p>  }
                
            </div>
            <MdDelete className='icon' onClick={() => dispatch(removeFromCart(item.id))}/>
        </div>
     );
}
 
export default CartItem;