import "./getItems.css";
import { Table, Popconfirm, Button, Avatar, Form, Input, Tag } from "antd";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import defaultImage from "../../components/Card/chair.png";
import TextArea from "antd/es/input/TextArea";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useSelector, useDispatch } from 'react-redux'
import {
        updateItems,
        deleteItems, 
        fetchItems, 
        selectAllItems, 
        getItemsError, 
        getItemsStatus 
    } from "../../features/items/itemsSlice"

const GetItems = () => {
    
    const items = useSelector(selectAllItems)
    const itemsStatus = useSelector(getItemsStatus)
    //const error = useSelector(getItemsError) if I need 
  
    const dispatch = useDispatch();

    useEffect(()=>{
        if(itemsStatus==="idle"){
          dispatch(fetchItems())
        }
      },[itemsStatus,dispatch])

    //use these to mark the editing row and get the values
    const [editingRow, setEditingRow] = useState(null);
    const [form] = Form.useForm();

    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");
    const [searchTag,setSearchTag] = useState("");
    
    //change the _id to key in the data for the table
    const data = items?.map((item,i) => {
        return {...item, key: item._id };
    });
    
    const handleDelete = (record) => {
        dispatch(deleteItems(record._id))
    };

    const handleEdit = (values) => {
        dispatch(updateItems({id:editingRow,...values})).unwrap()
        setEditingRow(null)
    };
    
    const columns = [
        {
            title: "Thumbnail",
            dataIndex: "images",
            align: "center",
            render: (images,record) => {
                return (
                    <Avatar
                        src={images.length>0? images[0] : defaultImage}
                        style={{ width: "40px", height: "40px" }}
                    />
                );
            },
        },
        {
            title: "Title",
            dataIndex: "title",
            filteredValue:[searchText],
            onFilter: (value, record) => {
              return (
                record.title.toLowerCase().includes(value.toLowerCase()) || 
                record.description.toLowerCase().includes(value.toLowerCase())
              )
              },  
            render: (text, record) => {
                if (record.key === editingRow) {
                    return (
                      <Form.Item
                        name="title"
                        rules={[{required: true,message: "Please enter the Title."}]}
                      >
                        <Input></Input>
                      </Form.Item>
                    );
                }else{
                  return <p>{text}</p>;
                }
            },
        },
        {
            title: "Description",
            dataIndex: "description",
            render: (text, record) => {
                if (record.key === editingRow) {
                    return (
                        <Form.Item
                            name="description"
                            rules={[{required: true,message: "Please enter the description."}]}
                        >
                            <TextArea></TextArea>
                        </Form.Item>
                    );
                } else {
                    return <p>{text}</p>;
                }
            },
        },
        {
            title: "Price",
            dataIndex: "price",
            sorter: (a, b) => a.price - b.price,
            render: (text, record) => {
                if (record.key === editingRow) {
                    return (
                        <Form.Item
                            name="price"
                            rules={[{required: true,message: "Please enter the price."}]}
                        >
                            <Input></Input>
                        </Form.Item>
                    );
                }else{
                    return (<p>{Number(text).toLocaleString("en-US")} &#1423;</p>);
                }
            },
        },
        {
          title:"Tags",
          dataIndex:"tags",
          filteredValue:[searchTag],
          onFilter: (value, record) => {
            if(value==="") return record
            return record.tags?.join(",").toLowerCase().includes(value.toLowerCase())
            },
          render:(tags)=>{
              return <>
                {tags?.map((tag,index)=>{
                  return <Tag 
                            className="tags"
                            key={index} 
                            onClick={()=>setSearchTag(tag)}
                            style={{userSelect: "none", cursor:"pointer"}}
                        >{tag}</Tag>
                })}
             
             </>
          }
        },
        {
            title: "Created",
            dataIndex: "createdAt",
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
            render: (text, record) => {
                return (
                    <p>
                        {formatDistanceToNow(new Date(text), {
                            addSuffix: true,
                        })}
                    </p>
                );
            },
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (_, record) => {
                if (record.key === editingRow) {
                    return (
                        <>
                            <Button type="link" htmlType="submit">
                                Save
                            </Button>
                            <Button onClick={() => setEditingRow(null)}>
                                Cancel
                            </Button>
                        </>
                    );
                } else {
                    return (
                        <>
                            <Button
                                style={{ marginRight: "5px" }}
                                onClick={() => {
                                    setEditingRow(record.key);
                                    form.setFieldsValue({
                                        title: record.title,
                                        description: record.description,
                                        price: record.price,
                                    });
                                }}
                            >
                                Edit
                            </Button>
                            <Button
                                onClick={() => navigate(`/items/${record.key}`)}
                            >
                                Details
                            </Button>
                            <Popconfirm
                                title="Are you sure?"
                                onConfirm={() => handleDelete(record)}
                            >
                                <Button danger>Delete</Button>
                            </Popconfirm>
                        </>
                    );
                }
            },
        },
    ];

    return (
        <>
            <Header />
            <div className="table-cnt">
                <header className="table-header">
                    <Input.Search 
                      placeholder="Search..."
                      onChange={(e)=>setSearchText(e.target.value)} 
                    />
                    <Button onClick={()=>setSearchTag("")}>Reset tag</Button>
                </header>
                <Form form={form} onFinish={handleEdit}>
                    <Table
                        className="table"
                        pagination={{ position: ["bottomCenter"], pageSize: 5 }}
                        dataSource={data}
                        columns={columns}
                    />
                </Form>
            </div>
        </>
    );
};

export default GetItems;
