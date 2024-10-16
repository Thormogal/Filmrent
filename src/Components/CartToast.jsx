import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowToast } from "../features/cart";

const cartToast = () => {

    const dispatch = useDispatch();
    const showToast = useSelector(state => state.cart.showToast);
    const message = useSelector(state => state.cart.toastMessage);

    useEffect(() => {
        const timer = setTimeout(() => {
        dispatch(setShowToast(false));
        console.log("2 sek");
        }
        , 2000);

        return () => clearTimeout(timer)
    },[showToast]);

    return ( 
        <div>
            {message}
        </div>
     );
}
 
export default cartToast;