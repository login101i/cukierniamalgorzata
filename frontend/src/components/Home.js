import React, { Fragment } from 'react'
import Loader from './layout/Loader'
import MetaData from './layout/MetaData'
import './home.css' 



const Home = () => {

    const loading = false

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Cukiernia Małgorzata'} />
                    <div className="container-fluid home">
                        <h1 id="products_heading">Cukiernia Małgorzata</h1>

                        <section id="products" className="container mt-5">
                            <div>
                                Tutaj będą produky
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
