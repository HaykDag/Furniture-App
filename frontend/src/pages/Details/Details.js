import { useParams } from 'react-router-dom';
import ItemForm from '../../Shared/ItemForm';
import { useSelector } from 'react-redux';
import NotFound from '../NotFound/NotFound';

const Details = ()=>{
  const {id}  = useParams();
  const data = useSelector(state=>state.items.items).filter(i=>i.id===+id);
  
  return(<>
    {!data[0] ? <NotFound/> 
    :<ItemForm 
      data={data[0]}
    />
  }
  </>)
  
}

export default Details;