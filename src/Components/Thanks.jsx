import { useEffect } from "react";
import {useNavigate} from 'react-router-dom';

const Thanks = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/profile");
        }
        , 2000);

        return () => clearTimeout(timer)
    },[]);

    return ( 
        <div>
            <p>Thank you for buying a movie.</p>
        </div>
     );
}
 
export default Thanks;