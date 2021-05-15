import React from "react";
import { Input, Flex, Columns, Box, Icon, Button, Label, Text } from "bumbag";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function ProductCard(props) {
  const { item, onPressAdd, register } = props;

  return (
    <Box
      backgroundColor="white"
      margin="major-1"
      padding="major-1"
      border="default"
      borderRadius="5"
    >
      <Columns minBreakpoint="mobile">
        <Columns.Column spread={4}>
          <Flex height="100%" alignY="center">
            <Box margin="major-1" padding="major-1">
              <Label>{item.Name}</Label>
              {item.DESCRIPTION && (
                <Text.Block>
                  <Text use="i">{item.DESCRIPTION}</Text>
                </Text.Block>
              )}
            </Box>
          </Flex>
        </Columns.Column>
        <Columns.Column>
          <Box alignX="right">
            <Flex height="100%">
              <Label
                margin="major-1"
                padding="major-1"
              >{`${item.price}/${item.unit}`}</Label>
            </Flex>
            <Flex height="100%" alignY="center">
              <Input
                id={`displayed-unit-input-${item.productId}`}
                name={`displayed-unit-input-${item.productId}`}
                type="number"
                placeholder="0.00"
                inputRef={register}
              />
              <Text marginLeft="major-1">{item.unit}</Text>
            </Flex>
          </Box>
        </Columns.Column>
        <Columns.Column spread={2}>
          <Flex height="100%" alignY="center" alignX="right">
            <Button onClick={onPressAdd}>
              <Icon icon={faPlus} type="font-awesome" />
            </Button>
          </Flex>
        </Columns.Column>
      </Columns>
    </Box>
  );
}
