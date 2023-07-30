import {
    MinusCircleOutlined,
    PlusOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons";
import { Badge, Dropdown } from "antd";
import { removeItemFromBasket } from "../../features/users/usersSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import "./shoppingCart.css";
import { Link } from "react-router-dom";

const ShoppingCart = ({ user }) => {
    useEffect(() => {
        window.addEventListener("error", (e) => {
            if (e.message === "ResizeObserver loop limit exceeded") {
                const resizeObserverErrDiv = document.getElementById(
                    "webpack-dev-server-client-overlay-div"
                );
                const resizeObserverErr = document.getElementById(
                    "webpack-dev-server-client-overlay"
                );
                if (resizeObserverErr) {
                    resizeObserverErr.setAttribute("style", "display: none");
                }
                if (resizeObserverErrDiv) {
                    resizeObserverErrDiv.setAttribute("style", "display: none");
                }
            }
        });
    }, []);

    const dispatch = useDispatch();

    const handleOrder = (id) => {
        //write the logic for ordering items
        console.log("order", id);
    };
    const handleRemove = async (id) => {
        const res = await axios.delete(`/basket/${id}`);
        console.log(res.data);
        dispatch(removeItemFromBasket(id));
    };

    const basketItems = user.basket?.map((item) => {
        return {
            key: item.id,
            label: (
                <div className="cart-list">
                    <Link to={`http://localhost:3000/items/${item.id}`}>
                        <span>
                            {item?.title} - {item?.price}&#1423;
                        </span>
                    </Link>
                    <div className="cart-list-btn-cnt">
                        <PlusOutlined
                            style={{ backgroundColor: "lightgreen" }}
                            onClick={() => handleOrder(item.id)}
                        />
                        <MinusCircleOutlined
                            style={{ backgroundColor: "red" }}
                            onClick={() => handleRemove(item.id)}
                        />
                    </div>
                </div>
            ),
        };
    });

    return (
        <div className="cart">
            <Dropdown menu={{ items: basketItems }} placement="bottom">
                <Badge count={user.basket.length} size="small">
                    <ShoppingCartOutlined className="cart-icon" />
                </Badge>
            </Dropdown>
        </div>
    );
};

export default ShoppingCart;
