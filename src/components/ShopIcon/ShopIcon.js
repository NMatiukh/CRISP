import React from 'react';
import './ShopIcon.scss';
import {ShoppingOutlined} from "@ant-design/icons";

const ShopIcon = ({price}) => {
    return (
        <div className={'shop-icon'}>
            <ShoppingOutlined/>
            <div className={'shop-icon-content'}>
                <p>Shopping Cart</p>
                <p>
                    {price || "0,00"} EUR
                </p>
            </div>
        </div>
    );
};

export default ShopIcon;