import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./features/store";

import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme";
import { AppRouter } from "./routes/routes";

const store = configureStore();

ReactDOM.render(
  <ReduxProvider store={store}>
    <ChakraProvider theme={theme}>
      <React.StrictMode>
        <AppRouter />
      </React.StrictMode>
    </ChakraProvider>
  </ReduxProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
