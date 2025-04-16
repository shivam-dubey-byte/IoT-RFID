import React, { useState } from "react";
import AddItemForm from "./components/AddItemForm";
import ViewItems from "./components/ViewItems";

function App() {
    const [reloadKey, setReloadKey] = useState(0);

    const handleDataUpdated = () => {
        setReloadKey(prev => prev + 1); // Fallback manual refresh
    };

    return (
        <div>
            <AddItemForm onDataUpdated={handleDataUpdated} />
            <hr />
            <ViewItems key={reloadKey} />
        </div>
    );
}

export default App;
