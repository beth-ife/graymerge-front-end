import React, {Component} from 'react';

import {Table, Button, message} from 'antd';
import ProductDetails from "./ProductDetails";
import NewProduct from "./NewProduct";
import {APICall} from "../global/api_calls";

const columns = [
    {title: 'Image', width: 50, dataIndex: 'image', key: 'image'},
    {title: 'Name', width: 50, dataIndex: 'name', key: 'name'},
    {title: 'Price', width: 50, dataIndex: 'price', key: 'price'},
    {
        title: 'Actions',
        key: 'actions',
        dataIndex: 'actions',
        // fixed: 'right',
        width: 50,
        //render: () => <a href="javascript:;">view</a>,
    },
];


class Products extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            currencies: [],
            isVisible: false,
            productId: ''

        }
    }

    closeDrawer = () => {
        this.setState({
            isVisible: false,

        });
    };
    closePDrawer = () => {
        this.setState({

            isVisible_new: false
        });
    };

    showDrawer = (productId) => {
        this.setState({productId}, () => {
            //get product details and pass down to drawer
            APICall('/products/view-one-product/' + this.state.productId, 'get').then(resp => {
                console.log(resp.data)
                this.setState({current_product: resp.data,},()=>{
                    this.setState({isVisible: true})
                } )
            }).catch(err => {

                message.error(err.data && err.data.meta ? err.meta.message : 'API Error');
            })
            //this.setState({isVisible: true})
        })
    }

    showNewPDrawer = () => {
        this.setState({isVisible_new: true})
    }

    getCurrencies = () => {
        APICall('/currencies/view-currencies/', 'get').then(resp => {
            this.setState({currencies: resp.data})
        }).catch(err => {

            message.error(err.data && err.data.meta ? err.meta.message : 'API Error');
        })
    }
    getColorsAvailable = () => {
        APICall('/colors/view-colors/', 'get').then(resp => {
            this.setState({colors: resp.data})
        }).catch(err => {

            message.error(err.data && err.data.meta ? err.meta.message : 'API Error');
        })
    }

    getProductCategories = () => {
        APICall('/categories/view-categories/', 'get').then(resp => {
            this.setState({categories: resp.data})
        }).catch(err => {

            message.error(err.data && err.data.meta ? err.meta.message : 'API Error');
        })
    }

    getProducts = () => {
        APICall('/products/view-products/', 'get').then(resp => {
            this.setState({
                data: resp.data.map(product => {
                    product.price = `${product.currency.symbol} ${product.price}`
                    product.actions = <Button onClick={() => {
                        this.showDrawer(product.id);
                    }}>view</Button>;
                    product.image = (<img style={{width: '20%'}}
                                          src={product.images[0] ? product.images[0].image : ''}/>);

                    return product;
                })
            })
        }).catch(err => {

            message.error(err.data && err.data.meta ? err.meta.message : 'API Error');
        })
    }

    componentDidMount() {
        this.getCurrencies();
        this.getProductCategories();
        this.getColorsAvailable();
        this.getProducts();


    }

    render() {
        return (
            <div>
                <div style={{marginBottom: '3%', display: 'flex', justifyContent: 'flex-end'}}><Button
                    onClick={this.showNewPDrawer}>New Product</Button></div>
                <Table columns={columns} dataSource={this.state.data}/>
                <ProductDetails product={this.state.current_product} closeDrawer={this.closeDrawer}
                                productId={this.state.productId}
                                drawer_visible={this.state.isVisible}/>
                <NewProduct colors={this.state.colors} categories={this.state.categories}
                            currencies={this.state.currencies}
                            closeDrawer={this.closePDrawer}
                            productId={this.state.productId}
                            drawer_visible_new={this.state.isVisible_new}/>
            </div>
        );
    }
}

export default Products;
