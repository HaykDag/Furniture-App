import defaultImage from'./chair.png'
import './card.css'
import { Button } from 'antd';
import {  selectUser, removeItemFromBasket, addItemIntoBasket} from '../../features/users/usersSlice';
import { useDispatch , useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Card = ({id})=>{
    
    const [item] = useSelector((state)=>state.items.items.filter(i=>i.id===+id));
    const {user} = useSelector(selectUser);
  
    let userBasketIds = '';
    user?.basket.forEach(item=>userBasketIds+=(","+item.id))
    const formattedNumber = (Number(item?.price)).toLocaleString("en-US");
    
    const dispatch = useDispatch();

    const handleOrder = ()=>{
        //write logic about orderiing items
        console.log(`order - ${item.id} item`)
    }
    const handleRemove = async() =>{
        const res = await axios.delete(`/basket/${item.id}`);
        console.log(res.data);
        dispatch(removeItemFromBasket(item.id));
    }
    const handleAddItem = async ()=>{
        const res = await axios.post(`/basket/`,{id:item.id});
        const basketItem = {
            id:item.id,
            title:item.title,
            price:item.price
        }
        dispatch(addItemIntoBasket(basketItem));
        console.log(res.data);
    }
    return(
        <div className='card-cnt'>
            <Link to={`items/${item?.id}`}>
                <div className='pic-cnt'>
                    <img 
                        className='pic' 
                        alt='Furniture' 
                        src={item?.images?.length>0?item.images[0]: defaultImage}
                    />
                </div>
            </Link>
            <div className='info-cnt'>
                <h3 className='title'>{item?.title}</h3>
                <p className='description'>{item?.description}</p>
                <p className='Price'>{formattedNumber} &#1423;</p>
                {userBasketIds.includes(id) ?
                        <div className='btn-cnt'>
                                <Button 
                                    type='primary'
                                    onClick={handleOrder}
                                >Order</Button>
                                <Button
                                    onClick={handleRemove}
                                >Remove</Button>
                        </div>
                            : user.username && 
                            <Button 
                                type='primary'
                                onClick={handleAddItem}
                            >Add to the shopping cart
                            </Button>}
            </div>
        </div>
    )
}

export default Card;