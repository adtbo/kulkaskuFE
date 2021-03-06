import React from "react";
import { Provider as BumbagProvider } from "bumbag";
import ReactDOM from "react-dom";
import "./index.css";
import OrderTab from "./orderPage/orderTab";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <BumbagProvider>
      <OrderTab />
    </BumbagProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
