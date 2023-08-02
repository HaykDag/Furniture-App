import { useNavigate } from "react-router-dom";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { AppUrl } from "../../components/AppData";
import ListView from "../../Shared/ListView";

const Orders = () => {
    const navigate = useNavigate();

    const columns = [
        {
            title: "order_id",
            dataIndex: "id",
            render: (id) => {
                return (
                    <div
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(`./${id}`)}
                    >
                        {id}
                    </div>
                );
            },
        },
        {
            title: "user_id",
            dataIndex: "user_id",
        },
        {
            title: "username",
            dataIndex: "username",
        },
        {
            title: "item_id",
            dataIndex: "item_id",
        },
        {
            title: "title",
            dataIndex: "title",
        },
        {
            title: "description",
            dataIndex: "description",
        },
        {
            title: "Price",
            dataIndex: "price",
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: "order_status",
            dataIndex: "order_status",
            sorter: (a, b) => a.order_status - b.order_status,
        },
        {
            title: "payment_status",
            dataIndex: "payment_status",
            sorter: (a, b) => a.payment_status - b.payment_status,
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
            getUrl={AppUrl.Orders}
            deleteUrl={AppUrl.Orders}
        />
    );
};

export default Orders;
