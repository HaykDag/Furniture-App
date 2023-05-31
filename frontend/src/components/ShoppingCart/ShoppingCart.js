import {
    MinusCircleOutlined,
    PlusOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons";
import { Badge, Dropdown } from "antd";
import { updateUser } from "../../features/users/usersSlice";
import { useDispatch } from 'react-redux';
import { useEffect } from "react";
import './shoppingCart.css'
import { Link } from "react-router-dom";
import { useGetItemsQuery } from "../../services/items";

const ShoppingCart = ({user}) => {
    
    useEffect(() => {
        window.addEventListener('error', e => {
            if (e.message === 'ResizeObserver loop limit exceeded') {
                const resizeObserverErrDiv = document.getElementById(
                    'webpack-dev-server-client-overlay-div'
                );
                const resizeObserverErr = document.getElementById(
                    'webpack-dev-server-client-overlay'
                );
                if (resizeObserverErr) {
                    resizeObserverErr.setAttribute('style', 'display: none');
                }
                if (resizeObserverErrDiv) {
                    resizeObserverErrDiv.setAttribute('style', 'display: none');
                }
            }
        });
    }, []);
    
    const dispatch = useDispatch();
    const {data:items} = useGetItemsQuery();

    const handleOrder = (id)=>{
        //write the logic for ordering items
        console.log('order',id)
    }
    const handleRemove = (id)=>{
        const basket = user.basket.filter(el=>el!==id)
        const {userName} = user;
        dispatch(updateUser({userName,basket}))
    }
    const basketItems = user.basket.map((id) => {
        const item = items?.find((el) => el._id === id);
        return {
            key: id,
            label: (
                <div className="cart-list">
                    <Link to={`../items/${item?._id}`}>
                        <span>
                            {item?.title} - {item?.price}&#1423;
                        </span>
                    </Link>
                    <PlusOutlined 
                        style={{ backgroundColor: "lightgreen" }}
                        onClick={()=>handleOrder(id)}
                    />
                    <MinusCircleOutlined 
                        style={{ backgroundColor: "red" }}
                        onClick={()=>handleRemove(id)} 
                    />
                </div>
            ),
        };
    });
    
    return (
        <div className="cart">
            <Dropdown 
                menu={{ items: basketItems}} 
                placement="bottom">
                <Badge count={user.basket.length} size="small">
                    <ShoppingCartOutlined className="cart-icon" />
                </Badge>
            </Dropdown>
        </div>
    );
};

export default ShoppingCart;
