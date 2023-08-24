import React, {useState} from 'react';
import './CollapseBox.scss';
import {Col, Divider, Row} from "antd";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";

const CollapseBox = ({title, children}) => {
    const [boxIsOpen, setBoxIsOpen] = useState(false);
    return (
        <div className={'collapse-box'}>
            <Row className={'collapse-box-header'} onClick={() => setBoxIsOpen(!boxIsOpen)} justify={"space-between"}
                 align={"middle"}>
                <span className={'collapse-box-header-title'}>{title}</span>
                <span>
                    {
                        boxIsOpen ? <MinusOutlined/> : <PlusOutlined/>
                    }
                </span>
            </Row>
            {
                boxIsOpen &&
                <Row className={'collapse-box-container'}>
                    <Divider/>
                    <Row>
                        {children}
                    </Row>
                </Row>

            }
        </div>
    );
};

export default CollapseBox;