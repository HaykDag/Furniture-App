import Card from "../components/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems, selectAllItems } from "../features/items/itemsSlice";
import { useEffect } from "react";


const Home = ()=>{
    
    const items = useSelector(selectAllItems)
    
    const dispatch = useDispatch();

    //fetching items as soon as app loads
    useEffect(()=>{
        dispatch(fetchItems())
    },[dispatch])

    return(
        <div className="home">
            <div className="main">
                {items?.map((item,i)=> <Card key={i} id={item.id}/>)}
            </div>
        </div>
    )
}

export default Home;