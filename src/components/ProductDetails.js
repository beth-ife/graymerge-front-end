/*
import { Drawer, List, Avatar, Divider, Col, Row } from 'antd';

const pStyle = {
    fontSize: 16,
    color: 'rgba(0,0,0,0.85)',
    lineHeight: '24px',
    display: 'block',
    marginBottom: 16,
};

const div = ({ title, content }) => (
    <div
        style={{
            fontSize: 14,
            lineHeight: '22px',
            marginBottom: 7,
            color: 'rgba(0,0,0,0.65)',
        }}
    >
        <p
            style={{
                marginRight: 8,
                display: 'inline-block',
                color: 'rgba(0,0,0,0.85)',
            }}
        >
            {title}:
        </p>
        {content}
    </div>
);

class App extends React.Component {
    state = { visible: false };

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <div>
                <List
                    dataSource={[
                        {
                            name: 'Lily',
                        },
                        {
                            name: 'Lily',
                        },
                    ]}
                    bordered
                    renderItem={item => (
                        <List.Item key={item.id} actions={[<a onClick={this.showDrawer}>View Profile</a>]}>
                            <List.Item.Meta
                                avatar={
                                    <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
                                }
                                title={<a href="https://ant.design/index-cn">{item.name}</a>}
                                description="Progresser AFX"
                            />
                        </List.Item>
                    )}
                />
                <Drawer
                    width={640}
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <p style={{ ...pStyle, marginBottom: 24 }}>User Profile</p>
                    <p style={pStyle}>Personal</p>
                    <Row>
                        <Col span={12}>
                            <div title="Full Name" content="Lily" />{' '}
                        </Col>
                        <Col span={12}>
                            <div title="Account" content="AntDesign@example.com" />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <div title="City" content="HangZhou" />
                        </Col>
                        <Col span={12}>
                            <div title="Country" content="China🇨🇳" />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <div title="Birthday" content="February 2,1900" />
                        </Col>
                        <Col span={12}>
                            <div title="Website" content="-" />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <div
                                title="Message"
                                content="Make things as simple as possible but no simpler."
                            />
                        </Col>
                    </Row>
                    <Divider />
                    <p style={pStyle}>Company</p>
                    <Row>
                        <Col span={12}>
                            <div title="Position" content="Programmer" />
                        </Col>
                        <Col span={12}>
                            <div title="Responsibilities" content="Coding" />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <div title="Department" content="AFX" />
                        </Col>
                        <Col span={12}>
                            <div title="Supervisor" content={<a>Lin</a>} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <div
                                title="Skills"
                                content="C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc."
                            />
                        </Col>
                    </Row>
                    <Divider />
                    <p style={pStyle}>Contacts</p>
                    <Row>
                        <Col span={12}>
                            <div title="Email" content="AntDesign@example.com" />
                        </Col>
                        <Col span={12}>
                            <div title="Phone Number" content="+86 181 0000 0000" />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <div
                                title="Github"
                                content={(
                                    <a href="http://github.com/ant-design/ant-design/">
                                        github.com/ant-design/ant-design/
                                    </a>
                                )}
                            />
                        </Col>
                    </Row>
                </Drawer>
            </div>
        );
    }
}

ReactDOM.render(<App />, mountNode);*/
import React, {Component} from 'react';
import {Drawer, List, Avatar, Divider, Col, Row} from 'antd';

const pStyle = {
    fontSize: 16,
    color: 'rgba(0,0,0,0.85)',
    lineHeight: '24px',
    display: 'block',
    marginBottom: 16,
};


class ProductDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {visible: false}
    }

    componentDidMount() {

    }


    render() {
        let Product = this.props.product;
        return (

            <Drawer
                width={640}
                placement="right"
                closable={false}
                onClose={this.props.closeDrawer}
                visible={this.props.drawer_visible}
            >
                {Product ? <div><p style={{...pStyle, marginBottom: 24}}>Product Details</p>
                    <Row>
                        <Col span={12} style={{height: '40vh'}}>
                            <div style={{height: '100%'}}>
                                <img
                                    className={'main-product-image'}
                                    src={Product.images[0] ? this.state.main_product_image || Product.images[0].image : ''}/>
                            </div>
                        </Col>
                        <Col span={12} style={{height: '40vh'}} className={'padding-2 flex row-flex'}>
                            <div><h2 className={'sentence-case'}>{Product.name}</h2></div>
                            <div style={{
                                height: '75%',
                                overflow: 'auto'
                            }}>
                                {Product.description}
                            </div>

                            <div>
                                <br/>
                                <b>Colors Available</b>
                                <Row className={'flex height-30'}>
                                    <Col span={2} style={{backgroundColor: 'red', margin: '2%'}}/>
                                    <Col span={2} style={{backgroundColor: 'blue', margin: '2%'}}/>
                                    <Col span={2} style={{backgroundColor: 'red', margin: '2%'}}/>
                                    <Col span={2} style={{backgroundColor: 'blue', margin: '2%'}}/>
                                </Row>
                                <Row className={'flex height-30'}>
                                    <Col span={12} style={{display: 'flex', justifyContent: 'center'}}>
                                        <h1>
                                            {Product.currency.symbol}&nbsp;{Product.price}
                                        </h1>
                                    </Col>

                                </Row>
                            </div>

                        </Col>
                    </Row>

                    <Divider/>

                    <Row>
                        <Col span={24} style={{width: '90%', margin: 'auto', overflowX: 'auto'}} className={'flex'}>
                            {Product.images.map((image, index) => {
                                return <div
                                    key={index}
                                    onMouseEnter={() => {
                                        this.setState({main_product_image: image.image})
                                    }}
                                    onClick={() => {
                                        this.setState({main_product_image: image.image})
                                    }
                                    } className={'centered-div img-thumbnail'}>
                                    <img

                                        className={'sub-product-image'}
                                        src={image.image}
                                    />
                                </div>
                            })}


                        </Col>
                        <
                        /Row>

                </div> :
                    'Loading..'
                    }

                    </Drawer>
                    );
                    }
                    }

                    export default ProductDetails;
