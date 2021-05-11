import React from "react";
import { Box, Label, Divider, Flex, Text, Button, Input } from "bumbag";

import CartCard from "../../component/cartCard/cartCard";

const _removeFromCart = (cart, setCart, index) => () => {
  const newCart = [...cart];
  newCart.splice(index, 1);
  setCart(newCart);
};

const _getTotal = (items) => {
  const itemsExist = items.length > 0;
  let sum = 0;

  if (itemsExist) {
    sum = items.reduce((total, item) => total + item.VALUE * item.PRICE, 0);
  }

  return sum;
};

const itemList = (props) => {
  const { setCartList, cartList } = props;

  return (
    <div>
      {cartList.map((item, index) => (
        <CartCard
          item={item}
          onRemove={_removeFromCart(cartList, setCartList, index)}
          key={item.ID}
        />
      ))}
    </div>
  );
};

export default function OrderCart(props) {
  const { cartList } = props;
  const height = window.outerHeight;

  return (
    <Box
      margin="major-3"
      padding="major-1"
      border="3px solid gray"
      borderRadius="3"
      backgroundColor="white"
    >
      <Box margin="major-1" padding="major-1">
        <Label fontSize="300">Keranjang</Label>
      </Box>
      <Divider orientation="horizontal" margin="major-2" />
      <Box
        height={`${height / 3}px`}
        overflowY="auto"
        margin="major-1"
        padding="major-1"
      >
        {itemList(props)}
      </Box>
      <Divider orientation="horizontal" margin="major-2" />
      <Flex alignX="right" alignY="center" margin="major-1" padding="major-1">
        <Box>
          <Text>Total</Text>
        </Box>
        {/* <Divider orientation="Vertical" margin="major-2" /> */}
        <Box marginLeft="major-2">
          <Label>{_getTotal(cartList)}</Label>
        </Box>
      </Flex>
      <Divider orientation="horizontal" margin="major-2" />
      <Box>
        <Flex alignX="center" alignY="center">
          <Input label="Nama" width="40%" />
          <Input label="Nomor Whatsapp" width="40%" marginLeft="6%" />
        </Flex>
      </Box>
      <Box alignY="center">
        <Button
          size="large"
          margin="major-2"
          padding="major-1"
          borderRadius="5"
          palette="success"
        >
          <Label fontSize="300" margin="major-2">
            Pesan Sekarang
          </Label>
        </Button>
      </Box>
    </Box>
  );
}
