import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, logoutUser } from '../../features/users/usersSlice';
import { useNavigate } from 'react-router-dom';
import './header.css'
import { Link } from 'react-router-dom';
import ShoppingCart from '../ShoppingCart/ShoppingCart';
const Header = ()=>{

    const [toggle,setToggle] = useState(false);
   
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {user}  = useSelector(selectUser);

    
    const handlLogout = ()=>{
        dispatch(logoutUser())
        navigate('/login')
    }
    
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
                {user.userName && <div className='cart-logout'>
                    <ShoppingCart user={user} />
                    <div className='logout'>
                    <span>{user.userName}</span>
                     <span
                        onClick={handlLogout}
                     >logout</span>
                </div>
                </div>}
            </nav>
        </header>
    )
}

export default Header;