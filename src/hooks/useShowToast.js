import { useCallback } from 'react';
import toast, { useToaster } from 'react-hot-toast'

const useShowToast = () => {
    const showToast = ((type, text) => { 
        toast("lol",{type, message: text})
    })

    return {showToast};
    
}

export default useShowToast