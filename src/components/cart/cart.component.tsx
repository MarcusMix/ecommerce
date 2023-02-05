import { FunctionComponent } from "react";
import { BsCartCheck } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/redux.hooks";

// Ultilities
import { toggleCart } from "../../store/toolkit/cart/cart.slice";

// Components
import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";

// Styles
import { CartContainer, CartEscapeArea, CartTitle, CartTotal, CartDiv } from "./cart.styles";
import { selectProductsCount, selectProductsTotalPrice } from "../../store/reducers/cart/cart.selector";


const Cart: FunctionComponent = () => {

    const productsTotalPrice = useAppSelector(selectProductsTotalPrice);
    const productsCount = useAppSelector(selectProductsCount);

    const { isVisible, products } = useAppSelector(state => state.cartReducer)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const handleGoToCheckoutClick = () => {
        dispatch(toggleCart())
        navigate('/checkout')
    }

    const handleScapeAreaClick = () => {
        dispatch(toggleCart())
    }

    return (
        <CartContainer isVisible={isVisible}>
            <CartEscapeArea onClick={handleScapeAreaClick} />
            <CartDiv>
                <CartTitle>Seu Carrinho</CartTitle>

                {products.map(product => <CartItem key={product.id} product={product} />)}

                {productsCount > 0 && (
                    <CartTotal> Total: R${productsTotalPrice}</CartTotal>
                )}

                {productsCount > 0 && (
                    <CustomButton startIcon={<BsCartCheck />} onClick={handleGoToCheckoutClick}>Ir para o checkout</CustomButton>
                )}

                {productsCount === 0 && (
                    <p>Seu carrinho está vazio!</p>
                )}
            </CartDiv>
        </CartContainer>
    )
}

export default Cart;