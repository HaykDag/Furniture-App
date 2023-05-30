import "./getUsers.css";
import { Table, Popconfirm, Button, Avatar, Input, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import defaultImage from "./user.jpg";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, selectAllUsers } from "../../features/users/usersSlice";

const GetUsers = () => {

    const dispatch = useDispatch();
    const users = useSelector(selectAllUsers);
    
    useEffect(() => {
        //dispatch and fetch all the users
        dispatch(fetchUsers());
    }, [dispatch]);
    
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");

    //change the _id to key in the data for the table
    const data = users?.map((user) => {
        return { ...user, key: user._id };
    });

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
            filteredValue: [searchText],
            onFilter: (value, record) => {
                return record.userName
                    .toLowerCase()
                    .includes(value.toLowerCase());
            },
            render: (text) => {
                return <p>{text}</p>;
            },
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
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (_, record) => {
                return (
                    <Popconfirm
                        title="Are you sure?"
                        onConfirm={() => console.log(`${record.userName}-blocked`)}
                    >
                        <Button danger>Block</Button>
                    </Popconfirm>
                );
            },
        },
    ];

    return (
        <div className="table-cnt">
            <header className="table-header">
                <Input.Search
                    autoFocus
                    placeholder="Search..."
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </header>
            <Table
                className="table"
                pagination={{ position: ["bottomCenter"], pageSize: 5 }}
                dataSource={data}
                columns={columns}
            />
        </div>
    );
};

export default GetUsers;
