import '@/assets/less/Home.less'
import React from "react";
import {Layout} from 'antd';
import Header from '@/layout/Header'
import Content from '@/layout/Content'
import Footer from '@/layout/Footer'

const Home: React.FC = () => {
    return (
        <Layout>
            <Header/>
            <Content/>
            <Footer/>
        </Layout>
    );
}
export default Home