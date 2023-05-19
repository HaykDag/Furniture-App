//router
import { createBrowserRouter,createRoutesFromElements,Route} from "react-router-dom";
import { useEffect } from "react";
// import { useAuth } from "./useAuth";
import { useSelector, useDispatch } from "react-redux";
import { selectAdmin, fetchAdmin } from "../features/admin/adminSlice";

//pages
import Home from "../pages/Home";
import Dashboard from "../pages/dashboard/Dashboard";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import AddItem from "../pages/AddItem/AddItem";
import GetItems from "../pages/GetItems/GetItems";
import Details from "../pages/Details/Details";

const MyRouter = ()=>{
    
    
    const {userName}  = useSelector(selectAdmin)
    //check if there is access-cookie as soon as loading
  
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchAdmin())
    },[dispatch]);

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={userName?<Dashboard />:<Login/>} />
            <Route path="/admin/add" element={userName?<AddItem />:<Login/>} />
            <Route path="/admin/signup" element={userName?<Signup />:<Login/>} />
            <Route path="/admin/store" element={userName?<GetItems />:<Login/>}/>
            <Route path="/items/:id" element={userName?<Details/>:<Login/>} />
            </>
        )
    )
    return router;
}

export default MyRouter;