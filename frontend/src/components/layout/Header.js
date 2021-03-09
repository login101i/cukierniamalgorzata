import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './header.css'
import Search from './Search'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { logout } from '../../actions/userActions'





const Header = () => {
    const [show, setShow] = useState()

    const alert = useAlert();
    const dispatch = useDispatch();



    const { user, loading } = useSelector(state => state.auth)
    const { cartItems } = useSelector(state => state.cart)


    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 20) {
                setShow(true)
            } else setShow(false);
        });
        // return () => {
        //     window.removeEventListener("scroll")
        // }
    }, []);

    const logoutHandler = () => {
        dispatch(logout());
        alert.success('Wylogowano.')
    }

    return (
        <>
            <nav className={`navbar navbar-expand-lg navbar-light bg-light nav ${show && "nav_black"}`}>
                <Link to="/" style={{ flex: 1 }}>
                    <img
                        // className="nav_logoLeft"
                        src='https://scontent-frt3-1.xx.fbcdn.net/v/t1.0-9/1982023_674726905944253_1985470084_n.jpg?_nc_cat=102&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=K7iqSSDLQSwAX_JcJzW&_nc_ht=scontent-frt3-1.xx&oh=1d356350d07a7ba754b791e7a0da0511&oe=606B7C1C'
                        alt=" Movie DataBase Logo"
                        style={{ width: '54px', marginLeft: '30px' }}
                    />
                </Link>

                <Link to="cart">
                    <i className="fas fa-cart-plus fa-2x fasIcon m-3 relative ">
                        <div className="cartBadge"
                            style={{ fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >{cartItems.length === 0 ? "" : cartItems.length}</div>

                    </i>
                </Link>

                <button className={`navbar-toggler ${show && " nav_white"} `} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">


                    </ul>
                    <Route
                        render={({ history }) => <Search history={history} />}
                    />

                    {user ? (
                        <div className="ml-4 mr-5 dropdown d-inline">
                            <Link to="#!" className="btn dropdown-toggle text-white mr-4" type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                                <figure className="avatar avatar-nav mr-5">
                                    <img
                                        src={user.avatar && user.avatar.url}
                                        alt={user && user.name}
                                        className="rounded-circle"
                                    />
                                </figure>
                                <span>{user && user.name}</span>
                            </Link>
                            <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">

                                {user && user.role === 'admin' && (
                                    <Link className="dropdown-item" to="/dashboard">Panel Użytkownika</Link>
                                )}
                                <Link className="dropdown-item" to="/orders/me">Zamówienia</Link>
                                <Link className="dropdown-item" to="/me">Twój Profil</Link>
                                <Link className="dropdown-item text-danger" to="/" onClick={logoutHandler}>
                                    Wyloguj się
                                </Link>

                            </div>
                        </div>

                    ) : !loading && <Link to="/login" className="btn ml-4" id="login_btn">Zaloguj się</Link>}



                </div>
            </nav>


        </>
    )
}

export default Header
