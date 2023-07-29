import defaultImage from "./chair.png";
import "./card.css";
import { Button, Image } from "antd";
import {
    selectUser,
    removeItemFromBasket,
    addItemIntoBasket,
} from "../../features/users/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import { AppUrl } from "../AppData";

const Card = ({ id }) => {
    const [item] = useSelector((state) =>
        state.items.items.filter((i) => i.id === +id)
    );
    const { user } = useSelector(selectUser);

    const [visible, setVisible] = useState(false);

    let userBasketIds = "";

    user?.basket?.forEach((item) => (userBasketIds += "," + item.id));
    const formattedNumber = Number(item?.price).toLocaleString("en-US");

    const dispatch = useDispatch();

    const handleOrder = async () => {
        const res = await axios.post(AppUrl.Orders, {
            user_id: user.id,
            item_id: item.id,
        });
        console.log(res);
        console.log(`user with id:${user.id} ordered item with id:${item.id}`);
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
                <h3 className="title">{item?.title}</h3>
                <p className="description">{item?.description}</p>
                <p className="Price">{formattedNumber} &#1423;</p>
                {userBasketIds.includes(id) ? (
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
