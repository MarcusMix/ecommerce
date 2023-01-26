import { FunctionComponent, ReactNode, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";


// Components
import Header from "../header/header.component";
import Loading from "../loading/loading.components";

// Ultilities
import { useSelector } from "react-redux";
import rootReducer from "../../store/root-reducer";

interface IChildren {
    children: ReactNode
}


const AuthenticationGuard: FunctionComponent<IChildren> = ({ children }) => {
    const { isAuthenticated } = useSelector((rootReducer: any) => rootReducer.userReducer)

    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuthenticated) {
            setTimeout(() => {
                navigate('/login')
            }, 3000)
        }
    }, [isAuthenticated])

    if (!isAuthenticated) {
        return <>
            <Header />
            <Loading message="Voce precisa estar logado!" />
        </>
    }


    return <>{children}</>
}

export default AuthenticationGuard