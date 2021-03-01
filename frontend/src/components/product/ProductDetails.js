import React, { Fragment, useState, useEffect } from 'react'
import { Carousel } from 'react-bootstrap'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'


import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails, clearErrors } from '../../actions/productActions'
import Star from '../../components/layout/Star'


const ProductDetails = ({ match }) => {


    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error, product } = useSelector(state => state.productDetails)

    useEffect(() => {
        dispatch(getProductDetails(match.params.id))

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

    }, [dispatch, alert, error, match.params.id])

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={product.name} />
                    <div className="row d-flex justify-content-around p-3">
                        <div className="col-12 col-lg-5 img-fluid" id="product_image">
                            <Carousel pause='hover'>

                                {product.images && product.images.map(image => (
                                    <Carousel.Item key={image.public_id}>
                                        <img className="d-block w-100" src={image.url} alt={product.title} />
                                    </Carousel.Item>
                                ))}

                            </Carousel>
                        </div>

                        <div className="col-12 col-lg-5 mt-5 ">
                            <h3>{product.name}</h3>
                            <p id="product_id">Product # {product._id}</p>
                            <hr />

                            <Star numberOfStars={5} rating={product.ratings} />
                            <span id="no_of_reviews">({product.numOfReviews} Oceny)</span>
                            <hr />

                            <p id="product_price">{product.price} zł</p>
                            <div className="stockCounter d-inline">
                                <span className="btn btn-danger minus">-</span>

                                <input type="number" className="form-control  d-inline" readOnly />

                                <span className="btn btn-primary plus" >+</span>
                            </div>
                            <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4" disabled={product.stock === 0} >Dodaj do koszyka</button>

                            <hr />

                            <p>Status: <span id="stock_status" className={product.stock > 0 ? 'greenColor' : 'redColor'} >{product.stock > 0 ? 'Na stanie' : 'Brak w sklepie'}</span></p>

                            <hr />

                            <h4 className="mt-2">Opis:</h4>
                            <p>{product.description}</p>
                            <hr />
                            <p id="product_seller mb-3">Sprzedawane przez: <strong>{product.seller}</strong></p>
                        </div>
                    </div>



                </Fragment>
            )}
        </Fragment>
    )
}

export default ProductDetails
