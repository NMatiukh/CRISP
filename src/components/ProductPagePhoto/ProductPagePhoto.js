import React from 'react';
import './ProductPagePhoto.scss';
import {Col, Image, Row} from "antd";

const ProductPagePhoto = ({photo, setActiveImage, activeImage}) => {
    return (
        <Row>
            <Col span={4}>
                <div className={'product-page-photo'}>
                    <img className={activeImage === `${photo}1?set=set3` ? 'product-page-photo-active' : ''}
                         onClick={() => {
                             setActiveImage(`${photo}1?set=set3`)
                         }} src={`${photo}1?set=set3`} alt=""/>
                    <img className={activeImage === `${photo}2?set=set3` ? 'product-page-photo-active' : ''}
                         onClick={() => {
                             setActiveImage(`${photo}2?set=set3`)
                         }} src={`${photo}2?set=set3`} alt=""/>
                    <img className={activeImage === `${photo}3?set=set3` ? 'product-page-photo-active' : ''}
                         onClick={() => {
                             setActiveImage(`${photo}3?set=set3`)
                         }} src={`${photo}3?set=set3`} alt=""/>
                </div>
            </Col>
            <Col span={20} className={'product-page-photo-main'}>
                <img src={activeImage} alt=""/>
            </Col>
        </Row>
    );
};

export default ProductPagePhoto;