import Cookies from 'js-cookie';
import React, { Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getCurrentUser } from '../redux/slices/userSlice';
import ScrollToTop from '../utils/ScrollToTop';

import Sidebar from '../components/sidebar/Sidebar';
import  PathTracker from '../components/sidebar/PathTracker';

const RootLayout = ((auth) => {
    
    //                 sidebar open in large screens and close in small screens
    const [sidebar, setSidebar] = useState(window.innerWidth > 700);
    
    const dispatch = useDispatch();
    const userToken = Cookies.get('token');

    const { user, status, error } = useSelector((state) => state.user);

    // Fetch user data on initial load if a token exists
    useEffect(() => {
        if (auth) {
            dispatch(getCurrentUser(JSON.parse(userToken)));
        }
    }, [dispatch, auth]);

    // Handle authentication
    if (!auth) {
        return <Navigate to="/" replace />;
    }

    // Handle error state
    // if (status === 'failed' && error) {
    //     return (
    //         <div className="w-full h-screen bg-white flex flex-col items-center justify-center gap-5">
    //             <p className="font-bold text-xl">{error}</p>
    //             <button
    //                 onClick={() => window.location.reload()}
    //                 className="px-3 py-2 rounded-md text-white bg-main-color hover:bg-blue-600"
    //             >
    //                 Try Again
    //             </button>
    //         </div>
    //     );
    // }

    // Component rendering
    return (
        <div className="w-full flex h-screen overflow-hidden">
            <ScrollToTop />
            <Sidebar
                sidebar={sidebar}
                closeSidebar={() => setSidebar(false)}
            />
            <div className="flex w-full flex-col">
                <Navbar sidebar={sidebar} openSidebar={() => setSidebar(true)} />
                <div className="flex flex-col gap-5 w-full pt-5 h-screen bg-background-color overflow-y-auto openPageDiv">
                    <PathTracker  />
                    <div id='scroll-container' className="px-2 min-[300px]:px-5 w-full h-full">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
});

export default RootLayout;