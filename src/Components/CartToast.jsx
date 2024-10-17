import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../features/toastSlice";
// import { setMessage, setShowToast } from "../features/cart";
// import {setShowToastProfile, setMessageProfile} from '../features/profile';

const cartToast = () => {

    const dispatch = useDispatch();
    // const cart = useSelector(state => state.cart);
    // const profile = useSelector(state => state.profile);
    const toast = useSelector(state => state.toast);
    // const showToast = useSelector(state => state.cart.showToast);
    // const message = useSelector(state => state.cart.toastMessage);

    useEffect(() => {
        const timer = setTimeout(() => {
            const message = ''
        dispatch(showToast({showToast: false, message: message}));
        console.log("2 sek");
        }
        , 2000);

        return () => clearTimeout(timer)
    },[toast.showToast]);

    return ( 
        <div>
            {toast.message}
        </div>
     );
}
 
export default cartToast;