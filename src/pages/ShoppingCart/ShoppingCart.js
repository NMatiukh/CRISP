import React from 'react';
import './ShoppingCart.scss';
import {useSelector} from "react-redux";
import {Space} from "antd";

const ShoppingCart = () => {
    const data = useSelector(state => state.shoppingCardProducts.data)
    return (
        <Space>
            {
                data.map(value => value.product.price * value.count)
            }
        </Space>
    );
};

export default ShoppingCart;