import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Col, List, Row, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import './ProductPage.scss';
import ColorBox from '../../components/ColorBox/ColorBox';
import SizesContainer from '../../components/SizesContainer/SizesContainer';
import Counter from '../../components/Counter/Counter';
import Button from '../../components/Button/Button';
import { HeartOutlined } from '@ant-design/icons';
import { addProductToShoppingCard } from '../../redux/actions';
import ProductPagePhoto from '../../components/ProductPagePhoto/ProductPagePhoto';
import CollapseBox from '../../components/CollapseBox/CollapseBox';
import ProductCard from '../../components/ProductCard/ProductCard';

const description = {
    about_product: 'Cool off this summer in the Mini Ruffle Smocked Tank Top from our very own LA Hearts. This tank features a smocked body, adjustable straps, scoop neckline, ruffled hems, and a cropped fit.',
    advantages: [
        'Smocked body',
        'Adjustable straps',
        'Scoop neckline',
        'Ruffled hems',
        'Cropped length',
        ' Model is wearing a small',
        '100% rayon',
        ' Machine washable',
    ],
    shipping: 'We offer Free Standard Shipping for all orders over $75 to the 50 states and the District of Columbia. The minimum order value must be $75 before taxes, shipping and handling. Shipping fees are non-refundable.\n Please allow up to 2 business days (excluding weekends, holidays, and sale days) to process your order.\n Processing Time + Shipping Time = Delivery Time',
};

const ProductPage = () => {
    const [color, setColor] = useState({});
    const location = useLocation();
    const { productId } = useParams();
    const [activeImage, setActiveImage] = useState(''); // Додаємо activeImage тут
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [counterValue, setCounterValue] = useState(1);
    const dispatch = useDispatch();
    const products = useSelector((state) => state.firestore.ordered.products);
    const [product, setProduct] = useState();

    useEffect(() => {
        if (product !== undefined) {
            window.scrollTo(0, 0);
            setColor({ value: product?.colors[0] });
            setSelectedSizes([product.sizes[0]]);
        }
    }, [product]);

    useEffect(() => {
        if (product?.images[color.value]?.length) {
            setActiveImage(product?.images[color.value][0]);
        }
    }, [color]);

    useEffect(() => {
        if (products !== undefined) {
            setProduct(products.find((value) => value.id === productId));
        }
    }, [products, location]);

    const handleAddToCart = () => {
        dispatch(addProductToShoppingCard(product, counterValue, color.value, selectedSizes[0]));
    };

    return (
        <>
            {product && (
                <div className="product-page">
                    <div className="product-page-details">
                        <Row justify="center">
                            <Col span={9}>
                                <ProductPagePhoto
                                    activeImage={activeImage}
                                    setActiveImage={setActiveImage}
                                    colors={product.colors}
                                    images={product.images}
                                    color={color}
                                    setColor={setColor}
                                />
                            </Col>
                            <Col span={9} className="product-page-details-properties">
                                <h1 className="product-page-title">{product.name}</h1>
                                <Space size="large" direction="vertical">
                                    <p className="product-page-property-name">Select Color</p>
                                    <Space>
                                        {product.colors.map((value, index) => (
                                            <ColorBox
                                                oneColor
                                                setColorValues={setColor}
                                                colorValues={color}
                                                key={index}
                                                color={{
                                                    value: value,
                                                    active: false,
                                                }}
                                            />
                                        ))}
                                    </Space>
                                </Space>
                                <Space size="large" direction="vertical">
                                    <Row justify="space-between">
                                        <p className="product-page-property-name">Select size (Inches) </p>
                                        <p className="product-page-property-link">Size guide</p>
                                    </Row>
                                    <Space>
                                        <SizesContainer
                                            selectedSizes={selectedSizes}
                                            setSelectedSizes={setSelectedSizes}
                                            dataProductPage={product.sizes}
                                        />
                                    </Space>
                                </Space>
                                <Space size="large" align="start">
                                    <Space size="large" direction="vertical">
                                        <p className="product-page-property-name">Quantity</p>
                                        <Counter counterValue={counterValue} setCounterValue={setCounterValue} />
                                    </Space>
                                    <Space size="large" direction="vertical">
                                        <p className="product-page-property-name">price total</p>
                                        <p className="product-page-property-price">
                                            {(counterValue * product.price).toFixed(2)} EUR
                                        </p>
                                    </Space>
                                </Space>
                                <Space size="large">
                                    <Button onClick={handleAddToCart} type="primary">
                                        Add to bag
                                    </Button>
                                    <Button type="icon" icon={<HeartOutlined />}>
                                        Save
                                    </Button>
                                </Space>
                            </Col>
                        </Row>
                        <Row justify="center">
                            <Col span={18}>
                                <CollapseBox description={description} title="Details" />
                                <CollapseBox description={description} title="Other information" />
                                <CollapseBox description={description} title="Another tab" />
                            </Col>
                        </Row>
                    </div>
                    <Row>
                        <List
                            style={{ width: '100%' }}
                            pagination={{
                                position: 'top',
                                pageSize: 5,
                                simple: true,
                                total: 10,
                                responsive: true,
                            }}
                            grid={{
                                column: 5,
                                gutter: 20,
                            }}
                            dataSource={products}
                            renderItem={(value, index) => (
                                <List.Item>
                                    <Link to={`/shop/${value.id}`}>
                                        <ProductCard key={index} value={value} index={index} />
                                    </Link>
                                </List.Item>
                            )}
                        />
                    </Row>
                </div>
            )}
        </>
    );
};

export default ProductPage;
