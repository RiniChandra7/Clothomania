import ProductCard from '../product-card/product-card.component';
import {CategoryPreviewContainer, Title, Preview} from './category-preview.styles.jsx';

import { Link } from 'react-router-dom';

const CategoryPreview = ({title, prod}) => {
    return (
        <CategoryPreviewContainer>
            <h2>
                <Title to={title}>{title.toUpperCase()}</Title>
            </h2>
            <Preview>
                {
                    prod.filter((_, ind) => ind < 4)
                    .map((product) => 
                    <ProductCard key={product.id} product={product} />)
                }
            </Preview>
        </CategoryPreviewContainer>
    );
}

export default CategoryPreview;