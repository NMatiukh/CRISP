import {CREATE_SHOPPING_CARD_PRODUCT, EDIT_SHOPPING_CARD_PRODUCT} from "./types/SHOPPING_CARD_PRODUCT";


export function addProductToShoppingCard(product, quantity, color) {
    return {
        type: CREATE_SHOPPING_CARD_PRODUCT, payload:
            {
                name: product.name,
                color: color,
                id: product.id + color,
                price: product.price,
                quantity: quantity,
                sizes: product.sizes,
                image: product.images[color]
            }
    }
}

export function editProductToShoppingCard(product, quantity) {
    return {
        type: EDIT_SHOPPING_CARD_PRODUCT, payload: {...product, quantity: quantity}
    }

}