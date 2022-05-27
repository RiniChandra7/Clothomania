import { createContext, useState } from "react";

import PROD from '../../shop-data.json';

export const ProductContext = createContext({
    products: [],
});

export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState(PROD);
    const value = {products};

    return (
        <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
    );
}