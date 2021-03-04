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
            <nav className={`navbar navbar-expand-lg navbar-light bg-light nav ${show && "nav_black"}  `}>
                <Link to="/">
                    <img
                        // className="nav_logoLeft"
                        src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
                        alt=" Movie DataBase Logo"
                        style={{ width: '54px', marginLeft: '30px' }}
                    />
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
