import React from "react";

import { Layout, Menu } from 'antd';
import { Link } from "react-router-dom";
import menus, { MenuModel } from "@/menu";


function recursiveMenu(menus: MenuModel[]) {
    return menus.map((t: MenuModel, i: number) => {
        if (t.children) {
            return (
                <Menu.SubMenu
                    key={i}
                    title={
                        <span>
                            {t.icon}
                            <span>{t.name}</span>
                        </span>
                    }
                >
                    {recursiveMenu(t.children)}
                </Menu.SubMenu>
            )
        }
        return (
            <Menu.Item key={i}>
                {t.icon}
                <span>{t.name}</span>
                {t.path && <Link to={t.path} target={t.redirect ? "_blank" : ""} />}
            </Menu.Item>
        )
    })
}

export default class Header extends React.Component<any, any> {
    render() {
        return (
            <Layout.Header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Menu mode="horizontal" theme="dark">
                    {recursiveMenu(menus)}
                </Menu>
            </Layout.Header>
        )
    }
}