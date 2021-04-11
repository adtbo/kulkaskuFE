import React, { useState } from "react";
import { Grid, Tabs, Tab } from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

import OrderChart from "./orderChart/orderChart";
import OrderForm from "./orderForm/orderForm";
import styles from "./orderStyles";

const items = require("../fixtures/items.json");
const categories = require("../fixtures/category.json");

const _setTab = (setState, setIsNew) => (event, value) => {
  if (value === 1) {
    setIsNew(false);
  }
  setState(value);
};

function ChartLabel(opts) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      {opts.isNew && <FiberManualRecordIcon color="secondary" />}
      <text>Keranjang</text>
    </div>
  );
}

function RenderTab(props) {
  return (
    <div>
      <Tabs
        value={props.value}
        onChange={_setTab(props.setValue, props.setnewOrder)}
        variant="fullWidth"
      >
        <Tab label="Pesan" />
        <Tab label={<ChartLabel isNew={props.newOrder} />} />
      </Tabs>
    </div>
  );
}

export default function OrderTab() {
  const defaultCategory = categories[0];
  const defaultList = items.filter(
    (item) => item.CATEGORY_ID === defaultCategory.ID
  );

  const [displayedList, setDisplayedList] = useState(defaultList);
  const [cartList, setCartList] = useState([]);
  const [displayedTab, setDisplayedTab] = useState(0);
  const [newOrder, setnewOrder] = useState(false);

  return (
    <div>
      <Grid>
        <RenderTab
          value={displayedTab}
          setValue={setDisplayedTab}
          newOrder={newOrder}
          setnewOrder={setnewOrder}
        />
      </Grid>
      <Grid>
        <div style={styles.contentContainer}>
          {displayedTab === 0 && (
            <OrderForm
              displayedList={displayedList}
              setDisplayedList={setDisplayedList}
              cartList={cartList}
              setCartList={setCartList}
              items={items}
              categories={categories}
              setIsNew={setnewOrder}
            />
          )}
          {displayedTab === 1 && (
            <OrderChart setCartList={setCartList} cartList={cartList} />
          )}
        </div>
      </Grid>
    </div>
  );
}
