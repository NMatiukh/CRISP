import React, {useEffect} from 'react';
import './ColorsContainer.scss';
import {colors} from "../../structures";
import {Space} from "antd";
import ColorBox from "../ColorBox/ColorBox";

const ColorsContainer = ({colorValues, setColorValues}) => {
    useEffect(() => {
        setColorValues(colors.map(value => {
            return {
                value: value,
                active: false
            }
        }))
    }, []);
    return (
        <Space wrap>
            {
                colorValues.map((value, index) => <ColorBox
                    colorValues={colorValues}
                    setColorValues={setColorValues}
                    color={value}
                    key={index}
                />)
            }
        </Space>
    );
};

export default ColorsContainer;