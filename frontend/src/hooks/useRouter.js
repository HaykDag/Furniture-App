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
import Home from "../pages/Home";
import Dashboard from "../pages/dashboard/Dashboard";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import AddItem from "../pages/AddItem/AddItem";
import GetItems from "../pages/GetItems/GetItems";
import Details from "../pages/Details/Details";
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
                <Route path="/" element={<Home />} />
                <Route
                    path="/admin"
                    // if there is an Admin show the Dashboard, else if there is user show not found else show login page
                    element={isAdmin ? <Dashboard /> : userName ? <NotFound/> : <Login />}
                />
                <Route
                    path="/admin/add"
                    element={isAdmin ? <AddItem /> : userName ? <NotFound/> : <Login />}
                />
                <Route
                    path="/admin/signup"
                    element={isAdmin ? <Signup /> : userName ? <NotFound/> : <Login />}
                />
                <Route
                    path="/admin/store"
                    element={isAdmin ? <GetItems /> : userName ? <NotFound/> : <Login />}
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Signup />} />
                <Route
                    path="/items/:id"
                    element={isAdmin ? <Details /> : <Login />}
                />
            </>
        )
    );
    return router;
};

export default MyRouter;
