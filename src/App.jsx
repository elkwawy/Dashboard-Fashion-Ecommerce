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


import Products from "./pages/products/Products";
import AddOrUpdateProduct from "./pages/products/AddOrUpdateProduct";

const Dashboard = React.lazy(() => import("./pages/Dashboard"));

const UsersList = React.lazy(() => import("./pages/Users/UsersList"));
const AddUser = React.lazy(() => import("./pages/Users/AddUser"));
const UpdataUser = React.lazy(() => import("./pages/Users/UpdateUser"));

const AdminList = React.lazy(() => import("./pages/admin/AdminList"));
const AddNewAdmin = React.lazy(() => import("./pages/admin/AddNewAdmin"));

const NotFound = React.lazy(() => import("./pages/NotFound"));
const Login = React.lazy(() => import("./Auth/Login"));


import AllCategory from './pages/Categories/AllCategory';
import AddNewCategory from './pages/Categories/AddNewCategory';
import UpdateCategory from './pages/Categories/UpdateCategory';

import SubCategory from './pages/SubCategory/SubCategory';
import AddNewSub from './pages/SubCategory/AddNewSub';
import UpdateSubCat from './pages/SubCategory/UpdateSubCat';
import Orders from "./pages/Orders/Orders";

// add routes here
const routes = [
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/admin/adminList", element: <AdminList /> },
  { path: "/admin/newAdmin", element: <AddNewAdmin /> },
  { path: "/products/products", element: <Products /> },
  { path: "/products/newProduct", element: <AddOrUpdateProduct /> },
  { path: "/products/updateProduct", element: <AddOrUpdateProduct /> },
  { path: "/user/usersList", element: <UsersList /> },
  { path: "/user/newUser", element: <AddUser /> },
  { path: "/user/updateUser/:id", element: <UpdataUser /> },
  {path:'/allcategories', element:<AllCategory/>},
  {path:"/addNewCategory",element:<AddNewCategory/>},
  {path:`/cattegory/updatCategory/:id`,element:<UpdateCategory/>},
  {path:`/categories/:categoryName/:id`,element:<SubCategory/>},
  {path:'/subcat/AddNewsubact/:id',element:<AddNewSub/>},
  {path:`/subcat/updatsubact/:id`,element:<UpdateSubCat/>},
  {path:'/order/orderList',element:<Orders/>},
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
    <Suspense
      fallback={
        <div className="w-full h-[100vh]  flex items-center justify-center">
          <Loader />
        </div>
      }
    >
      <RouterProvider router={Router} />

      <Toaster />
    </Suspense>
  );
};

export default App;
