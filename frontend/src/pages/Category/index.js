import './index.css'
import { AppUrl } from "../../components/AppData";
import ListView from "../../Shared/ListView";

const Category = ()=>{

    const columns = [
        {title: "Title", 
        dataIndex: "title",
        },
    ];

  
    return <ListView 
                columns={columns} 
                getUrl={AppUrl.Categories}
                isCategory = {true} 
            />
}
export default Category;