import { useState, useEffect } from "react";
import axios from "axios";

const _fetchData = async (
  setDisplayedList,
  setCategories,
  setProducts,
  defaultCategory
) => {
  try {
    const products = await axios.get(`https://kulkasku.herokuapp.com/product`);
    const categories = await axios.get(
      `https://kulkasku.herokuapp.com/category`
    );
    const newCategories = [defaultCategory, ...categories.data];
    setDisplayedList(products.data);
    setProducts(products.data);
    setCategories(newCategories);
  } catch (err) {
    console.log(err);
  }
};

const useOrderPage = () => {
  const defaultCategory = { categoryId: "ALL", name: "All" };
  const [displayedList, setDisplayedList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [cartList, setCartList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    defaultCategory.categoryId
  );

  useEffect(() => {
    _fetchData(setDisplayedList, setCategories, setProducts, defaultCategory);
    console.log("fetch");
  }, []);

  return {
    products,
    displayedList,
    setDisplayedList,
    categories,
    cartList,
    setCartList,
    selectedCategory,
    setSelectedCategory,
  };
};

export { useOrderPage };
