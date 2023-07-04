import { RouterProvider } from 'react-router-dom'
import MyRouter from "./hooks/useRouter";
import { useSelector, useDispatch } from 'react-redux'
import { fetchItems} from './features/items/itemsSlice'
import { fetchCategories } from './features/Categories/CategorySlice';
import { useEffect } from 'react';

function App() {

  const myRouter = MyRouter()
  
  const dispatch = useDispatch();

  //fetching items as soon as app loads
  useEffect(()=>{
    dispatch(fetchItems())
    dispatch(fetchCategories());
  },[dispatch])
 
  return (
    <div className="App">
      <RouterProvider router={myRouter} />
    </div>
  );
}

export default App;
