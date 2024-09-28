import { Header } from "./components/common/Header";
import { Home } from "./pages/Home";
import { Footer } from "./components/common/Footer";

import "./App.css";
import { MiniCart } from "./components/common/MiniCart";

export const App = () => {
  return (
    <>
      <Header />
      <MiniCart />
      <Home />
      <Footer />
    </>
  );
};

export default App;
