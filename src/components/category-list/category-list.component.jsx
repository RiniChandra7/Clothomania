import {DirectoryContainer} from './category-list.styles.jsx';
import CategoryItem from '../category-item/category-item.component';

const CategoryList = ({categories}) => {
    return (
        <DirectoryContainer>
            {categories.map((category) => (
                <CategoryItem key={category.id} category={category} />
            ))}
        </DirectoryContainer>
    )
}

export default CategoryList;