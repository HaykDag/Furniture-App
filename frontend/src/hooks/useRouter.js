//router
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { useEffect } from "react";
// import { useAuth } from "./useAuth";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, fetchUser } from "../features/users/usersSlice";

//pages
import HomeLayout from "../layouts/HomeLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Home from "../pages/Home/Home";
import SingleItem from "../pages/SingleItem/SingleItem";
import Dashboard from "../pages/dashboard/Dashboard";
import Category from "../pages/Category";
import AdminChat from "../pages/AdminChat/AdminChat";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import AddItem from "../pages/AddItem/AddItem";
import GetItems from "../pages/GetItems/GetItems";
import Orders from "../pages/Orders/Orders";
import Details from "../pages/Details/Details";
import GetUsers from "../pages/GetUsers/GetUsers";
import NotFound from "../pages/NotFound/NotFound";
import OrderDetails from "../pages/OrderDetails/OrderDetails";

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
                    <Route
                        path="register"
                        element={userName ? <Home /> : <Signup />}
                    />
                    <Route path="items/:id" element={<SingleItem />} />
                </Route>

                {/* if there is an Admin show the Dashboard, else if there is user show not found else show login page */}
                <Route
                    path="admin"
                    element={
                        isAdmin ? (
                            <DashboardLayout />
                        ) : userName ? (
                            <NotFound />
                        ) : (
                            <Login />
                        )
                    }
                >
                    <Route index element={<Dashboard />} />
                    <Route path="add" element={<AddItem />} />
                    <Route path="signup" element={<Signup />} />
                    <Route path="store/:id" element={<Details />} />
                    <Route path="store" element={<GetItems />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="orders/:id" element={<OrderDetails />} />
                    <Route path="category" element={<Category />} />
                    <Route path="users" element={<GetUsers />} />
                    <Route path="chat" element={<AdminChat />} />
                </Route>
                {/* <Route path="/items/:id" element={isAdmin ? <Details /> : userName ? <NotFound/> : <Login />} /> */}
                <Route path="*" element={<NotFound />} />
            </>
        )
    );
    return router;
};

export default MyRouter;
