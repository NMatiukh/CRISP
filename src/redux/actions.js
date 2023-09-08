import {
    CLEAR_SHOPPING_CARD_PRODUCTS,
    CREATE_SHOPPING_CARD_PRODUCT,
    EDIT_SHOPPING_CARD_PRODUCT
} from "./types/SHOPPING_CARD_PRODUCT";


export function addProductToShoppingCard(product, quantity, color, size) {
    return {
        type: CREATE_SHOPPING_CARD_PRODUCT, payload:
            {
                name: product.name,
                color: color,
                id: product.id + color + size,
                price: product.price,
                quantity: quantity,
                size: size,
                image: product.images[color][0]
            }
    }
}

export function editProductToShoppingCard(product, quantity) {
    return {
        type: EDIT_SHOPPING_CARD_PRODUCT, payload: {...product, quantity: quantity}
    }

}

export function clearShoppingCard() {
    return {
        type: CLEAR_SHOPPING_CARD_PRODUCTS
    }
}