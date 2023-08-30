import React, {useEffect} from 'react';
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import {Affix, Button, Col, Divider, FloatButton, Input, Layout, Menu, Row, Space, Typography} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout";
import {
    FacebookFilled,
    InstagramFilled,
    TwitterSquareFilled
} from "@ant-design/icons";
import "./App.scss";
import Logo from './assets/Logo.svg'
import {BiSearch} from "react-icons/bi";
import ShopIcon from "./components/ShopIcon/ShopIcon";
import {BsCheck2} from "react-icons/bs";
import {AiOutlineHeart} from "react-icons/ai";
import {useFirestoreConnect} from "react-redux-firebase";

const App = () => {
    const location = useLocation()
    const navigate = useNavigate()

    useFirestoreConnect(() => [
        {collection: 'products'}
    ])

    useEffect(() => {
        if (location.pathname === '/') {
            navigate('/home')
        }
    }, []);
    const menuItems = [
        {
            label: <Link to={'/home'}>{'home'.toUpperCase()}</Link>,
            key: 'home',
        },
        {
            label: <Link to={'/shop'}>{"Shop".toUpperCase()}</Link>,
            key: 'shop',
        },
        {
            label: <Link to={'/blog'}>{"blog".toUpperCase()}</Link>,
            key: 'blog',
        },
        {
            label: <Link to={'/sale'}>{"Sale".toUpperCase()}</Link>,
            key: 'sale',
        },
        {
            label: <Link to={'/contact_us'}>{"contact us".toUpperCase()}</Link>,
            key: 'contact_us',
        }
    ];
    return (
        <Layout className={'app'}>
            <Affix>
                <Header className={'app_header'}>
                    <Link className={'app-header-link'} to={'/home'}>
                        <img src={Logo} alt="logo"/>
                    </Link>
                    <Menu
                        className={'app-header-menu'}
                        mode={'horizontal'}
                        items={menuItems}
                        defaultSelectedKeys={[location.pathname.split('/')[1]]}
                        selectedKeys={location.pathname.split('/')[1]}
                    />
                    <div className={'app-header-search'}>
                        <BiSearch/>
                        <p>
                            SEARCH
                        </p>
                    </div>
                    <div className={'app-header-links'}>
                        <Link to={'/login'}>
                            SIGN IN
                        </Link>
                        <Link to={'/registration'}>
                            CREATE AN ACCOUNT
                        </Link>
                    </div>
                    <div className={'app-header-icons'}>
                        <AiOutlineHeart style={{fontSize: "1.5em"}}/>
                        <Link to={'shopping_cart'}>
                            <ShopIcon/>
                        </Link>
                    </div>
                </Header>
            </Affix>
            <Content className={'app_container'}>
                <Outlet/>
            </Content>
            <div className={'pre-footer'}>
                <div>
                    <Space>
                        <BsCheck2/>
                        Duties and Taxes Guaranteed
                    </Space>
                </div>
                <div>
                    <Space>
                        <BsCheck2/>
                        Free Express Shipping
                    </Space>
                </div>
                <div>
                    <Space>
                        <BsCheck2/>
                        Customer Love
                    </Space>
                </div>
                <div>
                    <Space>
                        <BsCheck2/>
                        Easy Returns
                    </Space>
                </div>
                <div>
                    <Space>
                        <BsCheck2/>
                        Secure Payment
                    </Space>
                </div>
            </div>
            <Footer className={'app-footer'}>
                <Row>
                    <Col span={3}>
                        <Link to={'/home'}>
                            <img src={Logo} alt="logo"/>
                        </Link>
                    </Col>
                    <Col span={3}>
                        <Typography.Title level={5}>features</Typography.Title>
                        <ul>
                            <li>men</li>
                            <li>Women</li>
                            <li>boys</li>
                            <li>girls</li>
                            <li>new arrivals</li>
                            <li>shoes</li>
                            <li>cothes</li>
                            <li>accessories</li>
                        </ul>
                    </Col>
                    <Col span={3}>
                        <Typography.Title level={5}>Menu</Typography.Title>
                        <ul>
                            <li><Link to={'/about_us'}>{"About us"}</Link></li>
                            <li><Link to={'/contact_us'}>{"contact us"}</Link></li>
                            <li><Link to={'/my_account'}>{"my account"}</Link></li>
                            <li><Link to={'/orders_history'}>{"orders history"}</Link></li>
                            <li><Link to={'/my_wishlist'}>{"MY WISHLIST"}</Link></li>
                            <li><Link to={'/blog'}>{"blog"}</Link></li>
                            <li><Link to={'/login'}>{"LOGIN"}</Link></li>
                        </ul>
                    </Col>
                    <Col span={5}>
                        <Typography.Title level={5}>contact us</Typography.Title>
                        <ul>
                            <li>
                                <Typography.Text strong>
                                    Address: </Typography.Text>
                                123 STREET NAME, CITY, ENGLAND
                            </li>
                            <li>
                                <Typography.Text strong>
                                    Phone: </Typography.Text>
                                (123) 456-7890
                            </li>
                            <li>
                                <Typography.Text strong>
                                    email: </Typography.Text>
                                MAIL@EXAMPLE.COM
                            </li>
                            <li>
                                <Typography.Text strong>
                                    working days/hours </Typography.Text>
                                MON - SUN / 9:00AM - 8:00PM
                            </li>
                        </ul>
                    </Col>
                    <Col span={4}>
                        <Typography.Title level={5}>follow us</Typography.Title>
                        <ul>
                            <li>
                                <div>
                                    <FacebookFilled/> FACEBOOK
                                </div>
                            </li>
                            <li>
                                <div>
                                    <TwitterSquareFilled/> TWITTER
                                </div>
                            </li>
                            <li>
                                <div>
                                    <InstagramFilled/> INSTAGRAM
                                </div>
                            </li>
                        </ul>
                    </Col>
                    <Col span={6}>
                        <Typography.Title level={5}>join us</Typography.Title>
                        <ul>
                            <li>
                                Subscribe to our newsletters
                            </li>
                            <li>
                                <Input placeholder={'Email Address'}/>
                            </li>
                            <li>
                                <Button>Subscribe!</Button>
                            </li>
                        </ul>
                    </Col>
                </Row>
                <Divider style={{backgroundColor: "#4F4F4F"}}/>
                <Row>
                    <Typography.Text style={{textTransform: "uppercase"}}>© 2023. Crisp Developed by
                        NMatiukh</Typography.Text>
                </Row>
            </Footer>
            <FloatButton.BackTop/>
        </Layout>
    );
};

export default App;