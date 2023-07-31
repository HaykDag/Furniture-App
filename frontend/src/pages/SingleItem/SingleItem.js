import { useParams } from "react-router-dom";
import NotFound from "../NotFound/NotFound";
import axios from "axios";
import { useEffect, useState } from "react";
import { AppUrl } from "../../components/AppData";
import { Button, Image } from "antd";
import "./singleItem.css";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useDispatch, useSelector } from "react-redux";
import {
    orderItem,
    addItemIntoBasket,
    removeItemFromBasket,
    selectUser,
} from "../../features/users/usersSlice";

const SingleItem = () => {
    axios.defaults.withCredentials = true;
    const { id } = useParams();
    const { user } = useSelector(selectUser);
    const dispatch = useDispatch();

    const [data, setData] = useState({});

    const getItem = async () => {
        try {
            const res = await axios(`${AppUrl.Items}/${id}`);
            setData(res.data);
        } catch (err) {
            setData(err.response.data.error);
        }
    };

    const images = data?.images?.split(",");
    const Itemtags = data.tags?.split(",");

    let basketIds = "";
    let orderIds = "";
    user.orders?.forEach((item) => {
        orderIds += `${item.id},`;
    });
    user.basket?.forEach((item) => {
        basketIds += `${item.id},`;
    });

    useEffect(() => {
        getItem();
    }, [user]);

    const handleOrder = async () => {
        const res = await axios.post(AppUrl.Orders, {
            user_id: user.id,
            item_id: id,
        });
        const newOrderItem = {
            ...data,
            order_status: "pending",
            payment_status: false,
        };
        if (res.status === 200) {
            console.log(`user with id:${user.id} ordered item with id:${id}`);
            dispatch(orderItem(newOrderItem));
        }
    };
    const handleRemove = async () => {
        const res = await axios.delete(`${AppUrl.Basket + id}`);
        console.log(res.data);
        dispatch(removeItemFromBasket(id));
    };
    console.log(user);
    const handleAddItem = async () => {
        await axios.post(`${AppUrl.Basket}`, { id });
        const basketItem = {
            id,
            title: data.title,
            price: data.price,
        };
        dispatch(addItemIntoBasket(basketItem));
    };

    return data.title ? (
        <div className="item-info-cnt">
            <div className="single-info-cnt">
                <h1>{data.title}</h1>
                <p className="item-description">{data.description}</p>
                <p className="item-price">{data.price} &#1423;</p>
                <div className="tags-cnt">
                    {Itemtags?.map((tag, i) => (
                        <span key={i} className="item-tags">
                            {tag}
                        </span>
                    ))}
                </div>
                <p className="item-date">
                    {formatDistanceToNow(new Date(data.created), {
                        addSuffix: true,
                    })}
                </p>
            </div>
            <div className="img-cnt">
                <Image.PreviewGroup>
                    {images?.map((imgUrl, i) => (
                        <Image key={i} className="pic" src={imgUrl} />
                    ))}
                </Image.PreviewGroup>
            </div>
            {orderIds?.includes(id) ? (
                <div>
                    <p className="ordered">The item is successfuly ordered</p>
                    {user.orders.map((item, i) => {
                        if (item.id === +id) {
                            return (
                                <div key={i} className="order-details">
                                    <p>Status: {item.order_status}</p>
                                    <p>
                                        Payment:
                                        {item.payment_status
                                            ? " done"
                                            : " expected"}
                                    </p>
                                </div>
                            );
                        } else return "";
                    })}
                </div>
            ) : basketIds?.includes(id) ? (
                <div className="single-btn-cnt">
                    <Button type="primary" onClick={handleOrder}>
                        Order
                    </Button>
                    <Button type="primary" onClick={handleRemove}>
                        Remove
                    </Button>
                </div>
            ) : (
                user.username && (
                    <Button type="primary" onClick={handleAddItem}>
                        Add to the shopping cart
                    </Button>
                )
            )}
        </div>
    ) : (
        <NotFound />
    );
};

export default SingleItem;
