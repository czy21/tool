import React from "react";
import {Layout} from 'antd';
import {useRoutes} from "react-router-dom";
import routes from "@/route";

const Content: React.FC = () => {
    return (
        <Layout.Content
        style={{
            paddingBlock:"8px",
        }}>
            {useRoutes(routes)}
        </Layout.Content>
    )
}

export default Content