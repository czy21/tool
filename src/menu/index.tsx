import React from "react"

export interface MenuModel {
    name: string,
    path?: string
    icon?: React.ReactNode
    children?: Array<MenuModel>
}

const menus: MenuModel[] = [
    {
        name: "CF优选",
        children: [
            {
                name: "CDN",
                path: "cf-best/cdn",
            },
            {
                name: "server",
                path: "cf-best/server"
            }
        ]
    }
];
export default menus