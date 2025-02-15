import { useState } from "react";
import axios from "axios";
import { API } from "../../Api/Api";
import { getAuthHeader } from "../../Auth/getAuthHeader";
import { showToast } from "../../utils/showToast";
import { useNavigate } from "react-router-dom";
const useProductsHook = () => {
  const Navigate = useNavigate();

  const addProduct = async (productData, setLoading) => {
    setLoading(true);
    try {
      const formData = new FormData();

      // FormData إضافة كل القيم إلى الـ
      for (const key in productData) {
        if (key === "images") {
          productData.images.forEach((file) => formData.append("images", file));
        } else {
          formData.append(key, productData[key]);
        }
      }

      const response = await axios.post(API.product, formData, getAuthHeader());
      Navigate("/products/products");

      console.log(response.data);
      showToast("success", response.data.message);

      return response.data;
    } catch (err) {
      showToast("error", err.response.data.message);
      console.error("Error adding product:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (productId, productData, setLoading) => {
    setLoading(true);
    try {
      const formData = new FormData();
  
      for (const key in productData) {
        if (key === "images") {
          productData.images.forEach((file) => {
            if (file instanceof File) {
              formData.append("images", file);
            }
          });
        } else {
          formData.append(key, productData[key]);
        }
      }
  
      // إرسال الصورة القديمة لو المستخدم لم يرفع صورة جديدة
      if (!productData.images || productData.images.length === 0) {
        formData.append("image", productData.image);
      }
  
      const response = await axios.put(
        `${API.product}/${productId}`,
        formData,
        getAuthHeader()
      );
  
      showToast("success", response.data.message);
      Navigate("/products/products");
  
      return response.data;
    } catch (err) {
      showToast(
        "error",
        err.response?.data?.message || "Error updating product"
      );
      console.error("Error updating product:", err);
    } finally {
      setLoading(false);
    }
  };
  
  return { addProduct, updateProduct };
};

export default useProductsHook;
