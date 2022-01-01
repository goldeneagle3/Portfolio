import React from "react";
import {  withRouter } from "react-router-dom";
import Header from "./components/Header";

const Menu = withRouter(({ history }) => (
  <Header/>
));

export default Menu;
