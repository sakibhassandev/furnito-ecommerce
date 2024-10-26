"use client";

import { store } from "../index";
import HomeProducts from "@/app/ui/home/HomeProducts";
import { Provider as ReduxProvider } from "react-redux";

const Provider = () => {
  return (
    <ReduxProvider store={store}>
      <HomeProducts />
    </ReduxProvider>
  );
};

export default Provider;
