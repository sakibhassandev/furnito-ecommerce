import { Outlet } from "react-router-dom";
import { Header } from "./components/common/Header";
import { Footer } from "./components/common/Footer";
import { MiniCart } from "./components/common/MiniCart";

import "./App.css";

export const App = () => {
  return (
    <>
      <Header />
      <MiniCart />
      <Outlet />
      <Footer />
    </>
  );
};

export default App;
