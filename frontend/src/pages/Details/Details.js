import { useParams } from "react-router-dom";
import ItemForm from "../../Shared/ItemForm";
import { useSelector } from "react-redux";
import NotFound from "../NotFound/NotFound";
import { useEffect, useState } from "react";
import axios from "axios";
import { AppUrl } from "../../components/AppData";

const Details = () => {
    const [data, setData] = useState();
    const { id } = useParams();

    const getItem = async () => {
        try {
            const res = await axios(`${AppUrl.Items}/${id}`);
            setData(res.data);
        } catch (err) {
            setData(err.response.data.error);
        }
    };
    console.log(data);
    useEffect(() => {
        getItem();
    }, [id]);

    return <>{!data ? <NotFound /> : <ItemForm isNew={false} data={data} />}</>;
};

export default Details;
