import { useState } from "react";
import "./AddItemForm.css";

const AddItemForm = ({ onDataUpdated }) => {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) return setStatus("Please enter a name!");

        setLoading(true);
        setStatus("");

        try {
            const response = await fetch("https://rfid.shivamrajdubey.tech/api/stock", {//http://localhost:5000/api/stock
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name }),
            });

            const data = await response.json();

            if (data.status === "No ID in TEMP") {
                setStatus("⚠️ No ID available in TEMP. Please scan an RFID first.");
            } else {
                setStatus("✅ " + data.status);
                setName("");
                onDataUpdated();
                setTimeout(() => setStatus(""), 5000); // Hide after 5 sec
            }
        } catch (error) {
            setStatus("❌ Failed to send");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <h2>Add Name</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Name"
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Processing..." : "Add"}
                </button>
            </form>
            {status && <div className="form-status">{status}</div>}
        </div>
    );
};

export default AddItemForm;
