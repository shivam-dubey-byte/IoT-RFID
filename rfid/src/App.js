import React from "react";
import AddItemForm from "./components/AddItemForm";
import ViewItems from "./components/ViewItems";

function App() {
    return (
        <div>
            <AddItemForm />
            <hr />
            <ViewItems />
        </div>
    );
}

export default App;
