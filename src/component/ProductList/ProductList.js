import React, { useEffect, useState } from 'react';
import { useParams  } from 'react-router';

const ProductList = () => {
    const { id } = useParams;
    return (
        <div>
            <p>{id}</p>
        </div>
    );
}

export default ProductList;