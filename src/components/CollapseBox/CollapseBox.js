import React, {useState} from 'react';
import './CollapseBox.scss';
import {Col, Descriptions, Divider, Row, Space} from "antd";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";

const CollapseBox = ({title, description}) => {
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
                    <Space wrap>
                        <Row justify={"space-between"}>
                            <Col className={'collapse-box-container-col'} span={12}>
                                <Space direction={"vertical"}>
                                    <h4>ABOUT PRODUCT</h4>
                                    <p>{description.about_product}</p>
                                </Space>
                            </Col>
                            <Col className={'collapse-box-container-col'} span={12}>
                                <Space direction={"vertical"}>
                                    <h4>SHIPPING</h4>
                                    <p>{description.shipping}</p>
                                </Space>
                            </Col>
                        </Row>
                        <Row>
                            <Col className={'collapse-box-container-col'} span={24}>
                                <Space direction={"vertical"}>
                                    <h4>
                                        ADVANTAGES
                                    </h4>
                                    <ul>
                                        {
                                            description.advantages.map((value, index) => <li key={index}>{value}</li>)
                                        }
                                    </ul>
                                </Space>
                            </Col>
                        </Row>
                    </Space>
                </Row>

            }
        </div>
    );
};

export default CollapseBox;