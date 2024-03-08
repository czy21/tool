import React from 'react';
import Home from "@/layout/Home";
import {BrowserRouter} from "react-router-dom";
import {ConfigProvider} from 'antd';

// const store = createStore(rootReducer);

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <ConfigProvider theme={{
                token: {
                    colorLink: "#555",
                    colorLinkHover: "#000",
                    linkDecoration: "underline",
                },
                components: {
                    Cascader: {
                        controlItemWidth: 180
                    }
                }
            }}>
                <Home/>
            </ConfigProvider>
        </BrowserRouter>
    )
}

export default App;
