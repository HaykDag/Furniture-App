import { useParams } from "react-router-dom";
import ItemForm from "../../Shared/ItemForm";
import NotFound from "../NotFound/NotFound";
import { useEffect, useState } from "react";
import axios from "axios";
import { AppUrl } from "../../components/AppData";

const OrderDetails = () => {
    const [data, setData] = useState();
    const { id } = useParams();

    const getOrder = async () => {
        try {
            const res = await axios(`${AppUrl.Orders}/${id}`);
            setData(res.data[0]);
        } catch (err) {
            setData(err.response.data.error);
        }
    };

    useEffect(() => {
        getOrder();
    }, [id]);

    return (
        <>
            {!data ? (
                <NotFound />
            ) : (
                <ItemForm daddy="OrderDetails" data={data} />
            )}
        </>
    );
};

export default OrderDetails;
