import React from 'react';
import './ShopIcon.scss';
import {HiOutlineShoppingBag} from "react-icons/hi2";
import {LiaShoppingBagSolid} from "react-icons/lia";

const ShopIcon = ({price}) => {
    return (
        <div className={'shop-icon'}>
            <LiaShoppingBagSolid/>
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