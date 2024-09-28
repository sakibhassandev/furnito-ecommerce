import { Header } from "./components/common/Header";
import { Home } from "./pages/Home";
import { Footer } from "./components/common/Footer";
import { MiniCart } from "./components/common/MiniCart";
import { useState } from "react";

import "./App.css";

export const App = () => {
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);

  return (
    <>
      <Header setIsMiniCartOpen={setIsMiniCartOpen} />
      <MiniCart
        isMiniCartOpen={isMiniCartOpen}
        setIsMiniCartOpen={setIsMiniCartOpen}
      />
      <Home />
      <Footer />
    </>
  );
};

export default App;
