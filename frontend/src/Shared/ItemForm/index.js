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

const ItemForm = (props) => {
    const { data, isNew } = props;

    const [imageData, setImageData] = useState(null);
    const title = data?.title;
    const description = data?.description;
    const price = data?.price;
    const tags = data?.tags || [];

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [tagOptions, setTagOptions] = useState([]);
    const getCategories = () => {
        axios.get(AppUrl.Categories).then((res) => {
            setTagOptions(res.data.result);
        });
    };
    useEffect(() => {
        getCategories();
    }, []);

    const handleChange = (e) => {
        setImageData(e.target.files[0]);
    };

    const handleSubmit = async (values) => {
        let imgUrl = null;
        let imgId = "";
        if (imageData) {
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
        if (imgUrl) {
            let tagIds = [];
            for (let t of values.tags) {
                for (let opt of tagOptions) {
                    if (t === opt.title) {
                        tagIds.push(opt.id);
                    }
                }
            }
            try {
                if (isNew) {
                    const res = await axios.post(
                        AppUrl.Items,
                        { ...values, tagIds, imgUrl, imgId },
                        { withCredentials: true }
                    );
                    dispatch(addItem({ id: res.data, ...values }));
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
                navigate("../store");
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
            <Form
                className="form"
                onFinish={handleSubmit}
                initialValues={{
                    tags: tags,
                    title: title,
                    description: description,
                    price: price,
                }}
            >
                <Form.Item name="title">
                    <Input name="title" placeholder="Title" value={title} />
                </Form.Item>
                <Form.Item
                    style={{ width: 200, marginBottom: 10, userSelect: "none" }}
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
                <Form.Item name="price">
                    <InputNumber
                        name="price"
                        placeholder="price"
                        value={price}
                    />
                </Form.Item>
                <Form.Item name="description">
                    <TextArea
                        name="description"
                        placeholder="description"
                        cols={30}
                        rows={6}
                        value={description}
                    />
                </Form.Item>
                <Form.Item valuePropName="image" onChange={handleChange}>
                    <Upload action={false} listType="picture-card">
                        <div className="upload-cnt">
                            <PlusOutlined />
                            <div>Upload</div>
                        </div>
                    </Upload>
                </Form.Item>
                {!isNew && (
                    <div className="img-cnt">
                        <Image.PreviewGroup
                            preview={{
                                onChange: (current, prev) =>
                                    console.log(
                                        `current index: ${current}, prev index: ${prev}`
                                    ),
                            }}
                        >
                            {data?.images?.map((imgUrl, i) => (
                                <div key={i} className="img-btn-cnt">
                                    <Image className="pic" src={imgUrl} />
                                    <DeleteOutlined
                                        className="delete-btn"
                                        onClick={() =>
                                            handleDeleteImage(imgUrl)
                                        }
                                    />
                                </div>
                            ))}
                        </Image.PreviewGroup>
                    </div>
                )}
                <Form.Item>
                    <Button htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ItemForm;
