import './notFound.css'
const { Link } = require("react-router-dom")

const NotFound = ()=>{
    return(
        <div className="notFound">
            <h1>Not Found</h1>
            <h2>404</h2>
            <p><Link to='/'>Go Home page</Link></p>
        </div>
    )
}

export default NotFound;