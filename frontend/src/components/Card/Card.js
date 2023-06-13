import defaultImage from'./chair.png'
import './card.css'
import { Button } from 'antd';
import { updateUser , selectUser} from '../../features/users/usersSlice';
import { useDispatch , useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

const Card = ({ id })=>{
    
    const item = useSelector((state)=>state.items.items.find(i=>i._id===id));
    const {user} = useSelector(selectUser);
    const {userName} = user;
    const formattedNumber = (Number(item?.price)).toLocaleString("en-US");
    
    const dispatch = useDispatch()
    const handleOrder = ()=>{
        //write logic about orderiing items
        console.log(`order - ${id} item`)
    }
    const handleRemove = ()=>{
        const basket = user.basket.filter(el=>el!==id)
        dispatch(updateUser({userName,basket}))
    }
    const handleAddItem = ()=>{
        const basket = [id,...user.basket]
        dispatch(updateUser({userName,basket}))
    }
    return(
        <div className='card-cnt'>
            <Link to={`items/${item?._id}`}>
                <div className='pic-cnt'>
                    <img 
                        className='pic' 
                        alt='Furniture' 
                        src={item?.images.length>0?item.images[0]: defaultImage}
                    />
                </div>
            </Link>
            <div className='info-cnt'>
                <h3 className='title'>{item?.title}</h3>
                <p className='description'>{item?.description}</p>
                <p className='price'>{formattedNumber} &#1423;</p>
                {user.basket.includes(id) ?
                        <div className='btn-cnt'>
                                <Button 
                                    type='primary'
                                    onClick={handleOrder}
                                >Order</Button>
                                <Button
                                    onClick={handleRemove}
                                >Remove</Button>
                        </div>
                            : user.userName && 
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