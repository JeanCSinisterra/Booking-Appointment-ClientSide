import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "antd/dist/reset.css";
import { Provider } from "react-redux";
import store from "./redux/store.jsx";
import App from "./App";

ReactDOM.createRoot(document.getElementById('root'))
.render(
  <Provider store={store}>
    <App />
  </Provider>
);
  