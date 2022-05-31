import { Fragment, useContext } from "react";
import CategoryPreview from "../../components/category-preview/category-preview.component";

import { CategoryContext } from "../../components/contexts/categories.context";

const CategoriesPreview = () => {
    const {categories} = useContext(CategoryContext);

    return (
        <Fragment>
            {Object.keys(categories).map((title) => {
                const products = categories[title];
                return (
                    <CategoryPreview key={title} title={title} prod={products} />
                );
            })}
        </Fragment>
    );
}

export default CategoriesPreview;