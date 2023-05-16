import './addItem.css'
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Tag, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";


const AddItem = ()=>{

    const tagOptions = ["Chair","Table","Sofa","Bed","Wood","Metal","Handmade"];
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [price,setPrice] = useState("");
    const [tags,setTags] = useState([]);
    

    const navigate = useNavigate();

    const handleAdd = async(e)=>{
        const response = await fetch('/items',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({title,description,price,tags})
        })
        
        if(response.ok){
            setTitle("");
            setDescription("");
            setPrice("");
            setTags([]);
            //setImages([]);
            navigate('../admin/store')
        }
    }

    const handleTag = (tag)=>{
        if(tags.join("").includes(tag)){
            setTags([...tags].filter(t=>t!==tag))
        }else{
            setTags([...tags,tag])
        }
    }
    useEffect(()=>{

    },[]);

    /* 
    uploading the img to the server and returning the path and name in one string
    const [images,setImages] = useState([]);
    const handleUpload = (dataList) => {
        dataList.fileList.forEach(list=>{
            if(list.response){
                setImages([list.response[0].name,...images])
            }
        })
    };
    */
    return(
        <>
        <Header isAdmin={true} />
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
                // action="http://localhost:4000/items/upload"
                // onChange={handleUpload}
                // enctype='multipart/form-data'
                // method='POST'
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
    </>
    )
}

export default AddItem;