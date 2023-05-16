import { useState } from 'react';

import './header.css'
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Header = ({isAdmin=false})=>{

    const [toggle,setToggle] = useState(false);
    const {userName, dispatch}  = useAuth()

    const handlLogout = ()=>{
        localStorage.removeItem('admin');
        dispatch({type:"LOGOUT"})
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
                        {isAdmin &&<li>
                            <Link to='/admin/store'>STORE</Link>
                        </li>}
                        {isAdmin &&<li>
                            <Link to='/admin/Add'>ADD</Link>
                        </li>}
                    </ul>
                </div>
                {isAdmin && <div className='logout'>
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