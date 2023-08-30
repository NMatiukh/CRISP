import React, {useEffect} from 'react';
import './ProductPagePhoto.scss';
import {Col, Image, Row} from "antd";

const ProductPagePhoto = ({colors, images, setColor, color}) => {

    return (
        <Row>
            <Col span={4}>
                <div className={'product-page-photo'}>
                    {
                        colors.map((item, index) =>
                            <img key={index} className={color.value === item ? 'product-page-photo-active' : ''}
                                 onClick={() => {
                                     setColor({...color, value: item})
                                 }} src={images[item]} alt=""/>
                        )
                    }
                </div>
            </Col>
            <Col span={20} className={'product-page-photo-main'}>
                <img src={images[color.value]} alt=""/>
            </Col>
        </Row>
    );
};

export default ProductPagePhoto;