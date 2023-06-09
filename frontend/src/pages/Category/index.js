import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, updateCategories } from "../../features/Categories/CategorySlice";
import Detail from "./detail";
import './index.css'
import { PlusCircleOutlined } from "@ant-design/icons";



const Category = ()=>{

    const dispatch = useDispatch();

    const category = useSelector((state)=>state.category.categories)
    const [addText,setAddText] = useState("")
    const [searchText,setSearchText] = useState('');

    useEffect(()=>{
        dispatch(fetchCategories());
    },[])
    let tags;
    
    if(category){
        tags = category?.filter((t)=>t.toLowerCase().includes(searchText.toLowerCase()));
    }
    

    const handleDelete = (i)=>{
        const newTags = [...category.slice(0,i),...category.slice(i+1)];
        dispatch(updateCategories(newTags));
    }

    const handleUpdate = (idx,text)=>{
        const newTags = [...category];
        newTags[idx] = text;
        dispatch(updateCategories(newTags));
    }

    const handleAdd = (e)=>{
        e.preventDefault();
        const newTags = [addText,...category];
        dispatch(updateCategories(newTags));
        setAddText("");
    }
    return (
        <div className="tags">
            <div className="tags-header-cnt">
                
                <form 
                    className="add-form"
                    onSubmit={handleAdd}
                >
                    <input
                        placeholder="add a new Category"
                        onChange={(e)=>setAddText(e.target.value)}
                    />
                    <PlusCircleOutlined
                        className="plus-icon"
                    />
                </form>
                <input
                    onChange={(e)=>setSearchText(e.target.value)}
                    placeholder="search..."
                />
            </div>
            <ul className="tag-list">
                {tags?.map((tag,i)=>(
                    <Detail 
                        key={i}
                        idx={i} 
                        tag={tag}
                        handleDelete={handleDelete}
                        handleUpdate={handleUpdate}
                    />
                ))}
            </ul>
        </div>
    )
}

export default Category;