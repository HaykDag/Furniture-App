//router
import {createBrowserRouter,createRoutesFromElements,Route} from "react-router-dom";
import { useEffect } from "react";
// import { useAuth } from "./useAuth";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, fetchUser } from "../features/users/usersSlice";

//pages
import HomeLayout from "../layouts/HomeLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Home from "../pages/Home";
import Dashboard from "../pages/dashboard/Dashboard";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import AddItem from "../pages/AddItem/AddItem";
import GetItems from "../pages/GetItems/GetItems";
import Details from "../pages/Details/Details";
import ItemDetails from "../pages/ItemDetails/ItemDetails";
import GetUsers from "../pages/GetUsers/GetUsers";
import NotFound from "../pages/NotFound/NotFound";

const MyRouter = () => {

    const { user } = useSelector(selectUser);
    const { userName, isAdmin } = user;
    
    //check if there is access-cookie as soon as loading
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>  
                <Route path="/" element={<HomeLayout />}>
                    <Route index element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Signup />} />
                    <Route path="items/:id" element={<ItemDetails />} />
                </Route>
                
                {/* if there is an Admin show the Dashboard, else if there is user show not found else show login page */}
                <Route path="admin" element={isAdmin ?<DashboardLayout />: userName ? <NotFound/> : <Login />}>
                    <Route index element={< Dashboard />} />
                    <Route path="add" element={<AddItem />}/>
                    <Route path="signup" element={<Signup />} />
                    <Route path="store/:id" element={<Details />} />
                    <Route path="store" element={<GetItems /> } />
                    <Route path="users" element={<GetUsers /> } />
                </Route>
                {/* <Route path="/items/:id" element={isAdmin ? <Details /> : userName ? <NotFound/> : <Login />} /> */}
                <Route path="*" element={<NotFound />} />
            </>
        )
    );
    return router;
};

export default MyRouter;
