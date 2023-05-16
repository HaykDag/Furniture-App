import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import './login.css'
const Login = ()=>{

    const [userName, setUserName] = useState("");
    const [password,setPassword] = useState("");

    const {login,error,isLoading} = useLogin();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        
        await login(userName,password);
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
                <button
                    disabled={isLoading}
                >Login</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    )
}

export default Login;