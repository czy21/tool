import React from "react";
import stub from "@/init"
import {Button, Form, Table, TreeSelect} from "antd";

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

const locationOnChange = (value: any, label: any, extra: any) => {
    console.log(extra)
}
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
    const [filter] = stub.ref.antd.Form.useForm();
    return (
        <div>
            <Form
                name="filter"
                form={filter}
                autoComplete="off"
                layout={"inline"}
            >
                <Form.Item label={"位置"} name={"location"} style={{width: "20%"}}>
                    <TreeSelect
                        showSearch
                        dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                        allowClear
                        treeCheckable
                        showCheckedStrategy={"SHOW_PARENT"}
                        onChange={locationOnChange}
                        treeData={countryTree}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={() => {
                        console.log(filter.getFieldValue("location"))
                    }}>
                        查询
                    </Button>
                </Form.Item>
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