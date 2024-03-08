import React from "react";

import {Layout, Menu} from 'antd';
import {Link} from "react-router-dom";
import menus, {MenuModel} from "@/menu";


function recursiveMenu(menus: MenuModel[], parentKey?: string) {
    return menus.map((t: MenuModel, i: number) => {
        let key = parentKey ? `${parentKey}-${i}` : `${i}`
        if (t.children) {
            return (
                <Menu.SubMenu
                    key={key}
                    title={
                        <span>
                            {t.icon}
                            <span>{t.name}</span>
                        </span>
                    }
                >
                    {recursiveMenu(t.children, key)}
                </Menu.SubMenu>
            )
        }
        return (
            <Menu.Item key={key}>
                {t.icon}
                <span>{t.name}</span>
                {t.path && <Link to={t.path} target={t.redirect ? "_blank" : ""}/>}
            </Menu.Item>
        )
    })
}

const Header: React.FC = () => {
    return (
        <Layout.Header
            style={{
                position: 'sticky',
                top: 0,
                zIndex: 1,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                background: "#ffffff",
            }}
        >
            <Menu theme={"light"} mode="horizontal"
                  style={{
                      flex: 1, minWidth: 0,
                  }}>
                {recursiveMenu(menus)}
            </Menu>
        </Layout.Header>
    )
}
export default Header