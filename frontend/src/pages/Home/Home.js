import Card from "../../components/Card/Card";
import Foot from "../../components/Footer/Foot";
import HomeSearch from "../../components/HomeSearch/HomeSearch";
import Chat from "../../components/Chat/Chat";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchItems,
    selectAllItems,
    selectTotalItems,
} from "../../features/items/itemsSlice";
import { useEffect, useState } from "react";
import { pageSize } from "../../components/AppData";

const Home = () => {
    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTag, setSearchTag] = useState("");

    const items = useSelector(selectAllItems);
    const totalItems = useSelector(selectTotalItems);

    const pageCount = Math.ceil(totalItems / pageSize);

    const dispatch = useDispatch();

    //fetching items as soon as app loads
    useEffect(() => {
        dispatch(
            fetchItems({
                value: searchText,
                page: currentPage,
                pageSize,
                searchTag,
            })
        );
    }, [dispatch, searchText, currentPage, searchTag]);

    return (
        <div className="home-cnt">
            <HomeSearch
                searchTag={searchTag}
                setSearchTag={setSearchTag}
                setSearchText={setSearchText}
                setCurrentPage={setCurrentPage}
            />
            <div className="home">
                <div className="main">
                    {items &&
                        items.map((item, i) => <Card key={i} id={item.id} />)}
                </div>
            </div>
            <div className="chat-cnt">
                <Chat />
            </div>
            <Foot
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pageCount={pageCount}
            />
        </div>
    );
};

export default Home;
