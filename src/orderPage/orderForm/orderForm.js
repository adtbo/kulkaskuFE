import React from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Grid,
  Input,
  Paper,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
} from "@material-ui/core";

import styles from "../orderStyles";

const _setDisplayedList = (setDisplayed, categoryId, allItems) => () => {
  const displayed = allItems.filter((item) => item.CATEGORY_ID === categoryId);
  setDisplayed(displayed);
};

const _addToCart = (resetInput, cart, setCart, newItem, setIsNew) => (data) => {
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
  setIsNew(true);
};

function CategoryList(props) {
  return (
    <Grid container direction={"row"} justify={"space-around"}>
      {props.allCategories.map((category) => (
        <Grid items>
          <Button
            variant="outlined"
            color="primary"
            onClick={_setDisplayedList(
              props.setDisplayed,
              category.ID,
              props.allItems
            )}
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
                  _addToCart(
                    reset,
                    props.cart,
                    props.setCart,
                    row,
                    props.setIsNew
                  )
                )}
              >
                tambah
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function OrderForm(props) {
  const {
    displayedList,
    setDisplayedList,
    cartList,
    setCartList,
    items,
    categories,
    setIsNew,
  } = props;

  return (
    <Grid direction={"column"} container>
      <Paper style={styles.cardContainer}>
        <h2>DAFTAR BELANJA</h2>
        <CategoryList
          setDisplayed={setDisplayedList}
          allCategories={categories}
          allItems={items}
        />
        <DisplayedList
          cart={cartList}
          items={displayedList}
          setCart={setCartList}
          setDisplayed={setDisplayedList}
          allCategories={categories}
          allItems={items}
          setIsNew={setIsNew}
        />
      </Paper>
    </Grid>
  );
}
