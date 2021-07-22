import CategoryList from '../fixtures/category.json'


// this function will return data in chunks [[1,2,3],[4,5,6]]
// @n = how many content will be displayed in index of array
export const getCategories = (n) => {
    const categories = CategoryList;
    const rows = [...Array(Math.ceil(categories.length/n))];
    const contentRows = rows.map((row, idx) => categories.slice(idx * 3, idx * 3 + 3));
    const categoriesInChunk = contentRows.map((cat, idx) => (cat));
    return categoriesInChunk;
}
