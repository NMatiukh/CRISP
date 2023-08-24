import React, {useEffect, useState} from 'react';
import './SizesContainer.scss';
import {Space} from "antd";
import {sizes} from "../../structures";
import SizeBox from "../SizeBox/SizeBox";
import {retry} from "@reduxjs/toolkit/query";

const SizesContainer = ({sizesState, setSizesState, dataProductPage}) => {
    useEffect(() => {

        setSizesState(sizes.map(value => {
            return {
                value: value,
                active: false
            }
        }))

    }, []);
    if (dataProductPage) {
        return (
            <Space wrap>
                {sizesState.map((value, index) => {
                    const dataProduct = dataProductPage.find(item => item === value.value);

                    if (dataProduct) {
                        return (
                            <SizeBox
                                sizesState={sizesState}
                                setSizesState={setSizesState}
                                size={value}
                                key={index}
                            />
                        );
                    } else {
                        return (
                            <SizeBox
                                disabled
                                sizesState={sizesState}
                                setSizesState={setSizesState}
                                size={value}
                                key={index}
                            />
                        );
                    }
                })

                }
            </Space>
        )
    } else {
        return (
            <Space wrap>
                {sizesState.map((value, index) => <SizeBox sizesState={sizesState} setSizesState={setSizesState}
                                                           size={value} key={index}/>)}
            </Space>
        );
    }
};

export default SizesContainer;