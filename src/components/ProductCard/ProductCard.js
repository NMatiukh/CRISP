import React, {useEffect, useState} from 'react';
import './ProductCard.scss';
import Meta from "antd/es/card/Meta";
import {Card, Space, Typography} from "antd";
import ColorBox from "../ColorBox/ColorBox";

const ProductCard = ({value, index}) => {
    const [color, setColor] = useState({});
    useEffect(() => {
        setColor({value: value.colors[0], active: true})
    }, [value]);

    return (
        <Card
            className={'product-card'}
            bordered={false}
            hoverable
            cover={
                value.images[color.value]?.length &&
                <img
                    alt={value.name}
                    src={value.images[color.value][0]}
                />
            }
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
                        value.colors.map((value, index) =>
                            <ColorBox oneColor setColorValues={setColor} colorValues={color} key={index}
                                      color={{value: value, active: false}}/>)
                    }
                </Space>
            </Space>}/>
        </Card>
    );
};

export default ProductCard;