//use this form to add a new Item or edit an existing one.
import './index.css'
import { Button, Form, Input, InputNumber, Select} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addItem, updateItem, } from "../../features/items/itemsSlice";
import { useNavigate } from "react-router-dom";
import { AppUrl } from "../../components/AppData";

const ItemForm = (props) => {

    const {data,isNew = false} = props;
    
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
    
    const handleAdd = async()=>{
        let tagIds = [];
        for(let t of tags){
            for(let opt of tagOptions){
                if(t===opt.title){
                    tagIds.push(opt.id)
                }
            }
        }
        const newItem = {title,description,price,tagIds}
        const res = await axios.post(AppUrl.Items,newItem);

        dispatch(addItem({id:res.data.id,title,description,price,tags}))
        setTitle("");
        setDescription("");
        setPrice("");
        setTags([]);
        
        navigate('../store') 
    }
    const handleUpdate = async()=>{
        let tagIds = [];
        for(let t of tags){
            for(let opt of tagOptions){
                if(t===opt.title){
                    tagIds.push(opt.id)
                }
            }
        }
        const newItem = {title,description,price,tagIds}
        await axios.put(AppUrl.Items+data.id,newItem);
        
        dispatch(updateItem({id:data.id,title,description,price,tags}))
        navigate('../store') 
    }

    return (
        <div className="details-cnt">
            <Form 
                className="form"
                onFinish={ isNew ? handleAdd : handleUpdate}
                initialValues={{'tags': tags}}
                >
                <Form.Item>
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
                <Form.Item>
                    <InputNumber
                        placeholder="price"
                        value={price}
                        onChange={(e) => setPrice(e)}
                    />
                </Form.Item>
                <Form.Item>
                    <TextArea
                        placeholder="description"
                        cols={30}
                        rows={6}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ItemForm;
