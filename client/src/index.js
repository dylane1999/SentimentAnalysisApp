import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import styled from "styled-components";
import axios from "axios";
window.axios = axios;

const Root = styled.div`
  background-color: #6b6b6b;
  height: 100vh;
  width: 100vw;
  margin: 0px;
`;

ReactDOM.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
