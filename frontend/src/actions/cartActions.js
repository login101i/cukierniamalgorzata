import axios from 'axios';

import { ADD_TO_CART, REMOVE_ITEM_FROM_CART, SAVE_SHIPPING_INFO, APPLY_COUPON } from '../constants/cartConstants'


export const addItemToCart = (id, quantity) => async (dispatch, getState) => {

    const { data } = await axios.get(`/api/v1/product/${id}`)
    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.stock,
            quantity
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeItemFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: REMOVE_ITEM_FROM_CART,
        payload: id
    })
    // po uruchomieniu akcji type uruchomi się cartReducer i usunie z cartItems produkt. Teraz możemy zapisać go do localstorage
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingInfo = (data) => async (dispatch) => {

    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data
    })

    localStorage.setItem("ShippingInfo", JSON.stringify(data))
}


export const applyCoupon = (coupon, cartTotal) => async (dispatch) => {


    const config = {
        headers: {
            'ContentType': "application/json"
        }
    }

    const { data } = await axios.post(
        `/api/v1/cart/coupon`,
        { coupon, cartTotal }, config)

    console.log(data)

    dispatch({
        type: APPLY_COUPON,
        payload: data
    })

    if (data.message === "Error") {
        return data.message
    } else {
        return data
    }



}


