import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAdmin } from '../../features/admin/adminSlice';
import './header.css'
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Header = ()=>{

    const [toggle,setToggle] = useState(false);
    const {userName, dispatch}  = useAuth()
    

    const { admin } = useSelector(selectAdmin);
    
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
                        {admin &&<li>
                            <Link to='/admin/store'>STORE</Link>
                        </li>}
                        {admin &&<li>
                            <Link to='/admin/Add'>ADD</Link>
                        </li>}
                    </ul>
                </div>
                {admin && <div className='logout'>
                    <span>{admin}</span>
                     <span
                        onClick={handlLogout}
                     >logout</span>
                </div>}
            </nav>
        </header>
    )
}

export default Header;