import React, { Fragment, useEffect, useState } from 'react'
import Loader from './layout/Loader'
import MetaData from './layout/MetaData'
import './home.css'

import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/productActions.js'
import Product from "../components/product/Product"

import { useAlert } from 'react-alert'
import Pagination from 'react-js-pagination'



const Home = () => {
    const dispatch = useDispatch();
    const alert = useAlert()

    const [activePage, setActivePage] = useState(1)


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
        dispatch(getProducts(activePage));
    }, [dispatch, activePage, error])





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
                        <section id="products" className="container mt-5">
                            <div className="row">
                                {products && products.map(product => (
                                    <Product product={product} />
                                ))}
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
