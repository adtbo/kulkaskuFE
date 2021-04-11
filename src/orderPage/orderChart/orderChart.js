import React from "react";
import {
  IconButton,
  Grid,
  Paper,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";

import styles from "../orderStyles";

const _removeFromCart = (cart, setCart, index) => () => {
  const newCart = [...cart];
  newCart.splice(index, 1);
  setCart(newCart);
};

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
                onClick={_removeFromCart(props.cartItems, props.setCart, index)}
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

export default function OrderChart(props) {
  const { setCartList, cartList } = props;

  return (
    <Grid direction={"column"} container>
      <Paper style={styles.cardContainer}>
        <h2>KERANJANG</h2>
        <CartList cartItems={cartList} setCart={setCartList} />
      </Paper>
    </Grid>
  );
}
