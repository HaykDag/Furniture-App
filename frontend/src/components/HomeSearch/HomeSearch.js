import { useEffect, useState } from "react";
import { AppUrl } from "../AppData";
import "./homeSearch.css";
import { Button, Input, Select } from "antd";
import axios from "axios";

const HomeSearch = ({
    searchTag,
    setSearchTag,
    setSearchText,
    setCurrentPage,
}) => {
    const [tagOptions, setTagOptions] = useState([]);

    const getCategories = () => {
        axios.get(AppUrl.Categories).then((res) => {
            setTagOptions(res.data.result);
        });
    };
    useEffect(() => {
        getCategories();
    }, []);

    const handleSeach = (value) => {
        setCurrentPage(1);
        setSearchText(value);
    };

    return (
        <div className="search-input-tag-cnt">
            <div className="input-cnt">
                <Input.Search placeholder="search..." onSearch={handleSeach} />
            </div>
            <div className="CategoryFilter-cnt">
                <Select
                    className="CategoryFilter"
                    onChange={(value) => setSearchTag(value)}
                    value={searchTag === "" ? "filter..." : searchTag}
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
    );
};

export default HomeSearch;
