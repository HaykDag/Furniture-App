import "./sideMenu.css";
import { Menu } from "antd";
import {
  PlusCircleOutlined,
  ShopFilled,
  AppstoreOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const SideMenu = () => {
  const navigate = useNavigate();

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
      ]}
    />
    </div>
  );
};

export default SideMenu;
