import React from "react";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { Flex, Icon, Button, Text, Modal, Box } from "bumbag";

import OrderCart from "./orderCart/orderCart";
import OrderForm from "./orderForm/orderForm";
import { useOrderPage } from "./useOrderPage";

const cartButton = (props) => (
  <Flex
    style={{
      position: "fixed",
      bottom: 20,
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      zIndex: 9999,
    }}
  >
    <Button
      margin="major-1"
      padding="major-1"
      style={{
        borderRadius: 100,
      }}
      palette="warning400"
    >
      <Flex alignY="center" margin="major-1" padding="major-1">
        <Icon icon={faCartPlus} type="font-awesome" />
        <Text paddingLeft="major-2">Lihat Keranjang</Text>
      </Flex>
    </Button>
  </Flex>
);

const cartModal = (modal, cartList, setCartList) => (
  <Modal.State animated>
    <Modal.Disclosure {...modal}>
      {cartList.length > 0 && cartButton()}
    </Modal.Disclosure>
    <Modal fade slide {...modal} width="90%">
      <OrderCart cartList={cartList} setCartList={setCartList} />
    </Modal>
  </Modal.State>
);

export default function OrderPage() {
  const {
    products,
    displayedList,
    setDisplayedList,
    categories,
    cartList,
    setCartList,
    selectedCategory,
    setSelectedCategory,
  } = useOrderPage();

  const modal = Modal.useState();

  return (
    <div>
      {products?.length > 0 && (
        <Box backgroundColor="warning200" paddingBottom="40px">
          {cartModal(modal, cartList, setCartList)}

          <Box
            padding="major-1"
            margin="major-3"
            backgroundColor="white600"
            borderRadius="3"
          >
            <OrderForm
              displayedList={displayedList}
              setDisplayedList={setDisplayedList}
              cartList={cartList}
              setCartList={setCartList}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              items={products}
              categories={categories}
            />
          </Box>
        </Box>
      )}
    </div>
  );
}
