import { useDispatch } from 'react-redux';
import { addNewAdmin, updateAdmin } from '../redux/slices/adminsSlice';
import useShowToast from './useShowToast';

const useAdmin = () => {
    const dispatch = useDispatch();
    const {showToast} = useShowToast();
    const addAnAdmin = async (name, email, password, passwordConfirm ) => { 
        try {
            const res = await dispatch(
                addNewAdmin({ name, email, password, passwordConfirm })
            ).unwrap();

            // Show success message if admin creation is successful
            if (res && res.name) {
                showToast("success", "Admin added successfully");
            }
        } catch (error) {
            // Show error message from thunk rejection
            showToast("error", error || "An unexpected error occurred");
        }
    }
    const updateOldAdmin = async (id, name, email, currentUser) => { 
        try {
            const result = await dispatch(updateAdmin({ id, name, email, currentUser })).unwrap();

            // Show a success toast if the update is successful
            if (result) {
                showToast("success", `Admin ${result.name} updated successfully!`);
            }
        } catch (error) {
            // Handle rejected value or error and show an error toast
            showToast("error", error || "Failed to update admin.");
        }
    };
    return {addAnAdmin, updateOldAdmin};
}

export default useAdmin