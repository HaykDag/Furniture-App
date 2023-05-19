import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin, selectAdmin } from "../../features/admin/adminSlice";
import './login.css'
const Login = ()=>{

    const [userName, setUserName] = useState("");
    const [password,setPassword] = useState("");

    const { error } = useSelector(selectAdmin)
    const dispatch = useDispatch();

    const handleSubmit = async (e)=>{
        e.preventDefault();

        dispatch(loginAdmin({userName,password}))
        
        setUserName('');
        setPassword('');
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