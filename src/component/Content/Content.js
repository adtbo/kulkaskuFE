import React from 'react';
import CategoryCard from '../CategoryCard/CategoryCard';
import Loader from '../Loader/Loader';

import { getCategories } from '../../model/Categories';

const Content = () => {
    const categories = getCategories();
    return (
        <div className="grid grid-rows-1 justify-items-center">
            <div className="grid-rows-1">
                <p className="text-4xl tracking-wide font-mono text-yellow-600 h-20">CATEGORIES</p>
            </div>
            <div className="grid-rows-1 px-96 md:px-56 sm:px-3.5">
                <div className="grid grid-cols-3 grid-flow-col auto-cols-max gap4 h-1/4" >
                    { categories.length > 0 ? categories.map((category) => <CategoryCard item={category} key={category.categoryId} />) : <Loader /> }
                </div>
            </div>
                
        </div>
    );
};

export default Content;