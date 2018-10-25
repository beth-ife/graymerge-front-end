import React, {Component} from 'react';
import {
    Drawer,
    Input,

    Select,
    Row,
    Col,

    message,
    Button,

} from 'antd';
import ImageUpload from "./ImageUpload";
import {APICall} from "../global/api_calls";

const Option = Select.Option;

const pStyle = {
    fontSize: 16,
    color: 'rgba(0,0,0,0.85)',
    lineHeight: '24px',
    display: 'block',
    marginBottom: 16,
};


class NewProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            prodctImages: [],
            currencyId: '',
            colors: []
            // productDets: {}
        }
    }

    setProductImages = (images) => {
        this.setState({prodctImages: images})
    }
    submit = () => {
        this.validate().then(() => {
            if (!this.state.error === true) {
                APICall('/products/new-product/', 'post', this.state.product_info).then(resp => {
                    message.success(`product created!`);
                    this.props.closeDrawer()
                }).catch(err => {

                    message.error(err.data && err.data.meta ? err.meta.message : 'API Error');
                })
            }
        })

    }

    validate = async () => {
        let product_info = {...this.state.productDets}
        product_info.images = this.state.prodctImages.map(img => {
            return {image: img}
        });
        product_info.currencyId = this.state.currencyId;
        product_info.categoryId = this.state.categoryId;
        product_info.colors = this.state.colors;
        return this.setState({product_info}, () => {
            let required_fields = ['name', 'description', 'price', 'currencyId', 'categoryId'];
            return required_fields.map(req => {
                if (!this.state.product_info[req]) {
                    message.error(`${req} is a compulsory field`);
                    this.setState({error: true})


                }
            });
        })
    }

    getCurrencies = () => {
        let currencies = (this.props.currencies);


        return (
            <Select onChange={(currencyId) => {
                this.setState({currencyId})
            }} name={'currencyId'}
                    defaultValue={this.state.currencyId}
                    style={{width: 150}}>
                {
                    currencies.map((currency, i) => {
                        return <Option key={i} value={currency.id}>{currency.symbol} - {currency.name}</Option>
                    })}


            </Select>)
    };
    onChange = (e) => {
        //console.log(e)
        let product_dets = this.state.productDets || {};
        product_dets[e.target.name] = e.target.value;
        this.setState({productDets: product_dets});

    };

    componentDidMount() {
        //if we have at least 1 currency
        if (this.props.currencies[0]) {
            this.setState({currencyId: this.props.currencies[0].id})
        }
    }

    render() {
        return (
            <Drawer
                width={640}
                placement="left"
                closable={false}
                onClose={this.props.closeDrawer}
                visible={this.props.drawer_visible_new}
            >
                <p style={{...pStyle, marginBottom: 24}}>New Product</p>
                <Row>
                    <Col span={24}>
                        <div>
                            <form className={'new-product-form'}>
                                <div className={'padding-2'}><Input required
                                                                    validationErrors={{
                                                                        isDefaultRequiredValue: 'This Field is required'
                                                                    }} onChange={this.onChange}
                                                                    name={'name'}
                                                                    placeholder={'Product Name'}/></div>
                                <div className={'padding-2'}><Input required
                                                                    validationErrors={{
                                                                        isDefaultRequiredValue: 'This Field is required'
                                                                    }} onChange={this.onChange} name={'price'}
                                                                    addonBefore={this.getCurrencies()}
                                                                    placeholder={'Price'}/></div>
                                <div className={'padding-2'}><Input.TextArea required
                                                                             validationErrors={{
                                                                                 isDefaultRequiredValue: 'This Field is required'
                                                                             }} onChange={this.onChange}
                                                                             name={'description'}
                                                                             placeholder={'Product Description'}/></div>
                                <div className={'padding-2'}>
                                    <label>
                                        <b>Product Category</b>
                                        <Select required
                                                validationErrors={{
                                                    isDefaultRequiredValue: 'This Field is required'
                                                }} onChange={(categoryId) => {
                                            this.setState({categoryId})
                                        }} name={'category'} addonBefore={'Category'}
                                        >


                                            {
                                                this.props.categories && this.props.categories.map((category, index) => {
                                                    return <Option key={index}
                                                                   value={category.id}>{category.name}</Option>
                                                })
                                            }
                                        </Select>
                                    </label>
                                </div>
                                <div className={'padding-2'}>
                                    <label>
                                        <b>Colors Available</b>
                                        <Select
                                            onChange={(colors) => {
                                                this.setState({colors})
                                            }} name={'colors'}
                                            mode="multiple"
                                            placeholder="Please select"
                                            defaultValue={this.props.colors ? [this.props.colors[0].id] : []}
                                            size={'default'}
                                            //onChange={handleChange}
                                            style={{width: '100%'}}
                                        >
                                            {
                                                this.props.colors && this.props.colors.map((color, i) => {
                                                    return <Option key={i} value={color.id}>{color.name}</Option>
                                                })
                                            }
                                        </Select></label>
                                </div>
                                <div className={'padding-2'}>
                                    <label>
                                        <b>Product Images</b>

                                    </label>
                                    <ImageUpload setProductImages={this.setProductImages}/>
                                </div>
                                <div
                                    style={{
                                        // position: 'absolute',
                                        bottom: 0,
                                        width: '100%',
                                        borderTop: '1px solid #e8e8e8',
                                        padding: '10px 16px',
                                        textAlign: 'right',
                                        left: 0,
                                        background: '#fff',
                                        borderRadius: '0 0 4px 4px',
                                    }}
                                >
                                    <Button
                                        style={{
                                            marginRight: 8,
                                        }}
                                        onClick={this.props.closeDrawer}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={this.submit}
                                        disabled={!this.state.currencyId || !this.state.categoryId || !this.state.productDets}
                                        type="primary">Save Product</Button>
                                </div>

                            </form>

                        </div>

                    </Col>

                </Row>


            </Drawer>
        );
    }
}

export default NewProduct;
