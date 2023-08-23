import React from 'react';
import './Button.scss';
import {Space} from "antd";

const Button = ({type, children, icon, onClick}) => {
    switch (type) {
        default: {
            return <button onClick={onClick} className={'button'}>
                {children}
            </button>
        }
        case 'primary': {
            return <button onClick={onClick} className={'button-primary'}>
                {children}
            </button>
        }
        case 'icon': {
            return <button onClick={onClick} className={'button-icon'}>
                <Space>
                    {icon}
                    {children}
                </Space>
            </button>
        }
    }
};

export default Button;