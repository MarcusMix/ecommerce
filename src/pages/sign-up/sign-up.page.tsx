import { FiLogIn } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import validator from 'validator'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

//Components
import CustomButton from "../../components/custom-button/custom-button.component"
import CustomInput from "../../components/custom-input/custom-input.component"
import Header from "../../components/header/header.component"
import InputErrorMessage from '../../components/input-error-message/input-error-message.component'

//Styles
import { SignUpContainer, SignUpContent, SignUpHeadline, SignUpInputContainer } from "./sign-up.styles"

//Ultilities
import { auth, db } from '../../config/firebase.config'
import Loading from '../../components/loading/loading.components'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../../hooks/redux.hooks'

interface SignUpForm {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

const SignUpPage = () => {

    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
    } = useForm<SignUpForm>()

    const [isLoading, setIsLoading] = useState(false)

    const watchPassword = watch('password')

    const { isAuthenticated } = useAppSelector((rootReducer) => rootReducer.userReducer)

    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/')
        }
    }, [isAuthenticated])

    const handleSubmitPress = async (data: SignUpForm) => {
        try {
            setIsLoading(true)
            const userCrendentials = await createUserWithEmailAndPassword(auth, data.email, data.password)


            await addDoc(collection(db, 'users'), {
                id: userCrendentials.user.uid,
                email: userCrendentials.user.email,
                firstName: data.firstName,
                lastName: data.lastName,
                provide: 'firebase'
            })
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <>
            <Header />
            {isLoading && <Loading />}
            <SignUpContainer>
                <SignUpContent>
                    <SignUpHeadline>Crie sua conta</SignUpHeadline>

                    <SignUpInputContainer>
                        <p>Nome</p>
                        <CustomInput
                            hasError={!!errors?.firstName}
                            placeholder="Digite seu nome"
                            {...register('firstName', { required: true })}
                        />

                        {errors?.firstName?.type === 'required' && (
                            <InputErrorMessage>O nome é obrigatório.</InputErrorMessage>
                        )}

                    </SignUpInputContainer>

                    <SignUpInputContainer>
                        <p>Sobrenome</p>
                        <CustomInput
                            hasError={!!errors?.lastName}
                            placeholder="Digite seu sobrenome"
                            {...register('lastName', { required: true })}
                        />

                        {errors?.lastName?.type === 'required' && (
                            <InputErrorMessage>O sobrenome é obrigatório.</InputErrorMessage>
                        )}

                    </SignUpInputContainer>

                    <SignUpInputContainer>
                        <p>E-mail</p>
                        <CustomInput
                            hasError={!!errors?.email}
                            placeholder="Digite seu e-mail"
                            {...register('email', {
                                required: true, validate: (value) => {
                                    return validator.isEmail(value)
                                }
                            })}
                        />

                        {errors?.password?.type === 'required' && (
                            <InputErrorMessage>O email é obrigatório.</InputErrorMessage>
                        )}

                        {errors?.email?.type === 'validate' && (
                            <InputErrorMessage>Insira um email valido!</InputErrorMessage>
                        )}
                    </SignUpInputContainer>

                    <SignUpInputContainer>
                        <p>Senha</p>
                        <CustomInput
                            hasError={!!errors?.password}
                            placeholder="Digite sua senha" type="password"
                            {...register('password', { required: true })}
                        />

                        {errors?.password?.type === 'required' && (
                            <InputErrorMessage>A senha é obrigatória.</InputErrorMessage>
                        )}
                    </SignUpInputContainer>

                    <SignUpInputContainer>
                        <p>Confirmação de Senha</p>
                        <CustomInput
                            hasError={!!errors?.password}
                            placeholder="Confirme sua senha" type="password"
                            {...register('passwordConfirmation', {
                                required: true,
                                validate: (value) => {
                                    return value === watchPassword
                                }
                            })}
                        />

                        {errors?.passwordConfirmation?.type === 'required' && (
                            <InputErrorMessage>A confirmação de senha é obrigatória.</InputErrorMessage>
                        )}

                        {errors?.passwordConfirmation?.type === 'validate' && (
                            <InputErrorMessage>A confirmação de senha precisa ser igual a senha.</InputErrorMessage>
                        )}

                    </SignUpInputContainer>

                    <CustomButton
                        startIcon={<FiLogIn size={18} />}
                        onClick={() => handleSubmit(handleSubmitPress)()}
                    >Criar conta

                    </CustomButton>

                </SignUpContent>
            </SignUpContainer>

        </>
    )
}

export default SignUpPage