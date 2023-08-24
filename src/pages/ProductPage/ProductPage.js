import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {Col, List, Row, Space} from "antd";
import {useDispatch, useSelector} from "react-redux";

import './ProductPage.scss'
import ColorBox from "../../components/ColorBox/ColorBox";
import SizesContainer from "../../components/SizesContainer/SizesContainer";
import Counter from "../../components/Counter/Counter";
import Button from "../../components/Button/Button";
import {HeartOutlined} from "@ant-design/icons";
import {addProductToShoppingCard} from "../../redux/actions";
import ProductPagePhoto from "../../components/ProductPagePhoto/ProductPagePhoto";
import CollapseBox from "../../components/CollapseBox/CollapseBox";
import ProductCard from "../../components/ProductCard/ProductCard";

const ProductPage = () => {
    const {productId} = useParams();
    const [sizesState, setSizesState] = useState([]);
    const [activeImage, setActiveImage] = useState('');
    const [counterValue, setCounterValue] = useState(1);
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.data)
    const product = useSelector(state => state.products.data?.filter(value => parseInt(value.id) === parseInt(productId))[0])
    useEffect(() => {
        window.scrollTo(0, 0);
        setActiveImage(`${product?.photo}1?set=set3`)
    }, [product]);
    return (
        <>
            {
                !!product &&
                <div className={'product-page'}>
                    <div className={'product-page-details'}>
                        <Row justify={"center"}>
                            <Col span={9}>
                                <ProductPagePhoto photo={product.photo} activeImage={activeImage}
                                                  setActiveImage={setActiveImage}/>
                            </Col>
                            <Col span={9} className={'product-page-details-properties'}>
                                <h1 className={'product-page-title'}>
                                    {product.name}
                                </h1>
                                <Space size={"large"} direction={"vertical"}>
                                    <p className={'product-page-property-name'}>
                                        Select Color
                                    </p>
                                    <Space>
                                        {
                                            product.color.map(value => <ColorBox key={value}
                                                                                 color={{value: value, active: false}}
                                                                                 disabled/>)
                                        }
                                    </Space>
                                </Space>
                                <Space size={"large"} direction={"vertical"}>
                                    <Row justify={"space-between"}>
                                        <p className={'product-page-property-name'}>
                                            Select size (Inches) </p>
                                        <p className={'product-page-property-link'}>Size guide</p>
                                    </Row>

                                    <Space>
                                        <SizesContainer setSizesState={setSizesState} sizesState={sizesState}
                                                        dataProductPage={product.size}/>
                                    </Space>
                                </Space>
                                <Space size={"large"} align={"start"}>
                                    <Space size={"large"} direction={"vertical"}>
                                        <p className={'product-page-property-name'}>
                                            Quantity
                                        </p>
                                        <Counter counterValue={counterValue} setCounterValue={setCounterValue}/>
                                    </Space>
                                    <Space size={"large"} direction={"vertical"}>
                                        <p className={'product-page-property-name'}>
                                            price total
                                        </p>
                                        <p className={'product-page-property-price'}>
                                            {(counterValue * product.price.toFixed(2))} EUR
                                        </p>
                                    </Space>
                                </Space>
                                <Space size={"large"}>
                                    <Button onClick={() => dispatch(addProductToShoppingCard(product, counterValue))}
                                            type={'primary'}>Add to bag</Button>
                                    <Button type={'icon'} icon={<HeartOutlined/>}>Save</Button>
                                </Space>
                            </Col>
                        </Row>
                        <Row justify={"center"}>
                            <Col span={18}>
                                <CollapseBox title={'Details'}>

                                </CollapseBox>
                                <CollapseBox title={'Other information'}>

                                </CollapseBox>
                                <CollapseBox title={'Another tab'}>

                                </CollapseBox>
                            </Col>
                        </Row>
                    </div>
                    <Row>
                        <List
                            style={{width: '100%'}}
                            pagination={{
                                position: 'top',
                                pageSize: 5,
                                simple: true,
                                total: 10,
                                responsive: true
                            }}
                            grid={{
                                column: 5,
                            }}
                            dataSource={products}
                            renderItem={(value, index) => (
                                <List.Item>
                                    <Link to={`/shop/${value.id}`}>
                                        <ProductCard key={index} value={value} index={index}/>
                                    </Link>
                                </List.Item>
                            )}
                        />
                    </Row>
                </div>
            }
        </>

    );
};

export default ProductPage;