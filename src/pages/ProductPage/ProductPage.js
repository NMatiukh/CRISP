import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import data from '../../server/data.json'
import axios from "axios";
import {Col, Row, Space} from "antd";
import {useDispatch, useSelector} from "react-redux";

import './ProductPage.scss'
import ColorBox from "../../components/ColorBox/ColorBox";
import SizeBox from "../../components/SizeBox/SizeBox";
import SizesContainer from "../../components/SizesContainer/SizesContainer";
import Counter from "../../components/Counter/Counter";
import Button from "../../components/Button/Button";
import {HeartOutlined} from "@ant-design/icons";
import {addProductToShoppingCard} from "../../redux/actions";
import ProductPagePhoto from "../../components/ProductPagePhoto/ProductPagePhoto";

const ProductPage = () => {
    const {productId} = useParams();
    const [sizesState, setSizesState] = useState([]);
    const [activeImage, setActiveImage] = useState('');
    const [counterValue, setCounterValue] = useState(1);
    const dispatch = useDispatch();

    const product = useSelector(state => state.products.data?.filter(value => parseInt(value.id) === parseInt(productId))[0])
    useEffect(() => {
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
                                    Women Black Checked Fit and Flare Dress
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
                                    <p className={'product-page-property-name'}>
                                        Select size (Inches) </p>
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
                    </div>

                </div>
            }
        </>

    );
};

export default ProductPage;