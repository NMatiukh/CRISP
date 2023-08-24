import React, {useEffect, useState} from 'react';
import './Shop.scss';
import {Card, Checkbox, Col, Divider, List, Row, Select, Slider, Space, Typography} from "antd";
import {brands, colors, dressLength, sizes} from "../../structures";
import SizeBox from "../../components/SizeBox/SizeBox";
import ColorBox from "../../components/ColorBox/ColorBox";
import Button from "../../components/Button/Button";
import {CloseOutlined, MinusOutlined, PlusOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";
import Meta from "antd/es/card/Meta";
import DeleteFilter from "../../components/DeleteFilter/DeleteFilter";
import SizesContainer from "../../components/SizesContainer/SizesContainer";
import ColorsContainer from "../../components/ColorsContainer/ColorsContainer";
import Banner from "../../components/Banner/Banner";
import Rectangle71 from '../../assets/Rectangle71.png'
import {Link} from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";

const Shop = () => {
    const [sliderValue, setSliderValue] = useState(500); // slider values
    const [brandsValues, setBrandsValues] = useState([]); // brands values
    const [dressLengthValues, setDressLengthValues] = useState([]); // drees length values
    const [colorsValues, setColorsValues] = useState([]); // colors values
    const [productsWithFilter, setProductsWithFilter] = useState([]); // array products with filters
    const [sizesState, setSizesState] = useState([]); // sizes values
    const [showFiltersDetails, setShowFiltersDetails] = useState(false); // filter details box on top visible

    const [showFilterItems, setShowFilterItems] = useState({
        brand: true,
        size: true,
        dress_length: true,
        color: true,
        price_range: true,
    });
    const products = useSelector(state => state.products.data)
    useEffect(() => {
        setProductsWithFilter(products)
    }, [products]);
    useEffect(() => {
        if (!brandsValues.length && !dressLengthValues.length && !colorsValues.filter(item => item.active).length && !sizesState.filter(item => item.active).length) {
            setShowFiltersDetails(false)
        }
    }, [brandsValues, dressLengthValues, colorsValues, sizesState]);
    const applyFilter = () => {
        const filteredProducts = products.filter(product => {

            const meetsSliderValue = product.price <= sliderValue;

            const meetsBrands = brandsValues.length === 0 || brandsValues.includes(product.brand);

            const meetsSizes = sizesState.filter(item => item.active).length === 0 || sizesState.some(size => product.size.some(productSize => size.value === productSize && size.active));

            const meetsDressLengths = dressLengthValues.length === 0 || dressLengthValues.some(length => product.dress_length.includes(length));

            const meetsColors = colorsValues.filter(item => item.active).length === 0 || colorsValues.some(color => product.color.some(productColor => color.value === productColor && color.active));


            return meetsSliderValue && meetsBrands && meetsSizes && meetsDressLengths && meetsColors;
        });


        if (brandsValues.length || dressLengthValues.length || colorsValues.filter(item => item.active).length || sizesState.filter(item => item.active).length) {
            setShowFiltersDetails(true)
        }
        setProductsWithFilter(filteredProducts)
    }

    const changeShowFilterItem = (fieldName) => {
        setShowFilterItems({...showFilterItems, [fieldName]: !showFilterItems[fieldName]})
    }
    const onChangeSlider = (value) => {
        setSliderValue(value)
    }

    const resetAllFilter = () => {
        setSliderValue(500)
        setBrandsValues([])
        setDressLengthValues([])
        setColorsValues(colorsValues.map((value, index) => {
            return {
                value: value.value,
                active: false
            }
        }))
        setSizesState(sizesState.map((value, index) => {
            return {
                value: value.value,
                active: false
            }
        }))
    }
    const deleteOneElementFromFilter = (setFilters, filters, item, type) => {
        if (type) {
            setFilters(filters.map(value => {
                if (value.value === item) {
                    return {
                        value: item,
                        active: false
                    }
                } else {
                    return {
                        value: value.value,
                        active: value.active
                    }
                }
            }))
        } else {
            setFilters(filters.filter(value => value !== item))
        }
    }
    return (
        <>
            <Banner backgroundColor={'#F6F8FC'} image={Rectangle71}/>
            <Row>
                <Col span={6}>
                    <Row>
                        {
                            (brandsValues.length || sizesState.filter(item => item.active).length || dressLengthValues.length || colorsValues.filter(item => item.active)) && showFiltersDetails ?
                                <div className={'shop-filter-box'}>
                                    <div className={'shop-filter-box-title'}>
                                        <Typography.Title level={3}>
                                            Filter
                                        </Typography.Title>
                                        <DeleteFilter onClick={resetAllFilter} children={"reset all"}/>
                                    </div>
                                    {
                                        !!brandsValues.length &&
                                        <Space direction={"vertical"}>
                                            <Typography.Title level={5}>
                                                Brand:
                                            </Typography.Title>
                                            <Space size={"large"} wrap>
                                                {
                                                    brandsValues.map(value => <DeleteFilter
                                                        key={value}
                                                        onClick={() => deleteOneElementFromFilter(setBrandsValues, brandsValues, value)}
                                                        children={value}/>)
                                                }
                                            </Space>
                                        </Space>
                                    }
                                    {
                                        !!sizesState.filter(item => item.active).length &&
                                        <Space direction={"vertical"}>
                                            <Typography.Title level={5}>
                                                Size (Inches):
                                            </Typography.Title>
                                            <Space wrap size={"large"}>
                                                {
                                                    sizesState.filter(item => item.active).map((item, index) =>
                                                        <DeleteFilter
                                                            key={index}
                                                            onClick={() => deleteOneElementFromFilter(setSizesState, sizesState, item.value, true)}
                                                            children={item.value}
                                                        />)
                                                }
                                            </Space>
                                        </Space>
                                    }
                                    {
                                        !!dressLengthValues.length &&
                                        <Space direction={"vertical"}>
                                            <Typography.Title level={5}>
                                                Dress length:
                                            </Typography.Title>
                                            <Space wrap size={"large"}>
                                                {
                                                    dressLengthValues.map(value => <DeleteFilter
                                                        key={value}
                                                        children={value}
                                                        onClick={() => deleteOneElementFromFilter(setDressLengthValues, dressLengthValues, value)}

                                                    />)
                                                }
                                            </Space>
                                        </Space>
                                    }
                                    {
                                        !!colorsValues.filter(item => item.active).length &&
                                        <Space direction={"vertical"}>
                                            <Typography.Title level={5}>
                                                Color:
                                            </Typography.Title>
                                            <Space wrap size={"large"}>
                                                {
                                                    colorsValues.filter(item => item.active).map((item, index) =>
                                                        <DeleteFilter
                                                            key={index}
                                                            onClick={() => deleteOneElementFromFilter(setColorsValues, colorsValues, item.value, true)}
                                                        >
                                                            <ColorBox disabled color={item}/>
                                                        </DeleteFilter>)
                                                }
                                            </Space>
                                        </Space>
                                    }
                                    <Space direction={"vertical"}>
                                        <Typography.Title level={5}>
                                            Price Range:
                                        </Typography.Title>
                                        <DeleteFilter onClick={() => setSliderValue(500)}>
                                            <Space>
                                                {`0.00 EUR – ${sliderValue.toFixed(2)} EUR`}
                                            </Space>
                                        </DeleteFilter>

                                    </Space>
                                </div> : ''
                        }
                    </Row>
                    <Space direction={"vertical"} style={{width: '100%'}} size={"large"}>

                        {/*Brand*/}
                        <Space direction={"vertical"} style={{width: "100%"}}>
                            <div>
                                <Row justify={"space-between"} align={"middle"}>
                                    <Typography.Title level={5}>
                                        Brand
                                    </Typography.Title>
                                    <div style={{cursor: "pointer"}} onClick={() => changeShowFilterItem('brand')}>
                                        {
                                            showFilterItems.brand ? <MinusOutlined/> : <PlusOutlined/>
                                        }
                                    </div>
                                </Row>
                            </div>
                            {
                                showFilterItems.brand &&
                                <Checkbox.Group
                                    style={{display: "flex", flexDirection: 'column', gap: "20px 0"}}
                                    value={brandsValues}
                                    options={brands.map((value, index) => {
                                        return {
                                            label: value,
                                            value: value,
                                        }
                                    })}
                                    onChange={(value) => setBrandsValues(value)}
                                />
                            }

                        </Space>

                        {/*Size*/}
                        <Space direction={"vertical"} style={{width: "100%"}}>
                            <Row justify={"space-between"} align={"middle"}>
                                <Typography.Title level={5}>
                                    Size (Inches)
                                </Typography.Title>
                                <div style={{cursor: "pointer"}} onClick={() => changeShowFilterItem('size')}>
                                    {
                                        showFilterItems.size ? <MinusOutlined/> : <PlusOutlined/>
                                    }
                                </div>
                            </Row>
                            {
                                showFilterItems.size &&
                                <SizesContainer sizesState={sizesState} setSizesState={setSizesState}/>
                            }
                        </Space>

                        {/*dress length*/}
                        <Space direction={"vertical"} style={{width: "100%"}}>
                            <Row justify={"space-between"} align={"middle"}>
                                <Typography.Title level={5}>
                                    Dress length
                                </Typography.Title>
                                <div style={{cursor: "pointer"}} onClick={() => changeShowFilterItem('dress_length')}>
                                    {
                                        showFilterItems.dress_length ? <MinusOutlined/> : <PlusOutlined/>
                                    }
                                </div>
                            </Row>
                            {
                                showFilterItems.dress_length &&
                                <Checkbox.Group
                                    style={{display: "flex", flexDirection: 'column', gap: "20px 0"}}
                                    options={dressLength.map((value, index) => {
                                        return {
                                            label: value,
                                            value: value,
                                        }
                                    })}
                                    value={dressLengthValues}
                                    onChange={(value) => setDressLengthValues(value)}
                                />
                            }
                        </Space>

                        {/*color*/}
                        <Space direction={"vertical"} style={{width: "100%"}}>
                            <Row justify={"space-between"} align={"middle"}>
                                <Typography.Title level={5}>
                                    Color
                                </Typography.Title>
                                <div style={{cursor: "pointer"}} onClick={() => changeShowFilterItem('color')}>
                                    {
                                        showFilterItems.color ? <MinusOutlined/> : <PlusOutlined/>
                                    }
                                </div>
                            </Row>
                            {
                                showFilterItems.color &&
                                <ColorsContainer colorValues={colorsValues} setColorValues={setColorsValues}/>
                            }
                        </Space>

                        {/*range*/}
                        <Space direction={"vertical"} style={{width: "100%"}}>
                            <Row justify={"space-between"} align={"middle"}>
                                <Typography.Title level={5}>
                                    Price Range
                                </Typography.Title>
                                <div style={{cursor: "pointer"}} onClick={() => changeShowFilterItem('price_range')}>
                                    {
                                        showFilterItems.price_range ? <MinusOutlined/> : <PlusOutlined/>
                                    }
                                </div>
                            </Row>
                            {
                                showFilterItems.price_range && <div style={{width: "100%"}}>
                                    <Row justify={"space-between"}>
                                        <Col style={{fontFamily: "Roboto"}}>
                                            0.00 EUR
                                        </Col>
                                        <Col style={{fontFamily: "Roboto"}}>
                                            {`${sliderValue.toFixed(2)} EUR`}
                                        </Col>
                                    </Row>
                                    <Slider step={0.01} value={sliderValue} onChange={onChangeSlider} min={0} max={500}/>
                                </div>
                            }

                        </Space>
                        <Row justify={"end"}>
                            <Button onClick={applyFilter}>Apply</Button>
                        </Row>
                    </Space>

                </Col>
                <Col
                    span={18}
                    style={
                        {
                            paddingLeft: 20,
                            display: "flex",
                            justifyContent: 'space-between',
                            alignItems: "start"
                        }
                    }
                >
                    <Divider type={"vertical"} style={{height: "100%", margin: '0 30px'}}/>
                    <List
                        position={'top'}
                        pagination={{
                            position: 'top',
                            defaultPageSize: 12,
                            pageSizeOptions: ['12', '18'],
                        }}
                        grid={{
                            gutter: 16,
                            column: 4,
                        }}
                        dataSource={productsWithFilter}
                        renderItem={(value, index) => (
                            <List.Item>
                                <Link to={`${value.id}`}>
                                    <ProductCard key={index} value={value} index={index}/>
                                </Link>

                            </List.Item>
                        )}
                    />
                </Col>
            </Row>
        </>
    );
};

export default Shop;