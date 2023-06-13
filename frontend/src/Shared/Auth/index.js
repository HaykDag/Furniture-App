import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signupUser, loginUser, selectUser } from "../../features/users/usersSlice";
import axios from "axios";
import { AppUrl } from "../../components/AppData";

const Auth = ({isLogin=false})=>{

    const [userName, setUserName] = useState("");
    const [password,setPassword] = useState("");
    const [admin,setAdmin] = useState(false);

    const { error, user} = useSelector(selectUser);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(isLogin? AppUrl.users : AppUrl.users.signup, {
                userName,
                password,
                admin
            })
    
            dispatch(loginUser(response.data));
            navigate("../");
            setUserName("");
            setPassword("");
        } catch (err) {
            dispatch(loginUser(err.response.data.error));
        }
    };

    return (
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
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    )
}

export default Auth;