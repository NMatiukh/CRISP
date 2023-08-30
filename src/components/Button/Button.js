import React from 'react';
import './Button.scss';
import {Space} from "antd";

const Button = ({type, children, icon, onClick, style}) => {
    switch (type) {
        default: {
            return <button style={style} onClick={onClick} className={'button'}>
                {children}
            </button>
        }
        case 'primary': {
            return <button style={style} onClick={onClick} className={'button-primary'}>
                {children}
            </button>
        }
        case 'icon': {
            return <button style={style} onClick={onClick} className={'button-icon'}>
                <Space>
                    {icon}
                    {children}
                </Space>
            </button>
        }
    }
};

export default Button;