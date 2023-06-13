import { Avatar, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import defaultImage from "./user.jpg";
import ListView from "../../Shared/ListView";
import { AppUrl } from "../../components/AppData";

const GetUsers = () => {

    const navigate = useNavigate();
    
    const columns = [
        {
            title: "Thumbnail",
            //dataIndex: "images",
            align: "center",
            render: () => {
                return (
                    <Avatar
                        // src={images.length > 0 ? images[0] : defaultImage}
                        src={defaultImage}
                        style={{ width: "40px", height: "40px" }}
                    />
                );
            },
        },
        {
            title: "Name",
            dataIndex: "userName",
        },
        {
            title: "Shopping Cart",
            dataIndex: "basket",
            render: (items) => {
                return (
                    <>
                        {items?.map((id, index) => {
                            return (
                                <Tag
                                    className="tags"
                                    key={index}
                                    style={{
                                        userSelect: "none",
                                        cursor: "pointer",
                                    }}
                                    onClick={()=>navigate(`../../items/${id}`)}
                                >{id}</Tag>
                            );
                        })}
                    </>
                );
            },
        },
        {
            title: "Admin",
            dataIndex: "isAdmin",
            sorter: (a, b) => a.isAdmin - b.isAdmin,
            render: (_,record) => {
                return <p>{record.isAdmin ? "True" : "False"}</p>;
            },
        }
    ];

    return (

        <ListView
            getUrl = {AppUrl.users} 
            columns={columns}
        />
    );
};

export default GetUsers;
