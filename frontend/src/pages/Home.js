import Card from "../components/Card/Card";
import { useGetItemsQuery } from "../services/items";

const Home = ()=>{
    
    const {data,error,isLoading} = useGetItemsQuery();
    let content;
    if(isLoading){
        content = <p>loading...</p>
    }else if(error){
        content = <p>error</p>
    }else{
        content = data.map(((item,i)=>(<Card key={i} item={item} />)))
    }
    return(
        <div className="home">
            <h1>Home sweet Home</h1>
            <div className="main">
                {content}
            </div>
        </div>
    )
}

export default Home;