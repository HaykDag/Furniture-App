import './details.css'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Tag } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import Upload from 'antd/es/upload/Upload';
import TextArea from 'antd/es/input/TextArea';
import { updateItems } from '../../features/items/itemsSlice';
import { useDispatch, useSelector } from 'react-redux';
import NotFound from '../NotFound/NotFound';

const Details = ()=>{

//we can have the options in another file or in the DB and import it here
  const tagOptions = ["Chair","Table","Sofa","Bed","Wood","Metal","Handmade"];

  const [componentDisabled, setComponentDisabled] = useState(true);
  const dispatch = useDispatch();

  const {id}  = useParams();
  const item = useSelector((state)=>state.items.items.find(i=>i._id===id))

  const [title,setTitle] = useState("");
  const [tags,setTags] = useState("");
  const [price,setPrice] = useState(null);
  const [description,setDescription] = useState("");
  const [images,setImages] = useState([])


  useEffect(()=>{
    setTitle(item?.title);
     setTags(item?.tags);
     setPrice(item?.price);
     setDescription(item?.description);
  },[item])


  const handleUpdate = ()=>{
    dispatch(updateItems({id,title,description,price,tags}))

    setComponentDisabled(true);
  }

  const handleTag = (tag)=>{
    if(tags.join("").includes(tag)){
        setTags([...tags].filter(t=>t!==tag))
    }else{
        setTags([...tags,tag])
    }
  }

  return(
    <>
    {!item && <NotFound />}
    {item && <div className='details-cnt'>
    <Form 
      className='form'
      disabled={componentDisabled}
      onFinish={handleUpdate}
    >
      <Form.Item  >
          <Input 
            placeholder='Title'
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
          />
        </Form.Item>
        <Form.Item style={{width:200, marginBottom:10}}  >
            {tagOptions.map((option,index)=>(
                <Tag
                 key={index}
                 onClick={()=>handleTag(option)}
                className={tags?.includes(option)?"detail-tag-have":"detail-tag"}
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
        <Form.Item valuePropName="fileList" getValueFromEvent={""}>
          <Upload action="/upload.do" listType="picture-card">
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
          <Button 
            disabled={false}
            onClick={()=>setComponentDisabled(!componentDisabled)}
          >Update</Button>
        </Form.Item>
    </Form>
      <div className='images'>
        <div className='images-cnt'>
          {item && images?.map((src,index)=>(
            <div className='image-card' key={index}>
              <DeleteOutlined 
                // onClick={()=>handleDeleteImage(index)}
                className='del-img' />
              <img alt="img" src={src}/>
            </div>
          ))}
        </div>
      </div>
      </div>}
    </>
  )
}

export default Details;