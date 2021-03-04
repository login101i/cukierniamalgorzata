import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Star from '../layout/Star'

const Product = ({ loading, product, col }) => {



    return (

        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <MetaData title={product.name} />
                    <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
                        <div className="card p-3 rounded d-flex flex-column align-items-center justify-content-center">
                            <Link to={`/product/${product._id}`} id="view_btn"
                                className="img-fluid" >
                                <img src={product.images[0].url}
                                    className="img-fluid"
                                    style={{ objectFit: 'cover', minWith: '222px' }}
                                    alt="obrazek"
                                />
                            </Link>
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">
                                    <Link to={`/product/${product._id}`}>{product.name}</Link>
                                </h5>
                                <div className="ratings mt-auto">
                                    <div className="rating-outer">
                                        <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
                                    </div>
                                    <span id="no_of_reviews">({product.numOfReviews} Oceny)</span>
                                </div>
                                <p className="card-text">{product.price} zł</p>
                                <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-info btn-block"
                                    style={{ color: 'white', background: '#fdcc0d' }}
                                >Szczegóły</Link>
                            </div>
                        </div>
                    </div>
                </Fragment>
            }
        </Fragment>


    )
}

export default Product
