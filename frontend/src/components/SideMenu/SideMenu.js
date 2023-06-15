import "./sideMenu.css";
import { Menu } from "antd";
import {
  PlusCircleOutlined,
  ShopFilled,
  AppstoreOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
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
        {
          label: "Users",
          icon: <UsergroupAddOutlined /> ,
          key: "/admin/users",
        },
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
