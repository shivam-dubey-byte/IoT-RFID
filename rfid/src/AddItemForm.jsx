import { useState } from "react";

const AddItemForm = () => {
    const [name, setName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            alert("Please enter a name!");
            return;
        }

        try {
            const response = await fetch("https://rfid.shivamrajdubey.tech/stock", {
                method: "GET", // GET request as required
                headers: {
                    "Content-Type": "application/json",
                },
            });

            // Check if the response is JSON
            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error("Server returned non-JSON response (possible HTML error)");
            }

            const data = await response.json();
            console.log("Response:", data);

            alert(`Data received: ${JSON.stringify(data)}`);
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to fetch data. Check API URL or Server Logs.");
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h2>Add Name</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Name"
                    style={{
                        padding: "8px",
                        fontSize: "16px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                        marginRight: "10px",
                    }}
                />
                <button
                    type="submit"
                    style={{
                        padding: "8px 15px",
                        fontSize: "16px",
                        borderRadius: "4px",
                        border: "none",
                        backgroundColor: "blue",
                        color: "white",
                        cursor: "pointer",
                    }}
                >
                    Add
                </button>
            </form>
        </div>
    );
};

export default AddItemForm;
