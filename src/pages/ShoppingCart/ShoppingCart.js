import React, {useEffect, useState} from 'react';
import './ShoppingCart.scss';
import {useDispatch, useSelector} from "react-redux";
import {Checkbox, Col, Divider, Form, Input, Radio, Row, Select, Space, Table} from "antd";
import Counter from "../../components/Counter/Counter";
import ColorBox from "../../components/ColorBox/ColorBox";
import {clearShoppingCard, editProductToShoppingCard} from "../../redux/actions";
import Button from "../../components/Button/Button";
import CollapseBox from "../../components/CollapseBox/CollapseBox";
import {DeleteOutlined, HighlightOutlined, MinusOutlined, PlusOutlined, ScissorOutlined} from "@ant-design/icons";
import axios from "axios";


const ShoppingCart = () => {
    const [data, setData] = useState();
    const dispatch = useDispatch();
    const shoppingCardProducts = useSelector(state => state.shoppingCardProducts.data)
    const [showCollapseBox, setShowCollapseBox] = useState(false);
    const [countryData, setCountryData] = useState([]);
    const [selectValueCountry, setSelectValueCountry] = useState();
    const [selectCities, setSelectCities] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectCityValue, setSelectCityValue] = useState();
    const handleRadioChange = (e) => {
        setSelectedOption(e.target.value);
    };

    useEffect(() => {
        setData(shoppingCardProducts)
    }, [shoppingCardProducts]);

    useEffect(() => {
        axios
            .get('https://countriesnow.space/api/v0.1/countries')
            .then((res) => {
                setCountryData(res.data.data)
            })
    }, []);
    useEffect(() => {
        if (countryData.length) {
            setSelectValueCountry(countryData[0].country)
        }
    }, [countryData]);

    useEffect(() => {
        const uniqueCities = [...new Set(countryData.find(value => value.country === selectValueCountry)?.cities)];

        const options = uniqueCities.map(value => ({
            value: value,
            label: value
        }));
        setSelectCities(options)
    }, [selectValueCountry]);
    const columns = [
        {
            title: 'PRODUCT',
            dataIndex: "",
            key: 'product',
            render: (value) => <Space>
                <div>
                    <img src={value.image} style={{maxWidth: 100}} alt=""/>
                </div>
                <div>
                    <Space direction={"vertical"}>
                        <div style={{
                            color: "#000",
                            fontFamily: "Oswald",
                            fontSize: 18,
                            width: "4em"
                        }}>
                            {value.name}
                        </div>
                        <div>
                            <ColorBox disabled color={{value: value.color}}/>
                        </div>
                    </Space>
                </div>
            </Space>
        },
        {
            title: 'PRICE',
            dataIndex: "price",
            key: 'price',
            render: (value) => value.toFixed(2) + ' EUR'
        },
        {
            title: 'SIZE',
            dataIndex: "size",
            key: 'size',
        },
        {
            title: 'Quantity',
            dataIndex: '',
            key: 'quantity',
            render: (value) => {
                return <Counter counterValue={value.quantity} setCounterValue={(quantity) => {
                    dispatch(editProductToShoppingCard(value, quantity))
                }}/>

            }

        },
        {
            title: 'Total',
            dataIndex: '',
            key: 'Total',
            render: (value) => (value.price * value.quantity).toFixed(2) + " EUR"
        },
        {
            title: '',
            dataIndex: 'address',
            key: 'address',
            render: (value) => {
                return (
                    <Space>
                        <HighlightOutlined/>
                        <ScissorOutlined/>
                        <DeleteOutlined/>
                    </Space>
                )
            }
        },
    ];
    return (
        <Space direction={"vertical"} className={'shopping-cart'}>
            <Row justify={"center"}>
                <h1 className={'shopping-cart-title'}>Shopping Cart</h1>
            </Row>
            <Row justify={"space-around"}>
                <Col span={12}>
                    <Space style={{width: '100%'}} direction={"vertical"}>
                        <Table rowKey={value => value.id} dataSource={data} columns={columns}/>
                        <Row justify={"space-between"}>
                            <Button style={{width: "30%"}}>
                                continue shopping
                            </Button>
                            <Button style={{width: "30%"}} onClick={() => dispatch(clearShoppingCard())}>
                                clear shopping cart
                            </Button>
                        </Row>
                    </Space>
                </Col>
                <Col span={8}>
                    {
                        !!data && <>
                            <div className={'shopping-cart-window'}>
                                <div style={{padding: "30px 30px 30px 30px"}}>
                                    <div className={'container'}>
                                        <Row justify={"space-between"} className={'main-text'}>
                                            <p>
                                                Apply Discount Code
                                            </p>
                                        </Row>
                                        <Row>
                                            <div className={'shopping-cart-discount-input'}>
                                                <Input bordered={false} placeholder={'Enter discount code'}/>
                                                <button>
                                                    Apply Discount
                                                </button>
                                            </div>
                                        </Row>
                                        <Row justify={"space-between"} className={'text'}>
                                            <Row justify={"space-between"} className={'main-text'} style={{width: '100%'}}>
                                                <p>Estimate Shipping and Tax</p>
                                                <div style={{cursor: "pointer"}}
                                                     onClick={() => setShowCollapseBox(!showCollapseBox)}>
                                                    {
                                                        showCollapseBox ?
                                                            <PlusOutlined/> :
                                                            <MinusOutlined/>

                                                    }
                                                </div>

                                            </Row>
                                        </Row>
                                        {
                                            !showCollapseBox &&
                                            <Form
                                                className={'shopping-cart-form'}
                                                labelCol={{
                                                    span: 10,
                                                }}
                                                wrapperCol={{
                                                    span: 14,
                                                }}
                                            >
                                                <Form.Item
                                                    label={'Country'}
                                                    required={true}
                                                    colon={false}
                                                >
                                                    <Select defaultActiveFirstOption={true}
                                                            onChange={(value) => setSelectValueCountry(value)}
                                                            options={countryData.map((value) => {
                                                                return {
                                                                    value: value.country,
                                                                    label: value.country
                                                                }
                                                            })}
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    label={'State/Province'}
                                                    required={true}
                                                    colon={false}
                                                >
                                                    <Select onChange={value => setSelectCityValue(value)}
                                                            value={selectCityValue}
                                                            options={selectCities}/>
                                                </Form.Item>
                                                <Form.Item
                                                    label={'Zip/Postal Code'}
                                                    colon={false}
                                                >
                                                    <Input/>
                                                </Form.Item>
                                                <Form.Item
                                                    colon={false}
                                                    label={<span className={'text'}>Flat Rate</span>}
                                                    labelCol={{span: 24}}
                                                    wrapperCol={{span: 24}}
                                                >
                                                    <Radio
                                                        value="flatRate"
                                                        onChange={handleRadioChange}
                                                        checked={selectedOption === 'flatRate'}
                                                    >
                                                        Fixed 5.00 EUR
                                                    </Radio>
                                                </Form.Item>
                                                <Form.Item
                                                    colon={false}
                                                    label={<span className={'text'}>Best Way</span>}
                                                    labelCol={{span: 24}}
                                                    wrapperCol={{span: 24}}
                                                >
                                                    <Radio
                                                        value="tableRate"
                                                        onChange={handleRadioChange}
                                                        checked={selectedOption === 'tableRate'}
                                                    >
                                                        Table Rate 10.00 EUR
                                                    </Radio>
                                                </Form.Item>
                                            </Form>
                                        }

                                    </div>
                                </div>
                            </div>
                            <div className={'shopping-cart-window'}>
                                <div style={{padding: "30px 30px 0 30px"}}>
                                    <div className={'container'}>
                                        <Row justify={"space-between"} className={'text'}>
                                            <p>
                                                Subtotal
                                            </p>
                                            <p>
                                                {data.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)} EUR
                                            </p>
                                        </Row>
                                        <Row justify={"space-between"} className={'text'}>
                                            <p>
                                                Tax
                                            </p>
                                            <p>
                                                0.00 EUR
                                            </p>
                                        </Row>
                                        <Row justify={"space-between"} className={'main-text'}>
                                            <p>
                                                Order Total
                                            </p>
                                            <p>
                                                {data.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)} EUR
                                            </p>
                                        </Row>
                                    </div>
                                    <Divider/>
                                </div>
                                <p className={'shopping-cart-main-text-secondary'}>Check Out with Multiple Addresses</p>
                                <Button style={{width: '100%'}} type={"primary"}>proceed to checkout</Button>
                            </div>
                        </>
                    }

                </Col>
            </Row>
        </Space>
    );
};

export default ShoppingCart;