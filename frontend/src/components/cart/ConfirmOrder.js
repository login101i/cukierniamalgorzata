import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'

import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'
import { useSelector } from 'react-redux'
import { applyCoupon } from '../../actions/cartActions'
import { useDispatch } from 'react-redux'


const ConfirmOrder = ({ history }) => {

    const { cartItems, shippingInfo } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.auth)
    const [coupon, setCoupon] = useState("");
    const [totalAfterDiscount, setTotalAfterDiscount] = useState("");
    const [discountError, setDiscountError] = useState("");

    const dispatch = useDispatch()

    // Calculate Order Prices
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const shippingPrice = itemsPrice > 200 ? 0 : 25
    const taxPrice = Number((0.17 * itemsPrice).toFixed(2))
    const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2)

    const processToPayment = () => {
        const data = {
            itemsPrice: itemsPrice.toFixed(2),
            shippingPrice,
            taxPrice,
            totalPrice,
            totalAfterDiscount
        }
        // here remember that it is session storage
        sessionStorage.setItem('orderInfo', JSON.stringify(data))
        history.push('/payment')
    }

    const applyDiscountCoupon = () => {
        dispatch(applyCoupon(coupon, totalPrice)).then((res) => {
            console.log("------------->", res)
            setTotalAfterDiscount(Number(res.totalAfterDiscount));
            if (res === "Error") {
                setDiscountError("0");
            }
        })
        setCoupon("")
    }


    return (
        <Fragment>

            <MetaData title={'Potwierdzenie zamówienia'} />
            <CheckoutSteps shipping confirmOrder />
            <div className="row d-flex justify-content-center">
                <div className="col-12 col-lg-6 mt-5 order-confirm">
                    <h4 className="mb-3">Dane do wysyłki</h4>
                    <p><b>Imię:</b> {user && user.name}</p>
                    <p><b>Telefon:</b> {shippingInfo.phoneNo}</p>
                    <p className="mb-4"><b>Adres:</b> {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}</p>
                    <hr />
                    <h4 className="mt-4">Twoje produkty w koszyku:</h4>
                    {cartItems.map(item => (
                        <Fragment>
                            <hr />
                            <div className="cart-item my-1" key={item.product}>
                                <div className="row">
                                    <div className="col-4 col-lg-2">
                                        <img src={item.image} alt="Laptop" height="45" width="65" />
                                    </div>

                                    <div className="col-5 col-lg-6">
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </div>
                                    <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                        <p>{item.quantity} x ${item.price} = <b>${(item.quantity * item.price).toFixed(2)}</b></p>
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </Fragment>
                    ))}
                </div>
                <div className="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4>Podsumowanie zamówienia:</h4>
                        <hr />
                        <p>Razem:  <span className="order-summary-values">{itemsPrice.toFixed(2)} zł</span></p>
                        <p>Dostawa: <span className="order-summary-values">{shippingPrice}  zł</span></p>
                        <p>Podatek:  <span className="order-summary-values">{taxPrice}  zł</span></p>
                        <hr />
                        {totalAfterDiscount > 0 ? (
                            <p>Razem:
                                <span className="order-summary-values">
                                    <p className="h0">Zastosowano kupon</p>
                                    <h5 style={{ color: 'green' }}>{totalAfterDiscount} zł</h5>
                                </span>
                            </p>
                        ) : (
                                <p>Razem: <span className="order-summary-values">{totalPrice} zł</span></p>
                            )}
                        <hr />
                        <button id="checkout_btn" className="btn btn-primary btn-block" onClick={processToPayment}>Zapłać</button>
                    </div>
                    <div >
                        <h4>Masz Kupon Rabatowy ?</h4>
                        <div className="d-flex justify-content-center">
                            <input
                                onChange={(e) => {
                                    setCoupon(e.target.value);
                                    setDiscountError("");
                                }}
                                value={coupon}
                                type="text"
                                className="form-control"
                                placeholder="Tutaj wspisz kod rabatowy."
                            />
                            <button
                                onClick={applyDiscountCoupon}
                                className="btn btn-primary   ml-3">
                                UŻYJ
                    </button>
                        </div>
                        {discountError && <div style={{ color: 'red' }}>Kupon nie jest prawidłowy</div>}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ConfirmOrder
