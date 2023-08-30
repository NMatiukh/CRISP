import React, {useEffect, useState} from 'react';
import './ShoppingCart.scss';
import {useDispatch, useSelector} from "react-redux";
import {Col, Divider, Row, Space, Table} from "antd";
import Counter from "../../components/Counter/Counter";
import ColorBox from "../../components/ColorBox/ColorBox";
import {editProductToShoppingCard} from "../../redux/actions";
import Button from "../../components/Button/Button";


const ShoppingCart = () => {
    const [data, setData] = useState();
    const dispatch = useDispatch();
    const shoppingCardProducts = useSelector(state => state.shoppingCardProducts.data)
    useEffect(() => {
        setData(shoppingCardProducts)
    }, [shoppingCardProducts]);

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
                        <div>
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
            dataIndex: "sizes",
            key: 'sizes',
            render: (value) => value[0]
        },
        {
            title: 'Quantity',
            dataIndex: '',
            key: 'quantity',
            render: (value) => {
                // setCounterValue(value)
                console.log(value)
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
        },
    ];
    return (
        <Space direction={"vertical"} className={'shopping-cart'}>
            <Row justify={"center"}>
                <h1 className={'shopping-cart-title'}>Shopping Cart</h1>
            </Row>
            <Row justify={"space-around"}>
                <Col span={12}>
                    <Table rowKey={value => value.id} dataSource={data} columns={columns}/>
                </Col>
                <Col span={8}>
                    {
                        !!data && <>
                            <div className={'shopping-cart-window'}>
                                <div style={{padding: "30px 30px 30px 30px"}}>
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