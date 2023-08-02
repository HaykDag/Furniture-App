//use this form to add a new Item or edit an existing one.
import "./index.css";
import { Button, Form, Image, Input, InputNumber, Select, Upload } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addItem, updateItem } from "../../features/items/itemsSlice";
import { useNavigate } from "react-router-dom";
import { AppUrl } from "../../components/AppData";
import { updateOrder } from "../../features/orders/ordersSlice";

const ItemForm = (props) => {
    const { data, daddy } = props;
    console.log(data);
    const [imageData, setImageData] = useState(null);
    const title = data?.title;
    const description = data?.description;
    const price = data?.price;
    const tags = data?.tags || [];
    const orderStatus = data?.order_status;
    const orderStatusOptions = ["pending", "agreed", "finished"];
    const paymentStatus = data?.payment_status;
    const paymentStatusOptions = ["expected", "done"];
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [tagOptions, setTagOptions] = useState([]);
    const getCategories = () => {
        axios.get(AppUrl.Categories).then((res) => {
            setTagOptions(res.data.result);
        });
    };
    let Itemtags = [];
    const images = data?.images.split(",");
    if (daddy !== "OrderDetails") {
        Itemtags = data?.tags.split(",");
    }

    useEffect(() => {
        getCategories();
    }, []);

    const handleChange = (e) => {
        setImageData(e.target.files[0]);
    };

    const handleSubmit = async (values) => {
        let imgUrl = null;
        let imgId = "";
        if (imageData && daddy !== "OrderDetails") {
            const formData = new FormData();
            formData.append("upload_preset", "segebppr");
            formData.append("file", imageData);
            try {
                const response = await axios.post(
                    AppUrl.Cloudinary_upload,
                    formData,
                    { withCredentials: false }
                );

                imgId = response.data.public_id;
                imgUrl = response.data.url;
            } catch (err) {
                console.log(err);
            }
        }
        if (imgUrl || daddy === "OrderDetails") {
            let tagIds = [];
            if (daddy !== "OrderDetails") {
                for (let t of values.tags) {
                    for (let opt of tagOptions) {
                        if (t === opt.title) {
                            tagIds.push(opt.id);
                        }
                    }
                }
            }
            try {
                if (daddy === "AddItem") {
                    const res = await axios.post(
                        AppUrl.Items,
                        { ...values, tagIds, imgUrl, imgId },
                        { withCredentials: true }
                    );
                    dispatch(addItem({ id: res.data, ...values }));
                } else if (daddy === "OrderDetails") {
                    const id = data.id;
                    const { orderStatus, paymentStatus } = values;
                    const res = await axios.put(
                        AppUrl.Orders + id,
                        {
                            order_status: orderStatus,
                            payment_status: paymentStatus,
                        },
                        { withCredentials: true }
                    );
                    dispatch(updateOrder({ id, orderStatus, paymentStatus }));
                } else {
                    await axios.put(AppUrl.Items + data.id, {
                        ...values,
                        tagIds,
                        imgUrl,
                        imgId,
                    });
                    dispatch(
                        updateItem({
                            id: data.id,
                            title,
                            description,
                            price,
                            tags,
                        })
                    );
                }
                setImageData(null);
                if (daddy === "OrderDetails") {
                    navigate("../");
                } else {
                    navigate("../store");
                }
            } catch (err) {
                console.log(err);
            }
        }
    };
    const handleDeleteImage = async (image_url) => {
        const item_id = data.id;
        const res = await axios.post(
            AppUrl.Images + "delete",
            { item_id, image_url },
            { withCredentials: true }
        );

        const images = data.images.filter((img) => img !== image_url);
        const newItem = {
            id: data.id,
            title,
            description,
            price,
            tags,
            images,
        };
        dispatch(updateItem(newItem));
    };
    return (
        <div className="details-cnt">
            {daddy === "OrderDetails" && (
                <div className="orderDetails-header">
                    <p>Order id: {data.id}</p>
                    <p>
                        User id:{data.user_id} username:{data.username}
                    </p>
                    <p>Item id:{data.item_id}</p>
                </div>
            )}
            <Form
                className="form"
                onFinish={handleSubmit}
                initialValues={{
                    tags: Itemtags,
                    title: title,
                    description: description,
                    price: price,
                    orderStatus: orderStatus,
                    paymentStatus: paymentStatus,
                }}
            >
                {daddy === "OrderDetails" && (
                    <>
                        <Form.Item
                            style={{
                                width: 200,
                                marginBottom: 10,
                                userSelect: "none",
                            }}
                            value={orderStatus}
                            name="orderStatus"
                            rules={[{ type: "string" }]}
                            label="order status"
                        >
                            <Select
                                name="orderStatus"
                                placeholder="order status"
                            >
                                {orderStatusOptions.map((status, i) => (
                                    <Select.Option key={i} value={status}>
                                        {status}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            style={{
                                width: 200,
                                marginBottom: 10,
                                userSelect: "none",
                            }}
                            value={paymentStatus}
                            name="paymentStatus"
                            rules={[{ type: "string" }]}
                            label="payment status"
                        >
                            <Select
                                name="paymentStatus"
                                placeholder="payment status"
                            >
                                {paymentStatusOptions.map((status, i) => (
                                    <Select.Option key={i} value={status}>
                                        {status}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </>
                )}
                <Form.Item name="title">
                    <Input
                        disabled={daddy === "OrderDetails"}
                        name="title"
                        placeholder="Title"
                        value={title}
                    />
                </Form.Item>
                {daddy !== "OrderDetails" && (
                    <Form.Item
                        style={{
                            width: 200,
                            marginBottom: 10,
                            userSelect: "none",
                        }}
                        value={tags}
                        name="tags"
                        rules={[{ type: "array" }]}
                    >
                        <Select
                            name="tags"
                            mode="multiple"
                            placeholder="Select tags"
                        >
                            {tagOptions.map((tag) => (
                                <Select.Option key={tag.id} value={tag.title}>
                                    {tag.title}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                )}
                <Form.Item name="price">
                    <InputNumber
                        disabled={daddy === "OrderDetails"}
                        name="price"
                        placeholder="price"
                        value={price}
                    />
                </Form.Item>
                <Form.Item name="description">
                    <TextArea
                        disabled={daddy === "OrderDetails"}
                        name="description"
                        placeholder="description"
                        cols={30}
                        rows={6}
                        value={description}
                    />
                </Form.Item>
                {daddy !== "OrderDetails" && (
                    <Form.Item valuePropName="image" onChange={handleChange}>
                        <Upload action={false} listType="picture-card">
                            <div className="upload-cnt">
                                <PlusOutlined />
                                <div>Upload</div>
                            </div>
                        </Upload>
                    </Form.Item>
                )}
                {daddy !== "AddItem" && (
                    <div className="img-cnt">
                        <Image.PreviewGroup>
                            {images?.map((imgUrl, i) => (
                                <div key={i} className="img-btn-cnt">
                                    <Image className="pic" src={imgUrl} />
                                    {daddy !== "OrderDetails" && (
                                        <DeleteOutlined
                                            className="delete-btn"
                                            onClick={() =>
                                                handleDeleteImage(imgUrl)
                                            }
                                        />
                                    )}
                                </div>
                            ))}
                        </Image.PreviewGroup>
                    </div>
                )}
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ItemForm;
