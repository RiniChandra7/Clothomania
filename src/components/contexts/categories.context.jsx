import { createContext, useEffect, useState } from "react";

//import SHOP_DATA from '../../shop-data.js';

import { getCategoriesandDocuments } from "../../utils/firebase/firebase.utils.js";

export const CategoryContext = createContext({
    categories: {},
});

export const CategoryProvider = ({children}) => {
    const [categories, setCategories] = useState({});
    /*useEffect(() => {
        addCollectionAndDocuments('categories', SHOP_DATA)
    }, [])*/

    useEffect(() => {
        const getCategoryMap = async () => {
            const categoryMap = await getCategoriesandDocuments();
            setCategories(categoryMap);
        };

        getCategoryMap();
    }, []);

    console.log(categories);

    const value = {categories};

    return (
        <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>
    );
}