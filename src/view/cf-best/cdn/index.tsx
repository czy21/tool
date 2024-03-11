import React from "react";
import stub from "@/init"
import {Button, Cascader, Col, Form, Input, Row, Space, Table} from "antd";
import CFBestCDNStat from "@v/cf-best/cdn/Stat";

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


const CFBestCDN: React.FC = () => {

    const [data, setData] = stub.ref.react.useState<any>({})
    const [query, setQuery] = stub.ref.react.useState<any>({})
    const [countryTree, setCountryTree] = stub.ref.react.useState<any>([])

    stub.ref.react.useEffect(() => {
        stub.api.get("cf-best/cdn/countryTree").then((t: any) => setCountryTree(t?.data.data))
        handleSearch()
    }, [])

    const handleSearch = (q: {} = query) => {
        stub.api.post("cf-best/cdn/page", stub.ref.lodash.omit(q, "total")).then((t: any) => setData(t?.data.data))
    }
    const handleExport = (q: {} = query) => {
        stub.api.post("cf-best/cdn/page", stub.ref.lodash.omit(q, "total")).then((t: any) => setData(t?.data.data))
    }
    const [filter] = stub.ref.antd.Form.useForm();
    return (
        <div>
            <CFBestCDNStat/>
            <Form
                name="filter"
                form={filter}
                autoComplete="off"
            >
                <Row gutter={24} style={{width: "100%"}}>
                    <Col span={6}>
                        <Form.Item label={"位置"} name={"locations"}>
                            <Cascader
                                options={countryTree}
                                multiple
                                showSearch
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label={"IP"} name={"valueStr"}>
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={3}>
                        <Space size="small">
                            <Button type="primary" onClick={() => {
                                filter.resetFields()
                                setQuery({})
                            }}>
                                重置
                            </Button>
                            <Button type="primary" onClick={() => {
                                const q = stub.ref.lodash.omit({...query,...filter.getFieldsValue()}, "page", "pageSize")
                                setQuery(q)
                                handleSearch(q)
                            }}>
                                查询
                            </Button>
                            <Button type="primary" onClick={() => {
                                const q = stub.ref.lodash.omit({...query,...filter.getFieldsValue()}, "page", "pageSize")
                                setQuery(q)
                                handleExport(q)
                            }}>
                                导出
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Form>
            <Table dataSource={data?.list} columns={columns}
                   rowKey={(r: any) => r.id}
                   pagination={{
                       total: data?.total,
                       current: data?.page,
                       pageSize: data?.pageSize,
                       showTotal: ((total: number, range: [number, number]) => `第 ${range[0]}-${range[1]} 条/总共 ${total} 条`),
                       onChange: (page, pageSize) => {
                           const q = {...query, "page": page, "pageSize": pageSize}
                           setQuery(q)
                           handleSearch(q)
                       }
                   }}
            />
        </div>
    )
}

export default CFBestCDN