import { useState } from "react";
import axios from "axios";
import { API } from "../Api/Api";
import { getAuthHeader } from "../Auth/getAuthHeader";
import { useNavigate } from "react-router-dom";
import sweetalert from "../utils/sweetalert";

const useCategoryHook = () => {
  const [categories, setCategories] = useState([]);
  const Navigate = useNavigate();

  const getAllCategories = async (conditions) => {
    try {
      const response = await axios.get(
        `${API.showCategories}${conditions}`,
        getAuthHeader()
      );
      setCategories(response.data.data);
      console.log(response.data);
    } catch (error) {
      console.log("Error fetching categories: ", error);
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

  return { categories, getAllCategories, deleteCategory };
};

export default useCategoryHook;
