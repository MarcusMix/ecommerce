import { FunctionComponent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

//Ultilities
import Category from "../../types/category.types"

//Styles
import { CategoryItemContainer, CategoryName } from './category-item.styles'


interface CategoryItemProps {
    category: Category
}

const CategoryItem: FunctionComponent<CategoryItemProps> = ({ category }) => {
    const navigate = useNavigate()

    const handleExploreClick = () => {
        navigate(`/category/${category.id}`)
    }
    return (
        <CategoryItemContainer backgroundImage={category.imageUrl}>
            <CategoryName onClick={handleExploreClick}>
                <p>{category.displayName}</p>
                <p>Explorar</p>
            </CategoryName>
        </CategoryItemContainer>
    )
}

export default CategoryItem