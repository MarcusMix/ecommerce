import { FunctionComponent, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineHome } from 'react-icons/ai'


//Styles
import { PaymentConfirmationContainer, PaymentConfirmationContent } from "./payment-confirmation.styles"

//Components
import CustomButton from "../../components/custom-button/custom-button.component"
import Header from "../../components/header/header.component"

//Ultilities
import Colors from "../../themes/themes.colors"
import { useDispatch } from "react-redux"
import { clearCartProducts } from "../../store/toolkit/cart/cart.slice"

const PaymentConfirmationPage: FunctionComponent = () => {

    const dispatch = useDispatch()

    const [searchParams] = useSearchParams()
    const status = searchParams.get('sucess')
    const isCanceled = searchParams.get('canceled') === 'true'

    const navigate = useNavigate()

    const handleGoToHomePageClick = () => {
        navigate('/')
    }

    useEffect(() => {
        if (status === 'true') {
            dispatch(clearCartProducts())
        }
    }, [status])

    return (
        <>
            <Header />

            <PaymentConfirmationContainer>
                <PaymentConfirmationContent>

                    {status === 'true' && (
                        <>
                            <AiOutlineCloseCircle size={120} color={Colors.sucess} />
                            <p>Sua compra foi finalizada com sucesso!</p>
                        </>
                    )}

                    {(status === 'false' || isCanceled) && (
                        <>
                            <AiOutlineCheckCircle size={120} color={Colors.error} />
                            <p>Ocoreu um erro ao finalizar sua compra. Por favor tente novamente!</p>
                        </>
                    )}


                    <CustomButton startIcon={<AiOutlineHome />} onClick={handleGoToHomePageClick}>Ir para a página inicial</CustomButton>
                </PaymentConfirmationContent>
            </PaymentConfirmationContainer>
        </>
    )
}

export default PaymentConfirmationPage