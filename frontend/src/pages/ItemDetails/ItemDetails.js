import './itemDetails.css'
import defaultImage from'./chair.png'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, updateUser } from '../../features/users/usersSlice';
import { Button } from 'antd';
import { useGetItemsQuery } from '../../services/items';


const ItemDetails = ()=>{

    const {id}  = useParams();
    const {user} = useSelector(selectUser)
    const {userName} = user;

    const {data} = useGetItemsQuery();
    const item = data?.find(i=>i._id===id)

    const formattedNumber = (Number(item?.price)).toLocaleString("en-US");
    const dispatch = useDispatch();
    
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
        <div className='item-box'>
            <div className='item-card-cnt'>
                <div className='item-pic-cnt'>
                    <img 
                        className='item-pic' 
                        alt='Furniture' 
                        src={item?.images.length>0?item.images[0]: defaultImage}
                    />
                </div>
                <div className='item-info-cnt'>
                    <h3 className='item-title'>{item?.title}</h3>
                    <p className='item-description'>{item?.description}</p>
                    <p className='item-price'>{formattedNumber} &#1423;</p>
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
                        :<Button 
                            type='primary'
                            onClick={handleAddItem}
                        >Add to the shopping cart</Button>}
                </div>
            </div>
        </div>
    )
}

export default ItemDetails;