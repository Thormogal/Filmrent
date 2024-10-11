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
                <p className='item-title'>{item.title}</p>
            </div>
            <div className='' >
            {item.discount > 0 ? 
                <div className='price'> 
                    <p className='discounted-price'>${item.fullPrice - item.discount}</p>
                    <p className='fullprice-discount'>${item.fullPrice}</p> 
                </div> : 
                <div className='price'>
                    <p>${item.fullPrice}</p>  
                </div>
                }
                
            </div>
            <div className='right'>
                <MdDelete className='icon-delete' onClick={() => dispatch(removeFromCart(item.id))}/>
            </div>
        </div>
     );
}
 
export default CartItem;