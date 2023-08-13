import "./index.css";
import { Table, Input } from "antd";
import { DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { pageSize } from "../../components/AppData";
const ListView = (props) => {
    const { columns, getUrl, deleteUrl, isCategory = false } = props;

    const [searchText, setSearchText] = useState("");
    const [addText, setAddText] = useState("");
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(1);

    axios.defaults.withCredentials = true;

    const cols = [
        ...columns,
        {
            filteredValue: [searchText],
            onFilter: (value, record) => {
                return (
                    record?.title
                        ?.toLowerCase()
                        .includes(value.toLowerCase()) ||
                    record?.tags
                        ?.join(",")
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                    record?.username
                        ?.toLowerCase()
                        .includes(value.toLowerCase()) ||
                    record?.id == value ||
                    record?.user_id == value
                );
            },
        },
        {
            title: "Delete",
            dataIndex: "action",
            render: (_, record) => {
                return (
                    <DeleteOutlined
                        style={{ fontSize: "20px" }}
                        onClick={() => handleDelete(record.key)}
                    />
                );
            },
        },
    ];

    const getData = () => {
        axios
            .get(
                `${getUrl}?page=${currentPage}&pageSize=${pageSize}&value=${searchText}`
            )
            .then((res) => {
                setTotal(res.data.total);
                setData(res.data.result.map((d) => ({ ...d, key: d.id })));
            });
    };

    useEffect(() => {
        getData();
    }, [currentPage, searchText]);

    const handleDelete = async (id) => {
        await axios.delete(deleteUrl + id, { withCredentials: true });
        const newData = data.filter((d) => d.key !== id);
        setData(newData);
    };
    const handleAdd = async (e) => {
        e.preventDefault();
        const response = await axios.post(getUrl, { title: addText });

        const newData = [...data, { key: response.data.id, title: addText }];
        setData(newData);
        setAddText("");
    };

    return (
        <div className="table-cnt">
            <div className="table-header">
                {isCategory && (
                    <form className="add-form" onSubmit={handleAdd}>
                        <input
                            placeholder="add a new Category"
                            value={addText}
                            onChange={(e) => setAddText(e.target.value)}
                        />
                        <PlusCircleOutlined
                            className="plus-icon"
                            type="submit"
                        />
                    </form>
                )}
                <Input
                    onChange={(e) =>
                        setTimeout(() => {
                            setCurrentPage(1);
                            setSearchText(e.target.value);
                        }, 1500)
                    }
                    placeholder="search..."
                />
            </div>
            <Table
                columns={cols}
                dataSource={data}
                pagination={{
                    pageSize,
                    total,
                    onChange: (page) => {
                        setCurrentPage(page);
                    },
                }}
            ></Table>
        </div>
    );
};

export default ListView;
