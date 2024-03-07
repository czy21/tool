import React from "react";
import {Layout} from "antd";


const Footer: React.FC = () => {
    return (
        <Layout.Footer style={{textAlign: 'center'}}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Layout.Footer>
    );
}

export default Footer