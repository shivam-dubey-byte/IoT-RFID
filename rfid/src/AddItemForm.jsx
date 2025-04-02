import { useState } from "react";

const AddItemForm = () => {
    const [inputValue, setInputValue] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!inputValue.trim()) {
            alert("Please enter a value!");
            return;
        }

        try {
            const response = await fetch("https://rfid.shivamrajdubey.tech/stock", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: inputValue }),
            });

            const data = await response.json();
            console.log("Response:", data);
            alert(data.status || "Success!");

            // Clear input after submission
            setInputValue("");
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to send data.");
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h2>Add ID</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter ID"
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
