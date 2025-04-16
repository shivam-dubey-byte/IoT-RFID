import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./ViewItems.css";

const socket = io("https://rfid.shivamrajdubey.tech");

const ViewItems = () => {
  const [stockItems, setStockItems] = useState([]);
  const [soldItems, setSoldItems] = useState([]);
  const [tempNotification, setTempNotification] = useState("");

  const fetchData = () => {
    fetch("https://rfid.shivamrajdubey.tech/api/stock")
      .then((res) => res.json()).then(setStockItems);
    fetch("https://rfid.shivamrajdubey.tech/api/sold")
      .then((res) => res.json()).then(setSoldItems);
  };

  useEffect(() => {
    fetchData();

    socket.on("dataUpdated", (payload) => {
      if (payload.collection === "TEMP" && payload.operationType === "insert") {
        setTempNotification("⚠️ New RFID scanned and added to TEMP");
        setTimeout(() => setTempNotification(""), 4000);
      }

      // Refresh STOCK and SOLD if relevant
      if (["STOCK", "SOLD"].includes(payload.collection)) {
        fetchData();
      }
    });

    return () => socket.off("dataUpdated");
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
      {tempNotification && <div className="temp-alert">{tempNotification}</div>}
      {renderTable("📦 STOCK Items", stockItems)}
      {renderTable("🛒 SOLD Items", soldItems)}
    </div>
  );
};

export default ViewItems;
