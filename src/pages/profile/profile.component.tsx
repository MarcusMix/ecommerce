//auth
import { signOut } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../config/firebase.config'

//router
import { useNavigate } from 'react-router-dom'

//styles
import { Wrapper } from './profile.styles'
import { HeaderContainer, HeaderItem, HeaderTitle } from '../../components/header/header.styles'

//icons
import { HiHome } from 'react-icons/hi'

//redux
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../store/toolkit/user/user.slice'

//components
import CustomButton from '../../components/custom-button/custom-button.component'

const Profile = () => {

    const [user] = useAuthState(auth) 

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const handleSignOutClick = () => {
        dispatch(logoutUser())
        signOut(auth)
        navigate('/')
    }

    const handleBackToHomePage = () => {
        navigate('/')
    }

    return (
        <>
        {/* <Header/> */}
        <HeaderContainer>
            <HeaderTitle onClick={() => navigate('/')}>CLUB CLOTHING</HeaderTitle>
            <HeaderItem onClick={handleSignOutClick}>Sair</HeaderItem>
        </HeaderContainer>
        <Wrapper>
            <h1>{user?.displayName}</h1>
            <h1>{user?.email}</h1>
            <img src={user?.photoURL} alt={user?.displayName!} />
            <div>
                <CustomButton onClick={handleBackToHomePage}> <HiHome size={20}/> Voltar para página principal</CustomButton>
            </div>
        </Wrapper>
        </>
    )
}

export default Profile

function dispatch(arg0: { payload: undefined; type: "user/logoutUser" }) {
    throw new Error('Function not implemented.')
}
