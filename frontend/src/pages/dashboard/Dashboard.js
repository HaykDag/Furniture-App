import Header from "../../components/Header/Header";
import './dashboard.css'
import SideMenu from "../../components/SideMenu/SideMenu";
import Content from "../../components/Content/Content";


const Dashboard = ()=>{

    return (
        <div className="dashboard">
            <Header />
            <div className="dash-body">
                <SideMenu />
                <Content />
            </div>
        </div>
    )
}

export default Dashboard;


