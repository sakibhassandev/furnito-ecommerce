import { Header } from "./components/common/Header";
import { Home } from "./pages/Home";
import { Footer } from "./components/common/Footer";

import "./App.css";

export const App = () => {
  return (
    <>
      <Header />
      <Home />
      <Footer />
    </>
  );
};

export default App;
