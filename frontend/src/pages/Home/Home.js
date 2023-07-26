import Card from "../../components/Card/Card";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchItems,
    selectAllItems,
    selectTotalItems,
} from "../../features/items/itemsSlice";
import { useEffect, useState } from "react";
import { Button, Input, Select } from "antd";
import { Footer } from "antd/es/layout/layout";
import { StepBackwardOutlined, StepForwardOutlined } from "@ant-design/icons";
import { AppUrl, pageSize } from "../../components/AppData";
import axios from "axios";

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

    const handleSeach = (value) => {
        setCurrentPage(1);
        setSearchText(value);
    };

    const [tagOptions, setTagOptions] = useState([]);
    const getCategories = () => {
        axios.get(AppUrl.Categories).then((res) => {
            setTagOptions(res.data.result);
        });
    };
    useEffect(() => {
        getCategories();
    }, []);

    const pages = [];
    for (let i = 1; i <= pageCount; i++) {
        let className = "pagination";
        if (i === currentPage) className += " currentPage";
        pages.push(
            <div
                className={className}
                key={i}
                onClick={() => setCurrentPage(i)}
            >
                {i}
            </div>
        );
    }

    return (
        <div className="home-cnt">
            <div className="search-input-tag-cnt">
                <div className="input-cnt">
                    <Input.Search
                        placeholder="search..."
                        onSearch={handleSeach}
                    />
                </div>
                <div className="CategoryFilter-cnt">
                    <Select
                        className="CategoryFilter"
                        onChange={(value) => setSearchTag(value)}
                        value={searchTag}
                        placeholder="Filter"
                    >
                        {tagOptions.map((tag) => {
                            return (
                                <Select.Option key={tag.id} value={tag.title}>
                                    {tag.title}
                                </Select.Option>
                            );
                        })}
                    </Select>
                    <Button
                        className="reset-btn"
                        onClick={() => {
                            setCurrentPage(1);
                            setSearchText("");
                            setSearchTag("");
                        }}
                    >
                        Reset
                    </Button>
                </div>
            </div>
            <div className="home">
                <div className="main">
                    {items &&
                        items.map((item, i) => <Card key={i} id={item.id} />)}
                </div>
            </div>
            <Footer className="footer">
                <StepBackwardOutlined
                    style={{ fontSize: "1.5rem", color: "black" }}
                    onClick={() =>
                        currentPage !== 1 ? setCurrentPage(currentPage - 1) : ""
                    }
                />
                {pages?.map((page) => page)}
                <StepForwardOutlined
                    style={{ fontSize: "1.5rem", color: "black" }}
                    onClick={() =>
                        currentPage !== pageCount
                            ? setCurrentPage(currentPage + 1)
                            : ""
                    }
                />
            </Footer>
        </div>
    );
};

export default Home;
