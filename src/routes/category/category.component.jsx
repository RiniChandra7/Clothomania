import { useParams } from "react-router-dom";
import { Fragment, useContext, useEffect, useState } from "react";

import {CategoryContainer} from './category.styles.jsx';
import { CategoryContext } from "../../components/contexts/categories.context";
import ProductCard from "../../components/product-card/product-card.component";

const Category = () => {
    const {category} = useParams();
    const {categories} = useContext(CategoryContext);

    const [products, setProducts] = useState(categories[category]);
    console.log(categories);

    useEffect(() => {
        setProducts(categories[category]);
    }, [category, categories]);

    console.log(products);
    return (
        <Fragment>
            <h2 className="title">{category.toUpperCase()}</h2>
            <CategoryContainer>
                {
                    products && products.map((product) => <ProductCard key={product.id} product={product} />)
                }
            </CategoryContainer>
        </Fragment>
    );
}

export default Category;