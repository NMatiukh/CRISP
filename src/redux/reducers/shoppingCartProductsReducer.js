import {
    CREATE_SHOPPING_CARD_PRODUCT,
    DELETE_SHOPPING_CARD_PRODUCT,
    EDIT_SHOPPING_CARD_PRODUCT,
    GET_SHOPPING_CARD_PRODUCTS,
    GET_SHOPPING_CARD_PRODUCT, CLEAR_SHOPPING_CARD_PRODUCTS
} from "../types/SHOPPING_CARD_PRODUCT";

const initialState = {
    data: [],
    item: {}
}

export default function shoppingCartProductsReducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state
        case GET_SHOPPING_CARD_PRODUCTS: {
            return {...state, data: action.payload}
        }
        case GET_SHOPPING_CARD_PRODUCT: {
            return {...state, item: action.payload}
        }
        case CREATE_SHOPPING_CARD_PRODUCT: {
            if (state.data.find(value => value.id === action.payload.id)) {
                return {
                    ...state, data: state.data.map(value => {
                        if (value.id === action.payload.id) {
                            return {...value, quantity: value.quantity + action.payload.quantity}
                        } else {
                            return value
                        }
                    })
                }
            } else {
                return {...state, data: [...state.data, action.payload]}
            }
        }
        case EDIT_SHOPPING_CARD_PRODUCT: {
            return {
                ...state, data: state.data.map(value => {
                    if (value.id === action.payload.id) {
                        return action.payload
                    } else {
                        return value
                    }
                })
            }
        }
        case DELETE_SHOPPING_CARD_PRODUCT: {
            return {...state, data: state.data.filter(value => value.id !== action.payload.id)}
        }
        case CLEAR_SHOPPING_CARD_PRODUCTS: {
            return {...state, data: []}
        }
    }
}