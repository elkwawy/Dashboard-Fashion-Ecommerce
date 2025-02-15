import { useState } from "react";
import axios from "axios";
import { API } from "../Api/Api";
import { getAuthHeader } from "../Auth/getAuthHeader";
import { useNavigate } from "react-router-dom";
import sweetalert from "../utils/sweetalert";

const useCategoryHook = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true)
  const Navigate = useNavigate();

  const getAllCategories = async (conditions) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API.category}${conditions}`,
        getAuthHeader()
      );
      setCategories(response.data.data);
      console.log(response.data);
    } catch (error) {
      setLoading(false);
      console.log("Error fetching categories: ", error);
    } finally { 
      setLoading(false);
    }
  };

  const deleteCategory = async (id) => {
    const result = await sweetalert.deleteOrNot();
    if (result.isConfirmed) {
      try {
        await axios.delete(`${API.deleteCategory}/${id}`, getAuthHeader());
        sweetalert.deletedDone("category");
      } catch (error) {
        console.log("Error => " + error);
        sweetalert.deletedError();
      }
    }
  };

  return { categories, loading , getAllCategories, deleteCategory };
};

export default useCategoryHook;
