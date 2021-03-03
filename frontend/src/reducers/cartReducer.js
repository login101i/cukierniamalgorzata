import { ADD_TO_CART, REMOVE_ITEM_FROM_CART, SAVE_SHIPPING_INFO, APPLY_COUPON } from '../constants/cartConstants'


export const cartReducer = (state = { cartItems: [], shippingInfo: {}, coupon: {} }, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;

            const isItemExist = state.cartItems.find(i => i.product === item.product)
            if (isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(i => i.product === isItemExist.product ? item : i)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case REMOVE_ITEM_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(i => i.product !== action.payload)
            }
        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload
            }
        case APPLY_COUPON:
            return {
                ...state,
                coupon: action.payload
            }

        default:
            return state

    }
}