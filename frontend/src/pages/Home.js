import Header from "../components/Header/Header";
import Card from "../components/Card/Card";
import { useSelector } from "react-redux";
import { selectAllItems } from "../features/items/itemsSlice";


const Home = ()=>{
    
    const items = useSelector(selectAllItems)
 
    return(
        <div className="home">
            <Header />
            <h1>Home sweet Home</h1>
            <div className="main">
                {items?.map(((item,i)=>(
                    <Card key={i} item={item}  />
                )))}
            </div>
        </div>
    )
}

export default Home;