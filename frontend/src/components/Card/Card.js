import defaultImage from "./chair.png";
import "./card.css";
import { Button, Image } from "antd";
import {
    selectUser,
    removeItemFromBasket,
    addItemIntoBasket,
    orderItem,
} from "../../features/users/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import { AppUrl } from "../AppData";
import { Link } from "react-router-dom";

const Card = ({ id }) => {
    const [item] = useSelector((state) =>
        state.items.items.filter((i) => i.id === +id)
    );
    const { user } = useSelector(selectUser);

    let basketIds = "";
    let orderIds = "";
    user.orders?.forEach((item) => {
        orderIds += `${item.id},`;
    });
    user.basket?.forEach((item) => {
        basketIds += `${item.id},`;
    });

    const [visible, setVisible] = useState(false);

    const formattedNumber = Number(item?.price).toLocaleString("en-US");

    const dispatch = useDispatch();

    const handleOrder = async () => {
        const res = await axios.post(AppUrl.Orders, {
            user_id: user.id,
            item_id: item.id,
        });
        const newOrderItem = {
            ...item,
            order_status: "pending",
            payment_status: false,
        };
        if (res.status === 200) {
            console.log(`user with id:${user.id} ordered item with id:${id}`);
            dispatch(orderItem(newOrderItem));
        }
    };
    const handleRemove = async () => {
        const res = await axios.delete(`/basket/${item.id}`);
        console.log(res.data);
        dispatch(removeItemFromBasket(item.id));
    };
    const handleAddItem = async () => {
        const res = await axios.post(`/basket/`, { id: item.id });
        const basketItem = {
            id: item.id,
            title: item.title,
            price: item.price,
        };
        dispatch(addItemIntoBasket(basketItem));
        console.log(res.data);
    };

    return (
        <div className="card-cnt">
            <div className="pic-cnt">
                <Image
                    preview={{
                        visible: false,
                    }}
                    className="single-img"
                    src={
                        item?.images
                            ? item?.images[0] || defaultImage
                            : defaultImage
                    }
                    onClick={() => setVisible(true)}
                />
                <div className="img-group-cnt">
                    <Image.PreviewGroup
                        preview={{
                            visible,
                            onVisibleChange: (vis) => setVisible(vis),
                        }}
                    >
                        {item?.images?.map((imgUrl, i) => {
                            return <Image key={i} src={imgUrl} />;
                        })}
                    </Image.PreviewGroup>
                </div>
            </div>
            <div className="info-cnt">
                <Link
                    className="info-link"
                    to={`http://localhost:3000/items/${id}`}
                >
                    <h3 className="title">{item?.title}</h3>
                    <p className="description">{item?.description}</p>
                    <p className="Price">{formattedNumber} &#1423;</p>
                </Link>
                {orderIds?.includes(id) ? (
                    <div>
                        <p className="ordered">
                            The item is successfuly ordered
                        </p>
                        {user.orders.map((item) => {
                            if (item.id == id) {
                                return (
                                    <div
                                        key={item.id}
                                        className="order-details"
                                    >
                                        <p>Status: {item.order_status}</p>
                                        <p>
                                            Payment:
                                            {item.payment_status
                                                ? " done"
                                                : " expected"}
                                        </p>
                                    </div>
                                );
                            }
                        })}
                    </div>
                ) : basketIds?.includes(id) ? (
                    <div className="btn-cnt">
                        <Button type="primary" onClick={handleOrder}>
                            Order
                        </Button>
                        <Button onClick={handleRemove}>Remove</Button>
                    </div>
                ) : (
                    user.username && (
                        <Button type="primary" onClick={handleAddItem}>
                            Add to the shopping cart
                        </Button>
                    )
                )}
            </div>
        </div>
    );
};

export default Card;
