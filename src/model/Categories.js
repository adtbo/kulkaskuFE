import CategoryList from '../fixtures/category.json';
import CategoryDetailList from '../fixtures/items.json';


// this function will return data in chunks [[1,2,3],[4,5,6]]
// @n = how many content will be displayed in index of array
export const getCategoriesWithChunk = (n) => {
    const categories = CategoryList;
    const rows = [...Array(Math.ceil(categories.length/n))];
    const contentRows = rows.map((row, idx) => categories.slice(idx * 3, idx * 3 + 3));
    const categoriesInChunk = contentRows.map((cat, idx) => (cat));
    return categoriesInChunk;
}

export const getCategories = () => {
    return CategoryList;
}

export const getProductsByCategoryId = (id) => {
    const categoryById = CategoryDetailList.filter((category) => category.categoryId === id);
    if ( categoryById.length > 0 ) {
        return categoryById;
    } else {
        return [];
    }
}
