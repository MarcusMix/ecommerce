import { createContext, FunctionComponent, ReactNode, useEffect, useMemo, useState } from "react";
import CartProduct from "../types/cart.types";
import Product from "../types/product.types";


interface ICartContext {
    isVisible: boolean;
    productsTotalPrice: number;
    productsCount: number;
    products: CartProduct[];
    toggleCart: () => void;
    addProductsToCart: (product: Product) => void
    removeProductFromCart: (productId: string) => void
    increseProductQuantity: (productId: string) => void
    decreaseProductQuantity: (productId: string) => void
    clearProducts: () => void
}

interface IChildren {
    children: ReactNode
}

export const CartContext = createContext<ICartContext>({
    isVisible: false,
    productsTotalPrice: 0,
    productsCount: 0,
    products: [],
    toggleCart: () => { },
    addProductsToCart: () => { },
    removeProductFromCart: () => { },
    increseProductQuantity: () => { },
    decreaseProductQuantity: () => { },
    clearProducts: () => { }
})


const CartContextProvider: FunctionComponent<IChildren> = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [products, setProducts] = useState<CartProduct[]>([])

    useEffect(() => {
        const productsFromLocalStore = JSON.parse(
            localStorage.getItem('cartProducts')!
        )

        setProducts(productsFromLocalStore)
    }, [])

    useEffect(() => {
        localStorage.setItem('cartProducts', JSON.stringify(products))
    }, [products])

    const productsTotalPrice = useMemo(() => {
        return products.reduce((acc, currentProduct) => {
            return acc + currentProduct.price * currentProduct.quantity
        }, 0)
    }, [products])

    const productsCount = useMemo(() => {
        return products.reduce((acc, currentProduct) => {
            return acc + currentProduct.quantity
        }, 0)
    }, [products])

    const toggleCart = () => {
        setIsVisible((prevState) => !prevState)
    }

    const addProductsToCart = (product: Product) => {
        const productIsAlreadyInCart = products.some((item) => item.id === product.id)

        if (productIsAlreadyInCart) {
            return setProducts(products => products.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ))
        }

        setProducts(prevState => [...prevState, { ...product, quantity: 1 }])
    }


    const removeProductFromCart = (productId: string) => {
        setProducts(products => products.filter(product => product.id !== productId))
    }

    const increseProductQuantity = (productId: string) => {
        setProducts(products => products.map(product => product.id === productId ?
            { ...product, quantity: product.quantity + 1 } : product))
    }

    const decreaseProductQuantity = (productId: string) => {
        setProducts(products => products.map(product => product.id === productId ?
            { ...product, quantity: product.quantity - 1 } : product).filter(product => product.quantity > 0)
        )
    }

    const clearProducts = () => {
        setProducts([])
    }


    return (
        <CartContext.Provider
            value={{
                isVisible,
                productsTotalPrice,
                productsCount,
                products,
                toggleCart,
                addProductsToCart,
                removeProductFromCart,
                increseProductQuantity,
                decreaseProductQuantity,
                clearProducts
            }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider