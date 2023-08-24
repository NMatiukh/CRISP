import React from 'react';
import './ProductCard.scss';
import Meta from "antd/es/card/Meta";
import {Card, Space, Typography} from "antd";
import ColorBox from "../ColorBox/ColorBox";

const ProductCard = ({value, index}) => {
    return (
        <Card
            className={'product-card'}
            bordered={false}
            hoverable
            cover={<img alt={value.name}
                        src={value.photo}/>}
        >
            <Meta title={value.name} description={<Space direction={"vertical"}>
                <Typography.Text type={"secondary"}>
                    {value.short_description}
                </Typography.Text>
                <Typography.Text strong level={5}>
                    {value.price.toFixed(2)} EUR
                </Typography.Text>
                <Space wrap>
                    {
                        value.color.map((value, index) =>
                            <ColorBox disabled key={index} color={{value: value}}
                                      onClick={() => {
                                      }}/>)
                    }
                </Space>
            </Space>}/>
        </Card>
    );
};

export default ProductCard;