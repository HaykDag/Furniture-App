import './index.css'
import { AppUrl } from "../../components/AppData";
import ListView from "../../Shared/ListView";
import { useDispatch } from 'react-redux';
import { fetchCategories } from '../../features/Categories/CategorySlice'
import { useEffect } from 'react';

const Category = ()=>{

    const columns = [
        {title: "Title", 
        dataIndex: "title",
        },
    ];
    const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchCategories());
  },[dispatch])
  
    return <ListView 
                columns={columns} 
                getUrl={AppUrl.Categories}
                deleteUrl={AppUrl.Categories}
                isCategory = {true} 
            />
}
export default Category;