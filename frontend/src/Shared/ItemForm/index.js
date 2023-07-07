//use this form to add a new Item or edit an existing one.
import './index.css'
import { Button, Form, Input, InputNumber, Select, Upload} from "antd";
import { PlusOutlined } from '@ant-design/icons';
import TextArea from "antd/es/input/TextArea";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addItem, updateItem, } from "../../features/items/itemsSlice";
import { useNavigate } from "react-router-dom";
import { AppUrl } from "../../components/AppData";

const ItemForm = (props) => {

    const {data,isNew = false} = props;

    const [imageData,setImageData] = useState();
    const [title,setTitle] = useState(data?.title);
    const [description,setDescription] = useState(data?.description);
    const [price,setPrice] = useState(data?.price);
    const [tags,setTags] = useState(data?.tags || []);
    
    const [tagOptions,setTagOptions] = useState([])
    const dispatch = useDispatch();
    const navigate = useNavigate();

     const getCategories = () => {
        axios.get(AppUrl.Categories)
        .then((res) => {
           
            setTagOptions(res.data);
        });
    };
    useEffect(() => {
        getCategories();
    }, []);
    
    const handleChange = (e)=>{
        setImageData(e.target.files[0]);
    }
    
    const handleAdd = async(values)=>{
        const formData = new FormData();
        formData.append('upload_preset',"segebppr");
        formData.append('file', imageData);
        
        const response = await axios.post("https://api.cloudinary.com/v1_1/furnitureappimages/image/upload",formData);
        
        const imgUrl = response.data.url;
        // formData.append('image', imageData);
        // formData.append('title', values.title);
        // formData.append('price', values.price);
        // formData.append('description', values.description);
        
        let tagIds = [];
        for(let t of values.tags){
            for(let opt of tagOptions){
                if(t===opt.title){
                    tagIds.push(opt.id)
                }
            }
        }
        // formData.append('tagIds',tagIds)
        
        const res = await axios.post("http://localhost:4000/items/",{...values,tagIds,imgUrl},{withCredentials:true});
        console.log(res.data)
        
        dispatch(addItem({id:res.data,...values}))
        setTitle("");
        setDescription("");
        setPrice("");
        setTags([]);
        
        navigate('../store') 
    }
    const handleUpdate = async(values)=>{
        // let tagIds = [];
        // for(let t of tags){
        //     for(let opt of tagOptions){
        //         if(t===opt.title){
        //             tagIds.push(opt.id)
        //         }
        //     }
        // }
        // const newItem = {title,description,price,tagIds}
        // await axios.put(AppUrl.Items+data.id,newItem);
        
        // dispatch(updateItem({id:data.id,title,description,price,tags}))
        // navigate('../store') 
    }
  
    return (
        <div className="details-cnt">
            <Form 
                // encType='multipart/form-data'
                // method='POST'
                // action={AppUrl.Items+'upload'}
                className="form"
                onFinish={(values)=>{
                    isNew ? handleAdd(values) : handleUpdate(values);
                }}
                initialValues={{
                    'tags': tags,
                    'title':title,
                    'description':description,
                    'price':price
                }}
                >
                <Form.Item name='title'>
                    <Input
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Form.Item>
                <Form.Item 
                    style={{ width: 200, marginBottom: 10, userSelect:"none" }}
                    value = {tags}
                    name='tags'
                    rules={[{type: 'array' }]}
                    
                >
                    <Select 
                        mode="multiple" 
                        placeholder="Select tags"
                        onChange={(e)=>setTags(e)}
                    >
                        {tagOptions.map(tag=>(
                            <Select.Option 
                                key={tag.id} 
                                value={tag.title}>
                                    {tag.title}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name='price'>
                    <InputNumber
                        placeholder="price"
                        value={price}
                        onChange={(e) => setPrice(e)}
                    />
                </Form.Item>
                <Form.Item name='description'>
                    <TextArea
                        placeholder="description"
                        cols={30}
                        rows={6}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Item>
                <Form.Item valuePropName='image' onChange={handleChange}>
                    <Upload 
                        customRequest={(e)=>{
                            console.log(e)
                       }}
                       showUploadList = {false}
                        
                    >
                        <div className='upload-cnt'>
                            <PlusOutlined/>
                            <div>
                                Upload
                            </div>
                        </div>
                    </Upload>
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ItemForm;
