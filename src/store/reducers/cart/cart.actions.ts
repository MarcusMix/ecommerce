
import { type } from "os"
import Product from "../../../types/product.types"
import CartActionType from "./cart.action-types"

//toggleCart
interface ToggleCartAction {
    type: typeof CartActionType.toggleCart
}

export const toggleCart = (): ToggleCartAction => ({
    type: CartActionType.toggleCart
})

//productToCart
interface AddProductToCartAction {
    type: typeof CartActionType.addProductToCart
    payload: Product
}

export const addProductToCart = (payload: Product): AddProductToCartAction => ({
    type: CartActionType.addProductToCart,
    payload
})

//removeProducts
interface RemoveProductFromCartAction {
    type: typeof CartActionType.removeProductFromCart
    payload: string
}

export const removeProductFromCart = (payload: string): RemoveProductFromCartAction => ({
    type: CartActionType.removeProductFromCart,
    payload
})


//increateProduct
interface IncreaseCartProductQuantityAction {
    type: typeof CartActionType.increaseCartProductQuantity
    payload: string
}

export const increaseCartProductQuantity = (payload: string): IncreaseCartProductQuantityAction => ({
    type: CartActionType.increaseCartProductQuantity,
    payload
})


//decreaseCartPruduct
interface DecreaseCartProductQuantityAction {
    type: typeof CartActionType.decreaseCartProductQuantity,
    payload: string
}

export const decreaseCartProductQuantity = (payload: string): DecreaseCartProductQuantityAction => ({
    type: CartActionType.decreaseCartProductQuantity,
    payload
})



//clearProduct
interface ClearCartProductsAction {
    type: typeof CartActionType.clearCartProducts
}

export const clearCartProducts = (): ClearCartProductsAction => ({
    type: CartActionType.clearCartProducts
})


export type CartActions = 
    | ToggleCartAction
    | AddProductToCartAction 
    | IncreaseCartProductQuantityAction 
    | DecreaseCartProductQuantityAction
    | RemoveProductFromCartAction 
    | ClearCartProductsAction