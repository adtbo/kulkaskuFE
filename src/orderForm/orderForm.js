import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  IconButton,
  Grid,
  Input,
  Paper,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";

const items = require("../fixtures/items.json");
const categories = require("../fixtures/category.json");

const setDisplayedList = (setDisplayed, categoryId) => () => {
  const displayed = items.filter((item) => item.CATEGORY_ID === categoryId);
  setDisplayed(displayed);
};

const addToCart = (resetInput, cart, setCart, newItem) => (data) => {
  const dataIndex = `displayed-unit-input-${newItem.ID}`;
  const value = data[dataIndex];

  resetInput({ [`displayed-unit-input-${newItem.ID}`]: "" });

  const newCart = [...cart];
  const existingIndex = cart.findIndex((item) => item.ID === newItem.ID);

  if (existingIndex < 0) {
    newCart.push({ ...newItem, VALUE: value });
    setCart(newCart);
  } else {
    const prevValue = newCart[existingIndex].VALUE;
    newCart[existingIndex].VALUE = parseFloat(value) + parseFloat(prevValue);
    setCart(newCart);
  }
};

const removeFromCart = (cart, setCart, index) => () => {
  const newCart = [...cart];
  newCart.splice(index, 1);
  setCart(newCart);
};

function CategoryList(props) {
  return (
    <Grid container direction={"row"} justify={"space-around"}>
      {categories.map((category) => (
        <Grid items>
          <Button
            color="primary"
            onClick={setDisplayedList(props.setDisplayed, category.ID)}
          >
            {category.NAME}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
}

function DisplayedList(props) {
  const { register, handleSubmit, reset } = useForm();
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell component="th" scope="row">
            Nama
          </TableCell>
          <TableCell align="center">Harga</TableCell>
          <TableCell align="right">Satuan</TableCell>
          <TableCell align="right" />
        </TableRow>
      </TableHead>
      <TableBody>
        {props.items.map((row) => (
          <TableRow key={row.id}>
            <TableCell component="th" scope="row">
              {row.NAME}
            </TableCell>
            <TableCell align="right">{`${row.PRICE} / ${row.UNIT}`}</TableCell>
            <TableCell align="right">
              <Input
                id={`displayed-unit-input-${row.ID}`}
                name={`displayed-unit-input-${row.ID}`}
                type={"number"}
                inputRef={register()}
              />
              {row.UNIT}
            </TableCell>
            <TableCell align="right">
              <Button
                variant="outlined"
                onClick={handleSubmit(
                  addToCart(reset, props.cart, props.setCart, row)
                )}
              >
                add to cart
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function CartList(props) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell component="th" scope="row">
            Nama
          </TableCell>
          <TableCell align="right">Satuan</TableCell>
          <TableCell align="right">Total</TableCell>
          <TableCell align="right" />
        </TableRow>
      </TableHead>
      <TableBody>
        {props.cartItems.map((row, index) => (
          <TableRow key={row.id}>
            <TableCell component="th" scope="row">
              {row.NAME}
            </TableCell>
            <TableCell align="right">{`${row.VALUE} ${row.UNIT}`}</TableCell>
            <TableCell align="right">
              {parseFloat(row.VALUE) * parseFloat(row.PRICE)}
            </TableCell>
            <TableCell align="right">
              <IconButton
                aria-label="Delete"
                onClick={removeFromCart(props.cartItems, props.setCart, index)}
              >
                <Delete />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function OrderForm() {
  const defaultCategory = categories[0];
  const defaultList = items.filter(
    (item) => item.CATEGORY_ID === defaultCategory.ID
  );

  const [displayedList, setDisplayedList] = useState(defaultList);
  const [cartList, setCartList] = useState(new Array());

  return (
    <Grid direction={"row"} container>
      <Grid direction={"column"} container xs={8}>
        <Paper>
          <h2>DAFTAR BELANJA</h2>
          <CategoryList setDisplayed={setDisplayedList} />
          <DisplayedList
            cart={cartList}
            items={displayedList}
            setCart={setCartList}
            setDisplayed={setDisplayedList}
          />
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper>
          <h2>CART</h2>
          <CartList cartItems={cartList} setCart={setCartList} />
        </Paper>
      </Grid>
    </Grid>
  );
}
