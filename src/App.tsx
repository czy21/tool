import React from 'react';
import Home from "@/layout/Home";
import {BrowserRouter} from "react-router-dom";

// const store = createStore(rootReducer);

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Home/>
        </BrowserRouter>
    )
}

export default App;
