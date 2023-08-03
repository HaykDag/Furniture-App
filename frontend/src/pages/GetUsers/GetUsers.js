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
            align: "center",
            render: () => {
                return (
                    <Avatar
                        src={defaultImage}
                        style={{ width: "40px", height: "40px" }}
                    />
                );
            },
        },
        {
            title: "Name",
            dataIndex: "username",
        },
        {
            title: "Shopping Cart",
            dataIndex: "basket",
            render: (items) => {
                return (
                    <div className="tags-cnt">
                        {items?.map((item) => {
                            return (
                                <Tag
                                    className="tags"
                                    key={item.id}
                                    style={{
                                        userSelect: "none",
                                        cursor: "pointer",
                                    }}
                                    onClick={() =>
                                        navigate(`../store/${item.id}`)
                                    }
                                >
                                    {item.title}
                                </Tag>
                            );
                        })}
                    </div>
                );
            },
        },
        {
            title: "Orders",
            dataIndex: "orders",
            render: (orders) => {
                return (
                    <div className="tags-cnt">
                        {orders?.map((item, i) => {
                            return (
                                <Tag
                                    className="tags"
                                    key={i}
                                    style={{
                                        userSelect: "none",
                                        cursor: "pointer",
                                    }}
                                    onClick={() =>
                                        navigate(`../orders/${item.order_id}`)
                                    }
                                >
                                    {item.title}
                                </Tag>
                            );
                        })}
                    </div>
                );
            },
        },
        {
            title: "Admin",
            dataIndex: "isAdmin",
            sorter: (a, b) => a.isAdmin - b.isAdmin,
            render: (_, record) => {
                return <p>{record.isAdmin ? "True" : "False"}</p>;
            },
        },
    ];

    return (
        <ListView
            getUrl={AppUrl.Users.base}
            deleteUrl={AppUrl.Users.base}
            columns={columns}
        />
    );
};

export default GetUsers;
