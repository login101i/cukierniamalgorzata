import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../layout/MetaData'

const OrderSuccess = () => {
    return (
        <Fragment>

            <MetaData title={'Zamówienie utworzone'} />

            <div className="row justify-content-center">
                <div className="col-6 mt-5 text-center">
                    <img className="my-5 img-fluid d-block mx-auto" src="/images/order_success.png" alt="Order Success" width="300" height="300" />

                    <h2>Twoje zamówienie zostało złożone pomyślnie..</h2>

                    <Link to="/orders/me">Przejdź do Twoich zamówień.</Link>
                    <h2>lub przejdź </h2>
                    <Link to="/">do strony głównej</Link>

                </div>

            </div>

        </Fragment>
    )
}

export default OrderSuccess
