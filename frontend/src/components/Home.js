import React, { Fragment, useEffect, useState } from 'react'
import Loader from './layout/Loader'
import MetaData from './layout/MetaData'
import './home.css'

import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/productActions.js'
import Product from "../components/product/Product"

import { useAlert } from 'react-alert'
import Pagination from 'react-js-pagination'

import { Menu, Slider } from "antd";
import { MailOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'


const Home = ({ match }) => {
    const dispatch = useDispatch();
    const alert = useAlert()

    const [activePage, setActivePage] = useState(1)
    const [price, setPrice] = useState([1, 1000])
    const [filteredPrice, setFilteredPrice] = useState([1, 1000])

    const keyword = match.params.keyword

    const {
        loading,
        products,
        error,
        productsCount,
        resPerPage
    } = useSelector(state => state.products)


    useEffect(() => {
        if (error) {
            return alert.error(error)
            // to powinno być dodane teraz
        }
        dispatch(getProducts(activePage, keyword, filteredPrice));
    }, [dispatch, activePage, error, keyword, filteredPrice])

    const handleSlider = (value) => {
        setPrice(value);
        setTimeout(() => {
            setFilteredPrice(price)
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


    return (
        <Fragment>
            {loading ? <Loader /> : (


                <Fragment>
                    <MetaData title={'Cukiernia Małgorzata'} />
                    <div className="container-fluid home">
                        <h1 id="products_heading" style={{ paddingTop: "80px" }}>Cukiernia Małgorzata</h1>


                        <section id="products" className=" mt-5">
                            <div className="row m-4">
                                {keyword ? (
                                    <>
                                        <div className="col-md-2 pt-2 ">
                                            <h2>Filtry</h2>
                                            <Menu
                                                mode="inline"
                                                defaultOpenKeys={["1", "2"]}
                                                style={{ width: 256 }}
                                            >

                                                <Slider
                                                    className="ml-4 mr-4"
                                                    tipFormatter={(v) => `${v} zł`}
                                                    range
                                                    value={price}
                                                    onChange={handleSlider}
                                                    max="4999"
                                                />
                                            </Menu>
                                        </div>
                                        <div className="col-md-9 pt-2">
                                            <div className="row">
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
            )}


            {resPerPage >= productsCount ? "" :

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

        </Fragment>
    )
}

export default Home
