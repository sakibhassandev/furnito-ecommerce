import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { BackToTop } from "./components/common/BackToTop";
import { Header } from "./components/common/Header";
import { Footer } from "./components/common/Footer";
import { MiniCart } from "./components/product/MiniCart";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

export const App = () => {
  return (
    <>
      <Header />
      <MiniCart />
      <Outlet />
      <Footer />
      <BackToTop />
      <ToastContainer className="text-sm" />
    </>
  );
};

export default App;
