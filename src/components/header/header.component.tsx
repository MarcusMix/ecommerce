import { BsCart3 } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

//Styles
import { HeaderContainer, HeaderItems, HeaderItem, HeaderTitle, AvatarIcon } from './header.styles'

//Ultilities
import { useDispatch } from 'react-redux'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/firebase.config'
import { logoutUser } from '../../store/toolkit/user/user.slice'
import { toggleCart } from '../../store/toolkit/cart/cart.slice'
import { useAppSelector } from '../../hooks/redux.hooks'
import { selectProductsCount } from '../../store/reducers/cart/cart.selector'
import { useAuthState } from 'react-firebase-hooks/auth'

const Header = () => {

    const { isAuthenticated } = useAppSelector((rootReducer: any) => rootReducer.userReducer)

    const [user] = useAuthState(auth) 

    const productsCount = useAppSelector(selectProductsCount);

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const handleLoginClick = () => {
        navigate('/login')
    }

    const handleSignUpClick = () => {
        navigate('/sign-up')
    }

    const handlePagePrincipal = () => {
        navigate('/')
    }


    const handleExploreClick = () => {
        navigate('/explore')
    }

    const handleSignOutClick = () => {
        dispatch(logoutUser())
        signOut(auth)
    }

    const handleCartClick = () => {
        dispatch(toggleCart())
    }

    return (
        <HeaderContainer>
            <HeaderTitle onClick={handlePagePrincipal}>CLUB CLOTHING</HeaderTitle>

            <HeaderItems>
                <HeaderItem onClick={handleExploreClick}>Explorar</HeaderItem>
                {!isAuthenticated && (
                    <>
                        <HeaderItem onClick={handleLoginClick}>Login</HeaderItem>
                        <HeaderItem onClick={handleSignUpClick}>Criar Conta</HeaderItem>
                    </>
                )}

                {isAuthenticated && (
                    <>
                        <AvatarIcon src={user?.photoURL!}/>
                        <HeaderItem onClick={handleSignOutClick}>Sair</HeaderItem>
                    </>
                )}

                <HeaderItem onClick={handleCartClick}>
                    <BsCart3 size={25} />
                    <p>{productsCount}</p>
                </HeaderItem>
            </HeaderItems>
        </HeaderContainer>
    )
}

export default Header