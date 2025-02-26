import { useState } from "react";
import axios from "axios";
import { API } from "../Api/Api";
import { getAuthHeader } from "../Auth/getAuthHeader";
import { useNavigate } from "react-router-dom";
import sweetalert from "../utils/sweetalert";
import { showToast } from "../utils/showToast";
const useUserHook = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(0);

  const Navigate = useNavigate();

  const getAllUsers = async (conditions) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API.showUsers}${conditions}`,
        getAuthHeader()
      );
      setUsers(response.data.data);
      setTotalUsers(response.data.totalDocuments);
      //   console.log(response.data);
    } catch (error) {
      console.log("Error fetching users: ", error);
    } finally {
      setLoading(false);
    }
  };

  const [runUseEffect, setRunUseEffect] = useState(0);
  const deleteUser = async (id) => {
    const result = await sweetalert.deleteOrNot();
    if (result.isConfirmed) {
      try {
        await axios.delete(`${API.deleteUser}/${id}`, getAuthHeader());
        setRunUseEffect(runUseEffect + 1);
        showToast("success", "User deleted successfully");
      } catch (error) {
        console.log("Error => " + error);
        sweetalert.deletedError();
      }
    }
  };

  const addNewUser = async (formUserDate, setLoading) => {
    try {
      const response = await axios.post(
        `${API.createUser}`,
        formUserDate,
        getAuthHeader()
      );
      console.log(response);
      Navigate("/user/usersList");
    } catch (error) {
      console.log("Error : ", error);
      if (error.response.status === 400) {
        setEmailError("The data entered is incorrect, please try again");
      } else if (error.response.status === 422) {
        setEmailError("The email has already been taken");
      }
    } finally {
      setLoading(false);
    }
  };

  const getUser = async (id, setForm) => {
    try {
      const response = await axios.get(`${API.getUser}/${id}`, getAuthHeader());
      setForm({
        name: response.data.data.name,
        email: response.data.data.email,
        role: response.data.data.role,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (id, formUserDate, setLoading) => {
    try {
      const response = await axios.put(
        `${API.updateUser}/${id}`,
        formUserDate,
        getAuthHeader()
      );
      console.log(response);
      Navigate("/user/usersList");
    } catch (error) {
      console.log("Error : ", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    users,
    totalUsers,
    getAllUsers,
    loading,
    deleteUser,
    runUseEffect,
    addNewUser,
    getUser,
    updateUser,
  };
};

export default useUserHook;
