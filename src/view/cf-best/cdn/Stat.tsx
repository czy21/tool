import React, {useRef} from 'react';
import * as echarts from 'echarts';
import stub from "@/init";
import {Col, Row} from 'antd';

const CFBestCDNStat: React.FC = () => {
    const dayStatRef = useRef(null)
    const todayStatRef = useRef(null)
    stub.ref.react.useEffect(() => {
        const dayChart = echarts.init(dayStatRef.current)
        const todayChart = echarts.init(todayStatRef.current)
        stub.api.get("cf-best/cdn/getDayCountry").then((t: any) => {
            dayChart.setOption({
                title: {
                    text: '往日IP数'
                },
                tooltip: {
                    trigger: 'axis',
                    position: ['100%', "0"]
                },
                legend: {
                    top: '10%',
                    left: 'center',
                    data: t?.data.data.series.map((p: any) => p.name)
                },
                grid: {
                    top: "30%",
                    left: '2%',
                    right: '2%',
                    bottom: '2%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: t?.data.data.days
                },
                yAxis: {
                    type: 'value',
                    splitNumber: 10
                },
                series: t?.data.data.series.map((p: any) => {
                    return {...p, type: "line", stack: 'Total'}
                })
            })
        })
        stub.api.get("cf-best/cdn/getAggCountry").then((t: any) => {
            todayChart.setOption({
                title: {
                    text: "最新IP数"
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: '10%',
                    left: 'center'
                },
                series: [
                    {
                        type: 'pie',
                        top: "30%",
                        radius: ['50%', '100%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center',
                        },
                        emphasis: {
                            label: {
                                show: false,
                                fontSize: 40,
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: t?.data.data
                    }
                ]
            })
        })
    }, [])
    return (
        <Row gutter={[16, 16]} style={{height: "300px"}}>
            <Col span={12} ref={dayStatRef}/>
            <Col span={12} ref={todayStatRef}/>
        </Row>
    )
};
export default CFBestCDNStat;