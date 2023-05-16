import './editItem.css'
import { useState } from "react";
import { useItems } from '../../hooks/useItems';
import { useNavigate } from "react-router-dom";


const EditItem = ({item,isEdit,setISEdit})=>{

    const [title,setTitle] = useState(item.title);
    const [description,setDescription] = useState(item.description);
    const [price,setPrice] = useState(item.price);

    const navigate = useNavigate();
    const {dispatch} = useItems();

    const handlEdit = async(e)=>{
        e.preventDefault();
        const response = await fetch(`/items:${item._id}`,{
            method:"PATCH",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({title,description,price})
        })
        
        if(response.ok){
            dispatch({
                type:"EDIT",
                payload:{
                    id:item._id,
                    body:{title,description,price}
                }
            })
            navigate('../admin/getItems')
        }
    }
    return(
        <div className="add-item-cnt">
            <form className="add-item"
                onSubmit={handlEdit}
            >
                <input
                    className=""
                    type="text"
                    placeholder="title"
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                />
                <textarea
                    type="text"
                    placeholder="description"
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="price"
                    value={price}
                    onChange={(e)=>setPrice(e.target.value)}
                />
                <div>
                <button
                    type="submit"
                >Save Changes</button>
                <button
                    type='reset'
                    onClick={()=>setISEdit(!isEdit)}
                >Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default EditItem;