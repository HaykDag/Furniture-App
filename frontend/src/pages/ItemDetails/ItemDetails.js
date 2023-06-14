import './itemDetails.css'
import { useParams } from 'react-router-dom';
import Card from '../../components/Card/Card';


const ItemDetails = ()=>{

    const {id}  = useParams();
    
    return(
        <div className='item-box'>
            <Card id={id}/>   
        </div>
    )
}

export default ItemDetails;