import { FunctionComponent } from 'react'

// Styles
import { InputErrorMessageContainer } from './input-error-message.styles'

interface Children {
    children: string
}

const InputErrorMessage: FunctionComponent<Children> = ({ children }) => {
    return <InputErrorMessageContainer>{children}</InputErrorMessageContainer>
}

export default InputErrorMessage