import { render } from "@testing-library/react"

//components
import CustomInput from "../components/custom-input/custom-input.component"

//themes
import Colors from "../themes/themes.colors"

describe('Custom Input', () => {
    it('should render with error if hasError is true', () => {
        const { getByPlaceholderText } = render(<CustomInput placeholder="lorem ipsum" hasError={true}/>)

        const input = getByPlaceholderText('lorem ipsum')

        expect(input).toHaveStyle({ border: `2px solid ${Colors.error}`})
    })

    it('should render without error ir hasError is false', () => {
        const { getByPlaceholderText } = render(<CustomInput placeholder="lorem ipsum" hasError={false}/>)

        const input = getByPlaceholderText('lorem ipsum')

        expect(input).toHaveStyle({border: 'none'})
    })
})