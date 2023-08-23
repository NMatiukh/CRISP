import React, {useEffect, useState} from 'react';
import './SizesContainer.scss';
import {Space} from "antd";
import {sizes} from "../../structures";
import SizeBox from "../SizeBox/SizeBox";

const SizesContainer = ({sizesState, setSizesState}) => {
    useEffect(() => {
        setSizesState(sizes.map(value => {
            return {
                value: value,
                active: false
            }
        }))
    }, []);
    return (
        <Space wrap>
            {sizesState.map((value, index) => <SizeBox sizesState={sizesState} setSizesState={setSizesState}
                                                       size={value} key={index}/>)}
        </Space>
    );
};

export default SizesContainer;