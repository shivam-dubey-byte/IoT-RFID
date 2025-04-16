import { useState } from "react";
import "./AddItemForm.css";

const AddItemForm = ({ onDataUpdated }) => {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            setStatus("Please enter a name.");
            return;
        }

        setLoading(true);
        setStatus("");

        try {
            const response = await fetch("https://rfid.shivamrajdubey.tech/api/stock", {//http://localhost:5010/api/stock
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name }),
            });

            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error("Non-JSON response from server");
            }

            const data = await response.json();
            console.log("Response:", data);

            setStatus("✅ Successfully sent: " + data.status);
            setName("");
            onDataUpdated(); // Trigger reload
        } catch (error) {
            console.error("❌ Error:", error);
            setStatus("❌ Failed to send. Check API or server logs.");
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
