import React from "react";

function CategoryCard(props) {
    const { item } = props;
    return (
        <div className="w-3/4 gap-4 rounded-xl space-x-4 m-5 p-1 place-content-center content-center items-center justify-center shadow-2xl">
            <div className="filter hover:blur">
                <img className="rounded-xl object-center w-max" src={item.image} alt={item.name} />
            </div>
        </div>
    )
};

export default CategoryCard;