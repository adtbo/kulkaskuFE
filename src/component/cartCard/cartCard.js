import React from "react";
import { Columns, Box, Label, Text, Flex } from "bumbag";

export default function CartCard(props) {
  const { name, quantity, price, unit } = props.item;

  return (
    <Box
      backgroundColor="white"
      margin="major-1"
      padding="major-1"
      border="default"
      borderRadius="5"
    >
      <Columns minBreakpoint="mobile">
        <Columns.Column spread={6}>
          <Box marginLeft="major-1" padding="major-1">
            <Label>{name}</Label>
            <Text.Block>
              <Text>{`${quantity} ${unit}`}</Text>
            </Text.Block>
          </Box>
        </Columns.Column>
        <Columns.Column spread={3}>
          <Flex height="100%" alignY="center" alignX="right">
            <Text>subTotal</Text>
          </Flex>
        </Columns.Column>
        <Columns.Column>
          <Flex height="100%" alignY="center">
            <Label>{price * quantity}</Label>
          </Flex>
        </Columns.Column>
      </Columns>
    </Box>
  );
}
