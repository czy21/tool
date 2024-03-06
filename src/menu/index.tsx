import React from "react"

export interface MenuModel {
    name: string,
    path?: string
    icon?: React.ReactNode
    children?: Array<MenuModel>
    redirect?: boolean
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
                name: "Server",
                path: "cf-best/server"
            }
        ]
    },
    {
        name: "IT-Tools",
        path: "https://it-tools.tech/",
        redirect: true
    }
];
export default menus