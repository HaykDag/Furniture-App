import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  loginUser ,selectUser } from "../../features/users/userSlice";
import './login.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ()=>{

    const [userName, setUserName] = useState("");
    const [password,setPassword] = useState("");

    const { error } = useSelector(selectUser)
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        // dispatch(loginUser({userName,password}))
        try{
            const response = await axios.post(`/user/login`,{userName,password});
            dispatch(loginUser(response.data))
            navigate('../')
            setUserName('');
            setPassword('');
        }catch(err){
            dispatch(loginUser(err.response.data.error))
        }
       
    }
    
    return(
        <div className="log-cnt">
            <form
                className="login"
                onSubmit={handleSubmit}
            >
                <h3>Log in</h3>
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
                <button>Login</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    )
}

export default Login;