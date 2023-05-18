//router
import { createBrowserRouter,createRoutesFromElements,Route} from "react-router-dom";

//context
import { useAuth } from "./useAuth";

//pages
import Home from "../pages/Home";
import Dashboard from "../pages/dashboard/Dashboard";
import Login from "../pages/Login/Login";
import AddItem from "../pages/AddItem/AddItem";
import GetItems from "../pages/GetItems/GetItems";
import Details from "../pages/Details/Details";

const MyRouter = ()=>{
    
    // const admin = useContext(AdminContext);
    const {userName}  = useAuth()
    
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={userName?<Dashboard />:<Login/>} />
            <Route path="/admin/add" element={userName?<AddItem />:<Login/>} />
            <Route path="/admin/store" element={userName?<GetItems />:<Login/>}/>
            <Route path="/items/:id" element={userName?<Details/>:<Login/>} />
            </>
        )
    )
    return router;
}

export default MyRouter;