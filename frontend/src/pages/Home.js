import Header from "../components/Header/Header";
import Card from "../components/Card/Card";
import { useItems } from "../hooks/useItems";

const Home = ()=>{
    
    const {items} = useItems();
 
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