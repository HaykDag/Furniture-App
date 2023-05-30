import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, logoutUser } from '../../features/users/usersSlice';
import { useNavigate } from 'react-router-dom';
import './header.css'
import { Link } from 'react-router-dom';
import { MinusCircleOutlined, PlusOutlined, ShoppingCartOutlined } from "@ant-design/icons"
import {Badge, Dropdown} from 'antd';
import { selectAllItems } from '../../features/items/itemsSlice';
import ShoppingCart from '../ShoppingCart/ShoppingCart';
const Header = ()=>{

    const [toggle,setToggle] = useState(false);
   
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {user}  = useSelector(selectUser);
    const items = useSelector(selectAllItems);
    
    const handlLogout = ()=>{
        dispatch(logoutUser())

        navigate('/login')
    }
    
    // const basketItems = user.basket.map((id) => {
    //     const item = items.find(el=>el._id===id)
    //     return {
    //         key:id,
    //         label:(
    //             <div className='cart-list'>
    //                 <span>{item?.title} - {item?.price}&#1423;</span>
    //                 <PlusOutlined style={{backgroundColor:"lightgreen"}} />
    //                 <MinusCircleOutlined style={{backgroundColor:"red"}} />
    //             </div>
    //             )
    //     }
    // })
    return(
        <header>
            <nav className='navbar'>
                <div className='brand-title'>
                    <Link to='/'>Seek unComfort</Link>
                </div>
                    <Link to='#'className='toggle-button'
                        onClick={()=>setToggle(!toggle)}
                    >
                        <span className='bar' />
                        <span className='bar' />
                        <span className='bar' />
                    </Link>
                <div className={`navbar-links ${toggle?"active":""}`} >
                    <ul>
                        <li>
                            <Link to='/'>HOME</Link>
                        </li>
                        {user.isAdmin && <>
                        <li>
                            <Link to='/admin'>DASHBOARD</Link>
                        </li>
                        <li>
                            <Link to='/admin/store'>STORE</Link>
                        </li>
                        <li>
                            <Link to='/admin/Add'>ADD</Link>
                        </li>
                        </>}
                        {!user.userName && <>
                        <li>
                            <Link to='/login'>Login</Link>
                        </li>
                        <li>
                            <Link to='/register'>Register</Link>
                        </li>
                        </>}
                    </ul>
                </div>
                {user.userName && <>
                    <ShoppingCart user={user} items={items}/>
                    {/* <div className='cart'>
                        <Dropdown
                            menu={{items:basketItems}}
                            placement="bottom"
                        >
                        <Badge count={user.basket.length} size='small'>
                            <ShoppingCartOutlined className='cart-icon' />
                        </Badge>
                        </Dropdown>
                    </div> */}
                    <div className='logout'>
                    <span>{user.userName}</span>
                     <span
                        onClick={handlLogout}
                     >logout</span>
                </div>
                </>}
            </nav>
        </header>
    )
}

export default Header;