import React, {Component} from 'react';
import {Layout, Menu, Breadcrumb} from 'antd';

import './App.css';
import Product from './components/Products';
import {base_url} from "./global/api_calls";

const {Header, Content, Footer} = Layout;

class App extends Component {

    render() {
        console.log(base_url)
        return (
            <Layout className="layout" style={{display: 'flex'}}>
                <Header>
                    <div className="logo"/>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{lineHeight: '64px'}}
                    >
                        <Menu.Item key="1">Products</Menu.Item>
                    </Menu>
                </Header>
                <Content style={{padding: '0 50px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>Products</Breadcrumb.Item>
                    </Breadcrumb>

                    <div style={{background: '#fff', padding: 24, minHeight: '75vh', width:'60%',margin:'auto'}}>
                        <Product/>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>
                    Graymerge ©2018
                </Footer>
            </Layout>
        );
    }
}

export default App;
