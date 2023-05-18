import Header from "../../components/Header/Header";
import './dashboard.css'
import SideMenu from "../../components/SideMenu/SideMenu";
import Content from "../../components/Content/Content";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdmin, selectAdmin } from "../../features/admin/adminSlice";
import { useEffect } from "react";
import { Spin } from 'antd';





const Dashboard = ()=>{

    const {status} = useSelector(selectAdmin)

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchAdmin())
    },[dispatch]);
    
    
    return (
        <div className="dashboard">
            <Header />
            <div className="dash-body">
                <SideMenu />
                {status==="LOADING" && <Spin />}
                {status==="ADMIN" && <Content />}
            </div>
        </div>
    )
}

export default Dashboard;


