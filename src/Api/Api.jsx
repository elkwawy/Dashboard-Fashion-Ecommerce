const BASE_URL = `https://ecommerce-dot-code.vercel.app/api`;

export const API = {
  /* ======= Authentication ======= */
  register: `${BASE_URL}/auth/register`,
  login: `${BASE_URL}/auth/login`,
  forgotPassword: `${BASE_URL}/auth/forgotPassword`,
  verifyResetCode: `${BASE_URL}/auth/verifyResetCode`,
  resetPassword: `${BASE_URL}/auth/resetPassword`,

  /* ======= User ======= */
  showUsers: `${BASE_URL}/user`,
  createUser: `${BASE_URL}/user`,
  deleteUser: `${BASE_URL}/user`,
  getUser: `${BASE_URL}/user`,
  updateUser: `${BASE_URL}/user`,
  getListOfUsers: `${BASE_URL}/user`,
  getLoggedUser: `${BASE_URL}/user/getMe`,
  /* ======= Category ======= */
  category: `${BASE_URL}/category`,
  
  /* ======= Product ======= */
  product: `${BASE_URL}/product`,
  /* ======= Orders ======= */
  showOrders: `${BASE_URL}/order/show`,
  createOrder: `${BASE_URL}/order/create`,
  getOrder: `${BASE_URL}/order/showbyid`,
  updateOrder: `${BASE_URL}/order/update`,
  deleteOrder: `${BASE_URL}/order/delete`,
};
