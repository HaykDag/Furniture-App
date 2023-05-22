import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, selectUser } from "../../features/users/usersSlice";
import { useNavigate } from "react-router-dom";
import './signup.css'

const Signup = ()=>{

    const [userName, setUserName] = useState("");
    const [password,setPassword] = useState("");
    const [admin,setAdmin] = useState(false);

    const { status, error, user} = useSelector(selectUser)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleSubmit = async (e)=>{
        e.preventDefault();

        dispatch(signupUser({userName,password,admin}))
        
        if(!error){
            setUserName('');
            setPassword('');
            navigate('../admin')
        }
        
    }
    return(
        <div className="log-cnt">
            <form
                className="login"
                onSubmit={handleSubmit}
            >
                <h3>Register</h3>
                <label>Username:</label>
                <input
                    type="text"
                    onChange={(e)=>setUserName(e.target.value)}
                    value={userName}
                />
                <label>Password:</label>
                <input
                    type="password"
                    onChange={(e)=>setPassword(e.target.value)}
                    value={password}
                />
                {user.isAdmin && <div className="isAdmin">
                <label>Admin</label>
                <input
                    type="checkbox"
                    onChange={()=>setAdmin(!admin)}
                    value={admin}
                />
                </div>}
                <button>Register</button>
                {status==='failed' && <div className="error">{error}</div>}
            </form>
        </div>
    )
}

export default Signup;