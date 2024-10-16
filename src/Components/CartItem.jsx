import { useDispatch } from 'react-redux';
import '../CSS/Cart.css';
import { MdDelete } from "react-icons/md";
import { removeFromCart } from '../features/cart';
import { showToast } from '../features/toastSlice';

const CartItem = ({item}) => {
    //Testid : 533535
  const imageURL = `https://image.tmdb.org/t/p/original${item.poster_path}`;
  const dispatch = useDispatch();

  const handleDelete = (item) => {
    const id = item.id;
    const message = `${item.title} was removed from your cart.`;

    dispatch(removeFromCart(id));
    dispatch(showToast({ showToast: true, message: message }));
    dispatch({ type: 'cart/calculateCart' });
};

  const finalPrice = item.discount > 0 
    ? item.fullPrice * (1 - item.discount / 100) 
    : item.fullPrice;

  return (
    <div className="cart-item flex box-shadow">
      <div className='flex'>
        <img src={imageURL} alt="" />
        <p className='item-title'>{item.title}</p>
      </div>
      <div className='price'>
        {item.discount > 0 ? (
          <div>
            <p className='discounted-price'>${finalPrice.toFixed(2)}</p>
            <p className='fullprice-discount'><s>${item.fullPrice.toFixed(2)}</s></p>
          </div>
        ) : (
          <p>${item.fullPrice.toFixed(2)}</p>
        )}
      </div>
      <div className='right'>
        <MdDelete className='icon-delete' onClick={() => handleDelete(item)} />
      </div>
    </div>
  );
};

export default CartItem;