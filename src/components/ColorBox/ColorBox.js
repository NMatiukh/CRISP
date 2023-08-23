import React, {useEffect, useState} from 'react';
import './ColorBox.scss';
import {colors} from "../../structures";

const ColorBox = ({color, colorValues, setColorValues, disabled}) => {
    if (disabled) {
        return <div className={`color-box-disabled`}>
            <div style={{backgroundColor: color.value}} className={'color-box-item'}/>
        </div>
    } else {
        return (
            <div onClick={() =>
                setColorValues(
                    colorValues.map(item => {
                        if (item.value === color.value) {
                            return {
                                value: color.value,
                                active: !color.active
                            }
                        } else {
                            return item
                        }
                    })
                )
            }
                 className={`color-box ${color.active ? 'color-box-active' : ''}`}>
                <div style={{backgroundColor: color.value}} className={'color-box-item'}/>
            </div>
        );
    }

};

export default ColorBox;