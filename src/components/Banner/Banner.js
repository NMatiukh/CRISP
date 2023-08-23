import React from 'react';
import './Banner.scss';
import {Button, Space, Typography} from "antd";

const Banner = ({backgroundColor, image}) => {
    return (
        <div className={'banner'}>
            <div className={'banner-container'}>
                <Space direction={"vertical"} style={{maxWidth: "60%"}}>
                    <div className={'banner-container-border'}>

                    </div>
                    <h2 style={{zIndex: 2}}>
                        shoping without limits.
                    </h2>
                    <p>
                        You can choose the best option for you, and it does not matter whether you are in Prague or San
                        Francisco. We will deliver your purchase anywhere!
                    </p>
                    <button>SHOP NOW</button>
                </Space>
            </div>
            <img className={'banner-img'} src={image} alt=""/>
        </div>
    );
};

export default Banner;
