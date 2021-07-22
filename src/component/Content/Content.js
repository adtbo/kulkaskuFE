import React, { useEffect, useState } from 'react';
import CategoryCard from '../CategoryCard/CategoryCard';

import { getCategories } from '../../model/Categories';

const Content = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        setCategories(getCategories());
    }, []);
    return (
        <div className="flex flex-wrap place-content-center justify-items-center">
            <div className="flex flex-wrap">
                <p className="text-4xl tracking-wide font-mono text-yellow-600 h-20">CATEGORIES</p>
            </div>
            <div className="flex flex-wrap  items-center justify-center  px-96 md:px-56 sm:px-3.5">
                {categories.map((category) => (                        
                    <CategoryCard item={category} key={category.categoryId} />
                ))}
            </div>
                
        </div>
    );
};

export default Content;