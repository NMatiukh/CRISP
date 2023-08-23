import {CREATE_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT, GET_PRODUCTS, GET_PRODUCT} from "../types/PRODUCT";

const initialState = {
    data: [],
    item: {}
}

export default function productsReducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state
        case GET_PRODUCTS: {
            return {...state, data: action.payload}
        }
        case GET_PRODUCT: {
            return {...state, item: action.payload}
        }
        case CREATE_PRODUCT: {
            return {...state, data: [...state.data, action.payload]}
        }
        case EDIT_PRODUCT: {
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
        case DELETE_PRODUCT: {
            return {...state, data: state.data.filter(value => value.id !== action.payload.id)}
        }
    }
}