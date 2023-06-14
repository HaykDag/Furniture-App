import { Table, Input } from "antd"
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import { useEffect, useState } from "react";

const ListView = (props) => {
    const { columns, getUrl, deleteUrl, isCategory = false} = props;

    const [searchText,setSearchText] = useState('');
    const [addText,setAddText] = useState("")
    const [data, setData] = useState([]);
    axios.defaults.withCredentials = true
    const cols = [
        ...columns,
        {
            filteredValue:[searchText],
            onFilter: (value, record) => {
              return (
                record?.title?.toLowerCase().includes(value.toLowerCase()) ||
                record?.tags?.join(",").toLowerCase().includes(value.toLowerCase())||
                record?.userName?.toLowerCase().includes(value.toLowerCase())
              )
            },
        },
        {
            title: "Delete", 
            dataIndex: "action",
            render:(_,record)=>{
                return (
                        <DeleteOutlined 
                        style={{fontSize:"20px"}}
                            onClick={()=>handleDelete(record._id)}
                        />
                )
            }
        }
    ] 
    

const getData = () => {
        axios.get(getUrl)
        .then((res) => {
           setData(res.data.map(d => ({ ...d,key: d._id})));
        });
};

useEffect(() => {
    getData();
}, []);

const handleDelete = async (id)=>{
    const response = await axios.delete(deleteUrl+id,{withCredentials:true});
    if(response.status === 200){
        const newData = data.filter(d=>d._id!==id);
        setData(newData);
    }
}
const handleAdd = async (e)=>{
    e.preventDefault();
    const response = await axios.post(getUrl,{title:addText});
    
    if(response.status === 200){
        const newData = [...data,{key:Math.random(),title:addText}]
        setData(newData);
        setAddText("");
    }
    
}
    return (
        <div className="table-cnt">
        <div className="table-header">
            {isCategory && <form className="add-form" onSubmit={handleAdd}>
                <input
                    placeholder="add a new Category"
                    value={addText}
                    onChange={(e) => setAddText(e.target.value)}
                />
                <PlusCircleOutlined 
                    className="plus-icon"
                    type="submit"
                />
            </form>}
            <Input
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="search..."
            />
        </div>
        <Table
            columns={cols}
            dataSource={data}
        ></Table>
    </div>
    )
}

export default ListView;