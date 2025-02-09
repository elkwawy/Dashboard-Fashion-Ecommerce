import Cookies from 'js-cookie';
import React, { Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from 'react-redux';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import { getCurrentUser } from './redux/slices/userSlice';
import Loader from "./utils/Loader";

import Products from './pages/Products/Products';
import AddProduct from './pages/AddProduct/AddProduct';
import SubCategory from './pages/SubCategory/SubCategory';
import UpdateSubCat from './pages/SubCategory/UpdateSubCat';
import AddNewSub from './pages/SubCategory/AddNewSub';
import AllCategory from './pages/Categories/AllCategory';
import UpdateCategory from './pages/Categories/UpdateCategory';
import AddNewCategory from './pages/Categories/AddNewCategory';


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
  {path:'/allcategories', element:<AllCategory/>},
  {path:`/categories/:categoryName/:id`,element:<SubCategory/>},
  {path:`/cattegory/updatCategory/:id`,element:<UpdateCategory/>},
  {path:"/addNewCategory",element:<AddNewCategory/>},
  {path:`/subcat/updatsubact/:id`,element:<UpdateSubCat/>},
  {path:'/subcat/AddNewsubact/:id',element:<AddNewSub/>},
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

  const dispatch = useDispatch();
  // if the user reload his data isn't removed
  useEffect(() => {
    const userToken = Cookies.get('token');
    
    if (userToken) {
      dispatch(getCurrentUser(JSON.parse(userToken)));
    }
  }, [dispatch]);

  
  
  return (
    <Suspense fallback={<div className="w-full h-[calc(100vh-82px)] translate-y-[82px] flex items-center justify-center"><Loader /></div>}>
      
        <RouterProvider router={Router} />
      
        <Toaster />
    </Suspense>
  )
}

export default App