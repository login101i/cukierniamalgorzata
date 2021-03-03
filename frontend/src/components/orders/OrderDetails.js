import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails, clearErrors } from '../../actions/orderActions'

const OrderDetails = ({ match }) => {

    const alert = useAlert();
    const dispatch = useDispatch();
// tutaj ważne jest zaznaczenie że jest to obiekt
    const { loading, error, order = {} } = useSelector(state => state.orderDetails)
    const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order

    useEffect(() => {
        dispatch(getOrderDetails(match.params.id));
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
    }, [dispatch, alert, error, match.params.id])

    const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`

    const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false

    return (
        <Fragment>
            <MetaData title={'Szczegóły zamówienia'} />

            {loading ? <Loader /> : (
                <Fragment>
                    <div className="row d-flex justify-content-center">
                        <div className="col-10 col-lg-7 mt-5 order-details">

                            <h1 className="my-5">Zamówienie # {order._id}</h1>

                            <h4 className="mb-4">Szczegóły dostawy:</h4>
                            <p><b>Imię:</b> {user && user.name}</p>
                            <p><b>Telefon:</b> {shippingInfo && shippingInfo.phoneNo}</p>
                            <p className="mb-4"><b>Adres:</b>{shippingDetails}</p>
                            <p><b>Wartość:</b> ${totalPrice}</p>

                            <hr />

                            <h4 className="my-4">Płatność</h4>
                            <p className={isPaid ? "greenColor" : "redColor"}><b>{isPaid ? "ZAPŁACONO" : "NIE ZAPŁACONO"}</b></p>


                            <h4 className="my-4">Status zamówienia:</h4>
                            <p className={order.orderStatus && String(order.orderStatus).includes('Delivered') ? "greenColor" : "redColor"} ><b>{orderStatus}</b></p>


                            <h4 className="my-4">Zamówione produkty:</h4>

                            <hr />
                            <div className="cart-item my-1">
                                {orderItems && orderItems.map(item => (
                                    <div key={item.product} className="row my-5">
                                        <div className="col-4 col-lg-2">
                                            <img src={item.image} alt={item.name} height="45" width="65" />
                                        </div>

                                        <div className="col-5 col-lg-5">
                                            <Link to={`/products/${item.product}`}>{item.name}</Link>
                                        </div>


                                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                            <p>${item.price}</p>
                                        </div>

                                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                            <p>{item.quantity} produkt(y)</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <hr />
                        </div>
                    </div>
                </Fragment>
            )}

        </Fragment>
    )
}

export default OrderDetails
