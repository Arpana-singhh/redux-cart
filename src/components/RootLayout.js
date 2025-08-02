import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./NavBarPanel.js";
import { Provider } from "react-redux";
import store from "../store/store";

export default function RootLayout() {
  return (
    <>
      <Provider store={store}>
        <Navbar />

        <main>
          <Outlet />
        </main>
      </Provider>
    </>
  );
}
 