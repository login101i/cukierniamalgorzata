import React, { Fragment, useEffect, useState } from 'react'
import Loader from './layout/Loader'
import MetaData from './layout/MetaData'
import './home.css'

import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/productActions.js'
import Product from "../components/product/Product"

import { useAlert } from 'react-alert'
import Pagination from 'react-js-pagination'

import { Menu, Slider, Checkbox } from "antd";
import { MailOutlined } from '@ant-design/icons';
import Star from "../components/layout/Star"




const Home = ({ match }) => {
    const dispatch = useDispatch();
    const alert = useAlert()
    const { SubMenu } = Menu;


    const [activePage, setActivePage] = useState(1)
    const [price, setPrice] = useState([1, 1000])
    const [filteredPrice, setFilteredPrice] = useState([1, 1000])
    const [category, setCategory] = useState()
    const [check, setCheck] = useState(false);
    const [star, setStar] = useState(0)



    const keyword = match.params.keyword

    const {
        loading,
        products,
        error,
        productsCount,
        resPerPage,
        filteredProductsCount
    } = useSelector(state => state.products)


    useEffect(() => {
        if (error) {
            return alert.error(error)
            // to powinno być dodane teraz
        }
        dispatch(getProducts(activePage, keyword, filteredPrice, category, star));
    }, [dispatch, activePage, error, keyword, filteredPrice, category, star])

    const handleSlider = (value) => {
        setPrice(value);
        setTimeout(() => {
            setFilteredPrice(price)
            setCategory()
        }, 1000)


        // reset
        // setCategoryIds([]);
        // setStar("");
        // setSub("");
        // setBrand("");
        // setColor("");
        // setShipping("");

    };

    const setCurrentPageNo = (value) => {
        setActivePage(value)
    }
    const categories = [
        "Ciasta",
        "Cukierki"
    ]

    let count = productsCount;
    if (keyword) {
        count = filteredProductsCount
    }



    const handleCheck = (e) => {
        // reset
        setPrice([0, 1000]);
        setCheck(true)
        setTimeout(() => {
            setCategory(e.target.value)
        }, 400)

    };


    const showStars = () => (
        <div className="pr-4 pl-4 pb-2">
            <Star starClick={handleStarClick} numberOfStars={5} />
            <Star starClick={handleStarClick} numberOfStars={4} />
            <Star starClick={handleStarClick} numberOfStars={3} />
            <Star starClick={handleStarClick} numberOfStars={2} />
            <Star starClick={handleStarClick} numberOfStars={1} />
        </div>
    );

    const handleStarClick = (value) => {
        setStar(value)
    }
    return (
        <Fragment>
            {loading ? <Loader /> : (


                <Fragment>
                    <MetaData title={'Cukiernia Małgorzata'} />
                    <div className="container-fluid ">
                        <div className="row d-flex justify-content-center">
                            <h1 style={{ paddingTop: "80px" }}>Cukiernia Małgorzata</h1>
                        </div>


                        <section id="products" className=" mt-5">
                            <div className="row  d-flex justify-content-between m-4">
                                {keyword ? (
                                    <>



                                        <div className="col-sm-12  col-md-3 mt-5 mb-5">
                                            <h2>Filtry</h2>
                                            <Menu
                                                mode="inline"
                                                defaultOpenKeys={["1", "2", "3"]}

                                            >
                                                <SubMenu
                                                    key="1"
                                                    title={
                                                        <span className="h6">
                                                            Cena </span>
                                                    }
                                                >
                                                    <div>
                                                        <Slider
                                                            className="ml-4 mr-4"
                                                            tipFormatter={(v) => `${v} zł`}
                                                            range
                                                            value={price}
                                                            onChange={handleSlider}
                                                            max="4999"
                                                        />
                                                    </div>
                                                </SubMenu>
                                                <hr />
                                                <SubMenu
                                                    key="2"
                                                    title={
                                                        <span className="h6">
                                                            Kategorie </span>
                                                    }
                                                >
                                                    {categories.map(c => (
                                                        <div >
                                                            <Checkbox
                                                                onChange={handleCheck}
                                                                className="pb-2 pl-4 pr-4"
                                                                value={c}
                                                                name="category"
                                                                checked={c === category}
                                                            >
                                                                {c}
                                                            </Checkbox>
                                                        </div>
                                                    ))}

                                                </SubMenu>

                                                <SubMenu
                                                    key="3"
                                                    title={
                                                        <span className="h6">
                                                            Oceny
                </span>
                                                    }
                                                >
                                                    <div style={{ maringTop: "-10px" }}>{showStars()}</div>
                                                </SubMenu>
                                            </Menu>
                                        </div>
                                        <div className="col-sm-12 col-md-9 ">
                                            <div className="row ">
                                                {products && products.map(product => (
                                                    <Product product={product} col={4} />
                                                ))}
                                            </div>

                                        </div>

                                    </>

                                ) : (
                                        products && products.map(product => (
                                            <Product product={product} col={3} />
                                        ))
                                    )}
                            </div>
                        </section>

                    </div>
                </Fragment>
            )
            }


            {
                resPerPage >= count ? "" :

                    <Fragment>
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={activePage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText={'Następna strona'}
                                prevPageText={'Poprzednia strona'}
                                itemClass="page-item"
                                linkClass="page-link"
                            />
                        </div>
                    </Fragment>
            }

        </Fragment >
    )
}

export default Home
