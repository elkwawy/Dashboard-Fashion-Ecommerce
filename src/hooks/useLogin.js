import { useDispatch } from "react-redux";
import { loginUser } from "../redux/slices/userSlice";
import useShowToast from "./useShowToast";

const useLogin = () => {
    const {showToast} = useShowToast(); 
    const dispatch = useDispatch();
    const login = async (email, password, remember) => { 
        try {
            // Store the token - call API 
            dispatch(loginUser({email, password, remember}));
            
        } catch (err) {
            showToast("error", err);
        } 
        
        
    }
    return {login};
}

export default useLogin