import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, logoutUser } from '../../features/users/usersSlice';
import './header.css'
import { Link } from 'react-router-dom';


const Header = ()=>{

    const [toggle,setToggle] = useState(false);
   
    const dispatch = useDispatch();

    const {userName}  = useSelector(selectUser);
   
    const handlLogout = ()=>{
        dispatch(logoutUser())
    }
    
    return(
        <header>
            <nav className='navbar'>
                <div className='brand-title'>
                    <Link to='/'>Seek UNcomfort</Link>
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
                        <li>
                            <Link to='/admin'>DASHBOARD</Link>
                        </li>
                        {userName &&<li>
                            <Link to='/admin/store'>STORE</Link>
                        </li>}
                        {userName &&<li>
                            <Link to='/admin/Add'>ADD</Link>
                        </li>}
                        {!userName && <>
                        <li>
                            <Link to='/login'>Login</Link>
                        </li>
                        <li>
                            <Link to='/register'>Register</Link>
                        </li>
                        </>}
                    </ul>
                </div>
                {userName && <div className='logout'>
                    <span>{userName}</span>
                     <span
                        onClick={handlLogout}
                     >logout</span>
                </div>}
            </nav>
        </header>
    )
}

export default Header;