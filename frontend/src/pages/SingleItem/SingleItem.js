import { useParams } from "react-router-dom";
import NotFound from "../NotFound/NotFound";
import axios from "axios";
import { useEffect, useState } from "react";
import { AppUrl } from "../../components/AppData";
import { Image } from "antd";
import "./singleItem.css";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const SingleItem = () => {
    const [data, setData] = useState({});
    const { id } = useParams();

    const getItem = async () => {
        try {
            const res = await axios(`${AppUrl.Items}/${id}`);
            setData(res.data);
        } catch (err) {
            setData(err.response.data.error);
        }
    };

    const images = data?.images?.split(",");
    const Itemtags = data.tags?.split(",");

    useEffect(() => {
        getItem();
    }, [id]);

    return data.title ? (
        <div className="item-info-cnt">
            <div className="info-cnt">
                <h1>{data.title}</h1>
                <p className="item-description">{data.description}</p>
                <p className="item-price">{data.price} &#1423;</p>
                <div className="tags-cnt">
                    {Itemtags?.map((tag, i) => (
                        <span key={i} className="item-tags">
                            {tag}
                        </span>
                    ))}
                </div>
                <p className="item-date">
                    {formatDistanceToNow(new Date(data.created), {
                        addSuffix: true,
                    })}
                </p>
            </div>
            <div className="img-cnt">
                <Image.PreviewGroup>
                    {images?.map((imgUrl, i) => (
                        <Image key={i} className="pic" src={imgUrl} />
                    ))}
                </Image.PreviewGroup>
            </div>
        </div>
    ) : (
        <NotFound />
    );
};

export default SingleItem;
