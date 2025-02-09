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
  getListOfUsers : `${BASE_URL}/user`,
  getLoggedUser : `${BASE_URL}/user/getMe`,
  /* ======= Category ======= */
  showCategories: `${BASE_URL}/category`,
  createCategory: `${BASE_URL}/category`,
  deleteCategory: `${BASE_URL}/category`,
  getCategory: `${BASE_URL}/category`,
  updateCategory: `${BASE_URL}/category`,
  addNewCategory: `${BASE_URL}/category`,

  // sub category
   
  showSubCategories: `${BASE_URL}/subcategory`,
  createSubCategory: `${BASE_URL}/subcategory`,
  deleteSubCategory: `${BASE_URL}/subcategory`,
  getSubCategory: `${BASE_URL}/subcategory`,
  updateSubCategory: `${BASE_URL}/subcategory`,
  addNewSubCategory: `${BASE_URL}/subcategory`,
  /* ======= Product ======= */
  showProducts: `${BASE_URL}/product/show`,
  createProduct: `${BASE_URL}/product/create`,
  getProduct: `${BASE_URL}/product/showbyid`,
  updateProduct: `${BASE_URL}/product/update`,
  deleteProduct: `${BASE_URL}/product/delete`,
  /* ======= Orders ======= */
  showOrders: `${BASE_URL}/order/show`,
  createOrder: `${BASE_URL}/order/create`,
  getOrder: `${BASE_URL}/order/showbyid`,
  updateOrder: `${BASE_URL}/order/update`,
  deleteOrder: `${BASE_URL}/order/delete`,
};
