import React from "react";
import stub from "@/init"
import {Form, Table, TreeSelect} from "antd";

const columns = [
    {
        title: 'ip',
        dataIndex: 'valueStr',
        key: 'valueStr',
    },
    {
        title: '国家',
        dataIndex: 'country',
        key: 'country',
    },
    {
        title: '国家代码',
        dataIndex: 'countryCode',
        key: 'countryCode',
    },
    {
        title: '城市',
        dataIndex: 'city',
        key: 'city',
    },
    {
        title: '区域',
        dataIndex: 'regionName',
        key: 'regionName',
    },
    {
        title: 'ISP',
        dataIndex: 'isp',
        key: 'isp',
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
    },
];

const treeData = [
    {
        value: 'parent 1',
        title: 'parent 1',
        children: [
            {
                value: 'parent 1-0',
                title: 'parent 1-0',
                children: [
                    {
                        value: 'leaf1',
                        title: 'my leaf',
                    },
                    {
                        value: 'leaf2',
                        title: 'your leaf',
                    },
                ],
            },
            {
                value: 'parent 1-1',
                title: 'parent 1-1',
                children: [
                    {
                        value: 'sss',
                        title: <b style={{color: '#08c'}}>sss</b>,
                    },
                ],
            },
        ],
    },
];

const CFBestCDN: React.FC = () => {

    const [data, setData] = stub.ref.react.useState<any>({})
    const [query, setQuery] = stub.ref.react.useState<any>({})
    const [countryTree, setCountryTree] = stub.ref.react.useState<any>([])

    stub.ref.react.useEffect(() => {
        stub.api.get("cf-best/cdn/countryTree").then((t: any) => setCountryTree(t.data.data))
        handleSearch(query)
    }, [query])

    const handleSearch = (q?: any) => {
        setQuery(q)
        stub.api.post("cf-best/cdn/page", stub.ref.lodash.omit(q, "total")).then((t: any) => setData(t.data.data))
    }

    return (
        <div>
            <Form
                name="filter"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                style={{maxWidth: 600}}
                autoComplete="off"
            >
                <TreeSelect
                    showSearch
                    style={{width: '50%'}}
                    dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                    allowClear
                    treeCheckable
                    showCheckedStrategy={"SHOW_PARENT"}
                    // onChange={onChange}
                    treeData={countryTree}
                />
            </Form>
            <Table dataSource={data.list} columns={columns}
                   pagination={{
                       total: data.total,
                       current: data.page,
                       pageSize: data.pageSize,
                       showTotal: ((total: number, range: [number, number]) => `第 ${range[0]}-${range[1]} 条/总共 ${total} 条`),
                       onChange: (page, pageSize) => setQuery({...query, "page": page, "pageSize": pageSize})
                   }}
            />
        </div>
    )
}

export default CFBestCDN