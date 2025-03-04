import React, { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Loader from "./utils/Loader";
import AddOrUpdateProduct from "./pages/products/AddOrUpdateProduct";

import UsersList from "./pages/Users/UsersList";
import AddUser from "./pages/Users/AddUser";
import UpdataUser from "./pages/Users/UpdateUser";

import AllCategory from "./pages/Categories/AllCategory";
import AddNewCategory from "./pages/Categories/AddNewCategory";
import UpdateCategory from "./pages/Categories/UpdateCategory";

import SubCategory from "./pages/SubCategory/SubCategory";
import AddNewSub from "./pages/SubCategory/AddNewSub";
import UpdateSubCat from "./pages/SubCategory/UpdateSubCat";
import Orders from "./pages/Orders/Orders";
import OrderDetails from "./pages/Orders/OrderDetails";
import Dashboard from './pages/Dashboard';
import AdminList from './pages/admin/AdminList';
import AddNewAdmin from './pages/admin/AddNewAdmin';
import NotFound from './pages/NotFound';
import Login from "./Auth/Login";
import SubcategoryProducts from "./pages/SubCategory/SubcategoryProductsPage/SubcategoryProducts.jsx";
const Products  = React.lazy(() => import("./pages/Products/Products.jsx"));



// add routes here
const routes = [
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/admin/adminList", element: <AdminList /> },
  { path: "/admin/newAdmin", element: <AddNewAdmin /> },
  { path: "/products/products", element:<Suspense fallback={<div className="w-full h-full flex items-center justify-center bg-white rounded-md"><Loader/></div>}>
    <Products />
  </Suspense>},
  { path: "/products/newProduct", element: <AddOrUpdateProduct /> },
  { path: "/products/updateProduct", element: <AddOrUpdateProduct /> },
  { path: "/user/usersList", element: <UsersList /> },
  { path: "/user/newUser", element: <AddUser /> },
  { path: "/user/updateUser/:id", element: <UpdataUser /> },
  { path: "/allcategories", element: <AllCategory /> },
  { path: "/addNewCategory", element: <AddNewCategory /> },
  { path: `/cattegory/updatCategory`, element: <UpdateCategory /> },
  { path: `/categories/:categoryName/:id`, element: <SubCategory /> },
  { path: "/categories/:categoryName/AddNewsubact/:id", element: <AddNewSub /> },
  { path: "/subcat/updatsubact",element: <UpdateSubCat /> },
  { path: "/order/orderList", element: <Orders /> },
  {path :"/order/orderDetails/:id",element: <OrderDetails/>},
  { path: `/categories/:categoryName/:subcatName/:id`, element: <SubcategoryProducts /> },
  { path: "*", element: <NotFound /> },
];



const Router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />
      {
        <Route element={<RootLayout />}>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      }
    </>
  )
);

const App = () => {
  return (
    <>
      <RouterProvider router={Router} />
      <Toaster />
    </>
  );
};

export default App;
