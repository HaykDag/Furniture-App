import { StepBackwardOutlined, StepForwardOutlined } from "@ant-design/icons";
import { Footer } from "antd/es/layout/layout";
import "./foot.css";

const Foot = ({ currentPage, setCurrentPage, pageCount }) => {
    //these pages are components to render in the footer for the pagination
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
    );
};

export default Foot;
