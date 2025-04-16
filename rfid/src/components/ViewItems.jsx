import React, { useEffect, useState } from "react";
import "./ViewItems.css";

const ViewItems = () => {
    const [stockItems, setStockItems] = useState([]);
    const [soldItems, setSoldItems] = useState([]);

    useEffect(() => {
        fetch("https://rfid.shivamrajdubey.tech/api/stock")//"http://localhost:5010/api/stock"
            .then(res => res.json())
            .then(data => setStockItems(data))
            .catch(err => console.error("Failed to fetch stock items:", err));

        fetch("https://rfid.shivamrajdubey.tech/api/sold")
            .then(res => res.json())
            .then(data => setSoldItems(data))
            .catch(err => console.error("Failed to fetch sold items:", err));
    }, []);

    const renderTable = (title, items) => (
        <div className="table-section">
            <h2>{title}</h2>
            <div className="table-wrapper">
                <table className="lux-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>ID</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, idx) => (
                            <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>{item.id}</td>
                                <td>{item.name || "-"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div className="view-items-container">
            {renderTable("📦 STOCK Items", stockItems)}
            {renderTable("🛒 SOLD Items", soldItems)}
        </div>
    );
};

export default ViewItems;
