import React, { useEffect, useState } from 'react';
import CategoryCard from '../CategoryCard/CategoryCard';
import Loader from '../Loader/Loader';

import { getCategories } from '../../model/Categories';

const Content = () => {
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        setCategories(getCategories(3));
    }, []);
    console.log(categories);
    return (
        <div className="grid grid-rows-1 justify-items-center">
            <div className="grid-rows-1">
                <p className="text-4xl tracking-wide font-mono text-yellow-600 h-20">CATEGORIES</p>
            </div>
            <div className="grid-rows-1 px-96 md:px-56 sm:px-3.5">
                { categories.map((categoryList) => 
                    /* display the row */
                    <div className="grid grid-cols-3 grid-flow-col auto-cols-max gap4" > 
                        {
                            /* display the column */
                        categoryList.map((category) => (                        
                            <CategoryCard item={category} key={category.categoryId} />
                        ))} 
                    </div>
                    
                )}
            </div>
                
        </div>
    );
};

export default Content;