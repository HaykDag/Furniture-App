import './addItem.css'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Tag, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useAddItemMutation } from '../../services/items';
const AddItem = ()=>{

    const tagOptions = ["Chair","Table","Sofa","Bed","Wood","Metal","Handmade"];

    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [price,setPrice] = useState("");
    const [tags,setTags] = useState([]);
    
    const navigate = useNavigate();
    const [addItem] = useAddItemMutation();

    const handleAdd = async()=>{
        addItem({title,description,price,tags})
        setTitle("");
        setDescription("");
        setPrice("");
        setTags([]);
        navigate('../store');
    }

    const handleTag = (tag)=>{
        if(tags.join("").includes(tag)){
            setTags([...tags].filter(t=>t!==tag))
        }else{
            setTags([...tags,tag])
        }
    }
  
    return(
        <div className='details-cnt'>
        <Form 
        className='form'
        onFinish={handleAdd}
        >
        <Form.Item  >
            <Input
                placeholder='Title'
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
            />
        </Form.Item>
        <Form.Item style={{width:200, marginBottom:10}} >
            {tagOptions.map((option,index)=>(
                <Tag
                 key={index}
                 onClick={()=>handleTag(option)}
                style={tags.join('').includes(option)?{backgroundColor:"#333",color:"white"}:{backgroundColor:"white"}}
                >{option}</Tag>
            ))}
        </Form.Item>
            <Form.Item >
            <InputNumber 
                placeholder='price'
                value={price}
                onChange={(e)=>setPrice(e)}
            />
            </Form.Item>
            <Form.Item >
            <TextArea
                placeholder='description' 
                cols={30} rows={6}
                value={description}
                onChange={(e)=>setDescription(e.target.value)} 
            />
            </Form.Item>
            <Form.Item valuePropName="image" >
            <Upload 
                multiple
                maxCount={5}
                name='images'
                listType="picture-card">
                <div>
                <PlusOutlined />
                <div
                    style={{
                    marginTop: 8,
                    }}
                >
                    Upload
                </div>
                </div>
            </Upload>
            </Form.Item>
            <Form.Item >
            <Button
                htmlType='submit'
            >Submit</Button>
            </Form.Item>
        </Form>
    </div>

    )
}

export default AddItem;