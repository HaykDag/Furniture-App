import "./sideMenu.css";
import { Menu } from "antd";
import {
  PlusCircleOutlined,
  ShopFilled,
  AppstoreOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const SideMenu = () => {
  const navigate = useNavigate();

  const getItem = (label, key, icon, children, type)=> {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  return (
    
    <div className="sideMenu">
    <Menu
      onClick={(item)=>{
        navigate(item.key)
      }}
      items={[
        {
          label: "Dashboard",
          icon: <AppstoreOutlined />,
          key: "/admin",
        },
        {
          label: "Store",
          icon: <ShopFilled />,
          key: "/admin/store",
        },
        {
          label: "Add an item",
          icon: <PlusCircleOutlined />,
          key: "/admin/Add",
        },
        getItem('ADMINS', 'sub4', <UserOutlined />, [
          getItem('Option 9', '9'),
          getItem('Option 10', '10'),
          getItem('Option 11', '11'),
          getItem('Option 12', '12'),
        ]),
        {
          label: "Add ADMIN",
          icon: <UserAddOutlined /> ,
          key: "/admin/signup",
        },
      ]}
    />
    </div>
  );
};

export default SideMenu;
