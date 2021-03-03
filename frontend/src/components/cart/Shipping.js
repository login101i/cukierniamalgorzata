import React, { Fragment, useState } from 'react'

import MetaData from '../layout/MetaData'

import { useDispatch, useSelector } from 'react-redux'
import { saveShippingInfo } from '../../actions/cartActions'

const Shipping = ({ history }) => {

    const { shippingInfo } = useSelector(state => state.cart)

    const [address, setAddress] = useState(shippingInfo?.address ? shippingInfo.address : "")
    const [city, setCity] = useState(shippingInfo?.city ? shippingInfo.city : "")
    const [postalCode, setPostalCode] = useState(shippingInfo?.postalCode ? shippingInfo.postalCode : '')
    const [phoneNo, setPhoneNo] = useState(shippingInfo?.phoneNo ? shippingInfo.phoneNo : '')

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingInfo({ address, city, phoneNo, postalCode }))
        history.push('/confirm')
    }

    return (
        <Fragment>
            <MetaData title={'Informacje o dostawie'} />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-4">Informacje o dostawie</h1>
                        <div className="form-group">
                            <label htmlFor="address_field">Adres</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="city_field">City</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone_field">Phone No</label>
                            <input
                                type="phone"
                                id="phone_field"
                                className="form-control"
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="postal_code_field">Kod pocztowy</label>
                            <input
                                type="number"
                                id="postal_code_field"
                                className="form-control"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            id="shipping_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            KONTYNUUJ
                            </button>
                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default Shipping
