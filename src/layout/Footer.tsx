import React from "react";
import {ConfigProvider, Layout} from "antd";
import police from "@/assets/image/police.png"


const Footer: React.FC = () => {
    return (
        <ConfigProvider theme={{
            token: {
                colorLink: "#555",
                colorLinkHover: "#000",
                linkDecoration: "underline"
            }
        }}>
            <Layout.Footer style={{textAlign: 'center'}}>
                <div className="beian">
                    <a href="https://beian.miit.gov.cn" target="_blank">黑ICP备2024018382号-1</a>
                    <img src={police} alt="黑公网安备"
                         style={{
                             display: "inline-block",
                             margin: "0 3px",
                             verticalAlign: "middle"
                         }}/>
                    <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=23018302000140" target="_blank">黑公网安备 23018302000140 号</a>
                </div>
            </Layout.Footer>
        </ConfigProvider>
    );
}

export default Footer