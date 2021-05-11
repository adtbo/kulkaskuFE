import React from "react";
import { useForm } from "react-hook-form";
import { Input, Group, Select, Box } from "bumbag";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import ProductCard from "../../component/productCard/productCard";

const _setCategory = (setSelectedCategory, setDisplayedList, items) => (
  event
) => {
  const selectedCategory = parseFloat(event.target.value);

  const displayed =
    selectedCategory < 0
      ? items
      : items.filter((item) => item.CATEGORY_ID === selectedCategory);
  setDisplayedList(displayed);
  setSelectedCategory(selectedCategory);
};

const _setSearchList = (items, selectedCategory, setDisplayedList) => (
  event
) => {
  const searchString = event.target.value;

  if (searchString) {
    const filteredDisplayed =
      selectedCategory < 0
        ? items.filter((item) =>
            item.NAME.toLowerCase().includes(searchString.toLowerCase())
          )
        : items.filter(
            (item) =>
              item.CATEGORY_ID === selectedCategory &&
              item.NAME.toLowerCase().includes(searchString.toLowerCase())
          );
    setDisplayedList(filteredDisplayed);
  }
};

const _addToCart = (resetInput, cart, setCart, newItem) => (data) => {
  const dataIndex = `displayed-unit-input-${newItem.ID}`;
  const value = data[dataIndex];

  resetInput({ [`displayed-unit-input-${newItem.ID}`]: "" });

  const newCart = [...cart];
  const existingIndex = cart.findIndex((item) => item.ID === newItem.ID);

  if (existingIndex < 0) {
    newCart.push({ ...newItem, VALUE: value });
  } else {
    const prevValue = newCart[existingIndex].VALUE;
    newCart[existingIndex].VALUE = parseFloat(value) + parseFloat(prevValue);
  }

  setCart(newCart);
};

const categorySelect = (props) => {
  const { categories, setSelectedCategory, items, setDisplayedList } = props;

  return (
    <Select
      options={categories.map((category) => {
        return {
          label: category.NAME,
          value: category.ID,
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
          key={item.ID}
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
