import defaultImage from'./chair.png'
import './card.css'
import { Button } from 'antd';
import { updateUser , selectUser} from '../../features/users/usersSlice';
import { useDispatch , useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons'

const Card = ({ item })=>{
    const formattedNumber = (Number(item.price)).toLocaleString("en-US");
    
    const dispatch = useDispatch()
    const {user} = useSelector(selectUser)
    
    return(
        <div className='card-cnt'>
            <Link to={`items/${item?._id}`}>
                <div className='pic-cnt'>
                    <img 
                        className='pic' 
                        alt='Furniture' 
                        src={item.images.length>0?item.images[0]: defaultImage}
                    />
                </div>
            </Link>
            <div className='info-cnt'>
                <h3 className='title'>{item.title}</h3>
                <p className='description'>{item.description}</p>
                <p className='price'>{formattedNumber} &#1423;</p>
                {user.basket.includes(item._id) ?
                    
                    <DeleteOutlined
                        className='trash-can'
                        onClick={()=>{
                            const basket = user.basket.filter(el=>el!==item._id)
                            const {userName} = user
                            dispatch(updateUser({userName,basket}))
                        }}
                     /> 
                :
                <Button 
                    type='primary'
                    onClick={()=> {
                        const basket = [...user.basket,item._id]
                        const {userName} = user
                        dispatch(updateUser({userName,basket}))}
                    }
                    disabled={user.basket.includes(item._id)?true:false}
                >Add to the shopping cart</Button>}
            </div>
        </div>
    )
}

export default Card;