import React, { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Loader from "./utils/Loader";

import AddProduct from './pages/AddProduct/AddProduct';
import Products from './pages/Products/Products';


const Dashboard = React.lazy(() => import("./pages/Dashboard"));

const UsersList = React.lazy(() => import("./pages/Users/UsersList"));
const AddUser = React.lazy(() => import("./pages/Users/AddUser"));


const AdminList = React.lazy(() => import("./pages/admin/AdminList"));
const AddNewAdmin = React.lazy(() => import("./pages/admin/AddNewAdmin"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Login = React.lazy(() => import("./Auth/Login"));



// add routes here
const routes = [ 
  {path:'/dashboard', element:<Dashboard/>},
  {path:'/admin/adminList', element:<AdminList/>},
  {path:'/admin/newAdmin', element:<AddNewAdmin/>},
  {path:'/products/products', element:<Products/>},
  {path:'/products/newProduct', element:<AddProduct/>},
  {path:'/user/usersList', element:<UsersList/>},
  {path:'/user/newUser', element:<AddUser/>},
  {path:'*', element:<NotFound />},
];



const Router = createBrowserRouter(
  createRoutesFromElements(
      <>
        <Route path="/" element={<Login />} />
        {<Route  element={<RootLayout />}>
              {
                routes.map((route) => <Route key={route.path} path={route.path} element={route.element} />)
              }
        </Route>}
      </>
  )
)

const App = () => {
  return (
    <Suspense fallback={<div className="w-full h-[100vh]  flex items-center justify-center"><Loader /></div>}>
      
        <RouterProvider router={Router} />
      
        <Toaster />
    </Suspense>
  )
}

export default App