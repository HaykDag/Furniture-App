import { DeleteOutlined, DeleteRowOutlined, EditFilled } from "@ant-design/icons";
import { useState } from "react";

const Detail = ({idx,tag,handleDelete,handleUpdate})=>{

    const [text,setText] = useState(tag)
    const [isEdit,setIsEdit] = useState(false);

   
    return(
        <li className="tag-cnt">
            <form
            className="list-form"
                onSubmit={(e)=>{
                    e.preventDefault();
                    setIsEdit(false);
                    handleUpdate(idx,text);
                    
                }}
            >
                {isEdit && <input
                    value={text}
                    onChange={(e)=>setText(e.target.value)}
                />}
                {!isEdit && <p>{tag}</p>}
                </form>
                
                <div>
                    <EditFilled
                        onClick={()=>setIsEdit(!isEdit)}
                    />

                    <DeleteOutlined
                        onClick={()=>handleDelete(idx)}
                    />
                </div>
            
        </li>
    )
}

export default Detail;