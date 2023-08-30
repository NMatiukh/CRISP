import React, {useEffect, useState} from 'react';
import './ColorBox.scss';
import {colors} from "../../structures";

const ColorBox = ({color, colorValues, setColorValues, disabled, oneColor}) => {
    if (disabled) {
        return <div className={`color-box-disabled`}>
            <div style={{backgroundColor: color.value}} className={'color-box-item'}/>
        </div>
    } else {
        return (
            <div
                onClick={(event) => {
                    event.stopPropagation()
                    event.preventDefault()
                    setColorValues(
                        oneColor ?
                            {value: color.value, active: !color.active}
                            :
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
                }}
                className={`color-box ${oneColor ? (colorValues.value === color.value ? 'color-box-active' : '') : (color.active ? 'color-box-active' : '')}`}>
                <div style={{backgroundColor: color.value}} className={'color-box-item'}/>
            </div>
        );
    }

};

export default ColorBox;