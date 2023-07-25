import { Avatar, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import defaultImage from "../../components/Card/chair.png";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { AppUrl } from "../../components/AppData";
import ListView from "../../Shared/ListView";

const GetItems = () => {
    const navigate = useNavigate();

    const columns = [
        {
            title: "Thumbnail",
            dataIndex: "images",
            align: "center",
            render: (images, record) => {
                return (
                    <Avatar
                        src={images.length > 0 ? images[0] : defaultImage}
                        style={{ width: "40px", height: "40px" }}
                        onClick={() => navigate(`./${record.id}`)}
                    />
                );
            },
        },
        {
            title: "Title",
            dataIndex: "title",
        },
        {
            title: "Description",
            dataIndex: "description",
        },
        {
            title: "Price",
            dataIndex: "price",
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: "Tags",
            dataIndex: "tags",
            render: (tags) => {
                return (
                    <>
                        {tags?.map((tag, index) => {
                            return (
                                <Tag
                                    className="tags"
                                    key={index}
                                    style={{
                                        userSelect: "none",
                                        cursor: "pointer",
                                    }}
                                >
                                    {tag}
                                </Tag>
                            );
                        })}
                    </>
                );
            },
        },
        {
            title: "Created",
            dataIndex: "created",
            sorter: (a, b) => new Date(a.created) - new Date(b.created),
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
    ];

    return (
        <ListView
            columns={columns}
            getUrl={AppUrl.Items}
            deleteUrl={AppUrl.Items}
        />
    );
};

export default GetItems;
