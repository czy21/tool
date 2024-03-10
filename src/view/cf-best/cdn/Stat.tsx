import React, {useRef} from 'react';
import * as echarts from 'echarts';
import stub from "@/init";

const CFBestCDNStat: React.FC = () => {
    const todayStatRef = useRef(null)
    stub.ref.react.useEffect(() => {
        const chart = echarts.init(todayStatRef.current)
        stub.api.get("cf-best/cdn/getAggCountry").then((t: any) => {
            chart.setOption({
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: '5%',
                    left: 'center'
                },
                series: [
                    {
                        type: 'pie',
                        radius: ['50%', '70%'],
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
    return (<div style={{width: "100%", height: "300px"}} ref={todayStatRef}/>)
};
export default CFBestCDNStat;