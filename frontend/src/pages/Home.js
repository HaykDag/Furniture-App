
import Card from "../components/Card/Card";
import { useSelector } from "react-redux";
import { selectAllItems } from "../features/items/itemsSlice";


const Home = ()=>{
    
    const items = useSelector(selectAllItems)
    
    return(
        <div className="home">
            <h1>Home sweet Home</h1>
            <div className="main">
                {items?.map(((item,i)=>(
                    <Card key={i} id={item._id}  />
                )))}
            </div>
        </div>
    )
}

export default Home;