import toast from 'react-hot-toast';

export const showToast = ((type, text) => { 
    toast(text,{type})
})