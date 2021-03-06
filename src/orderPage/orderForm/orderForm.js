import React from "react";
import { useForm } from "react-hook-form";
import { Input, Group, Select, Box } from "bumbag";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import ProductCard from "../../component/productCard/productCard";

const _setCategory =
  (setSelectedCategory, setDisplayedList, items) => (event) => {
    const selectedCategory = event.target.value;

    const displayed =
      selectedCategory === "ALL"
        ? items
        : items.filter((item) => item.categoryId === selectedCategory);
    setDisplayedList(displayed);
    setSelectedCategory(selectedCategory);
  };

const _setSearchList =
  (items, selectedCategory, setDisplayedList) => (event) => {
    const searchString = event.target.value;

    if (searchString) {
      const filteredDisplayed =
        selectedCategory < 0
          ? items.filter((item) =>
              item.name.toLowerCase().includes(searchString.toLowerCase())
            )
          : items.filter(
              (item) =>
                item.categoryId === selectedCategory &&
                item.name.toLowerCase().includes(searchString.toLowerCase())
            );
      setDisplayedList(filteredDisplayed);
    }
  };

const _addToCart = (resetInput, cart, setCart, newItem) => (data) => {
  const dataIndex = `displayed-unit-input-${newItem.productId}`;
  const value = parseFloat(data[dataIndex]);
  if (!(value > 0)) {
    alert("quantity harus lebih dari 0");
    return;
  }

  resetInput({ [`displayed-unit-input-${newItem.productId}`]: "" });

  const newCart = [...cart];
  const existingIndex = cart.findIndex(
    (item) => item.productId === newItem.productId
  );

  if (existingIndex < 0) {
    newCart.push({ ...newItem, quantity: value });
  } else {
    const prevValue = newCart[existingIndex].quantity;
    newCart[existingIndex].quantity = value + prevValue;
  }

  setCart(newCart);
};

const categorySelect = (props) => {
  const { categories, setSelectedCategory, items, setDisplayedList } = props;

  return (
    <Select
      options={categories.map((category) => {
        return {
          label: category.name,
          value: category.categoryId,
        };
      })}
      onChange={_setCategory(setSelectedCategory, setDisplayedList, items)}
    />
  );
};

const itemSearch = (props) => {
  const { items, selectedCategory, setDisplayedList } = props;
  return (
    <Input
      after={
        <Input.Icon aria-label="search" icon={faSearch} type="font-awesome" />
      }
      placeholder="cari barang"
      onChange={_setSearchList(items, selectedCategory, setDisplayedList)}
    />
  );
};

const groupedSearch = (props) => (
  <Group>
    {categorySelect(props)}
    {itemSearch(props)}
  </Group>
);

const itemList = (props, methods) => {
  const { displayedList, cartList, setCartList } = props;
  const { register, handleSubmit, reset } = methods;
  const addProduct = (selected) =>
    handleSubmit(_addToCart(reset, cartList, setCartList, selected));

  return (
    <Box>
      {displayedList.map((item) => (
        <ProductCard
          item={item}
          key={item.productId}
          onPressAdd={addProduct(item)}
          register={register}
        />
      ))}
    </Box>
  );
};

export default function OrderForm(props) {
  const methods = useForm();
  return (
    <div>
      {groupedSearch(props)}
      {itemList(props, methods)}
    </div>
  );
}
