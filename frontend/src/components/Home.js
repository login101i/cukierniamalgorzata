import React, { Fragment, useEffect} from 'react'
import Loader from './layout/Loader'
import MetaData from './layout/MetaData'
import './home.css'

import { useDispatch, useSelector } from 'react-redux'
import {getProducts} from '../actions/productActions.js'
import Product from "../components/product/Product"


const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
            return alert.error(error)
        }
        dispatch(getProducts());
    }, [dispatch])



    const { loading, products, error, productsCount, resPerPage } = useSelector(state => state.products)




    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Cukiernia Małgorzata'} />
                    <div className="container-fluid home">
                        <h1 id="products_heading">Cukiernia Małgorzata</h1>

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

            <div className="d-flex justify-content-center mt-5">

            </div>
        </Fragment>
    )
}

export default Home
