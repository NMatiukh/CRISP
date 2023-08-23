import React from 'react';
import './DeleteFilter.scss';
import {Space} from "antd";
import {CloseOutlined} from "@ant-design/icons";

const DeleteFilter = ({children, onClick}) => {
    return (
        <Space onClick={onClick} className={'delete-filter'}>
            <CloseOutlined/>
            {children}
        </Space>
    );
};

export default DeleteFilter;