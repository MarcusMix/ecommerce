import CartProduct from "../../../types/cart.types";
import CartActionType from "./cart.action-types";
import { CartActions } from "./cart.actions";

interface InitialState {
    isVisible: boolean;
    products: CartProduct[];
}

const initialState: InitialState = {
    isVisible: false,
    products: []
}

const cartReducer = (state = initialState, action: CartActions): InitialState => {
    switch (action.type) {

        case CartActionType.toggleCart:
            return { ...state, isVisible: !state.isVisible }

        case CartActionType.addProductToCart: {
            const product = action.payload;

            //se o produto ja está no carrinho
            const productIsAlreadyInCart = state.products.some((item) => item.id === product.id)

            //se sim, aumentar sua quantidade
            if (productIsAlreadyInCart) {
                return {
                    ...state,
                    products: state.products.map((item) =>
                        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
                }
            }

            //se não, adicionar
            return { ...state, products: [...state.products, { ...product, quantity: 1 }] }
        }

        case CartActionType.removeProductFromCart: {
            return { ...state, products: state.products.filter((product) => product.id !== action.payload) }
        }

        case CartActionType.increaseCartProductQuantity: {
            return {
                ...state, products: state.products.map(product => product.id === action.payload ?
                    { ...product, quantity: product.quantity + 1 } : product)
            }
        }

        case CartActionType.decreaseCartProductQuantity: {
            return {
                ...state, products: state.products.map(product => product.id === action.payload ?
                    { ...product, quantity: product.quantity - 1 } : product).filter(product => product.quantity > 0)
            }
        }

        case CartActionType.clearCartProducts: {
            return { ...state, products: [] }
        }

        default:
            return state
    }

}

export default cartReducer