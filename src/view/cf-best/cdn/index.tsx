import React from "react";
import stub from "@/init"

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

    stub.ref.react.useEffect(() => handleSearch(query), [query])

    const handleSearch = (q?: any) => {
        setQuery(q)
        stub.api.post("cf-best/cdn/page", stub.ref.lodash.omit(q, "total")).then((t: any) => setData(t.data.data))
    }

    return (
        <stub.ref.antd.Table dataSource={data.list} columns={columns}
                             pagination={{
                                 total: data.total,
                                 current: data.page,
                                 pageSize: data.pageSize,
                                 showTotal: ((t: any, r: any) => `第 ${r[0]}-${r[1]} 条/总共 ${t} 条`),
                                 onChange: (pageIndex, pageSize) =>
                                     setQuery({...query, "page": pageIndex, "pageSize": pageSize})
                             }}
        />
    )
}

export default CFBestCDN