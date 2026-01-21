import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Order from "./pages/Order";
import Reserve from "./pages/Reserve";
import Story from "./pages/Story";
import Navigation from "./components/Navigation";

const App = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/order" element={<Order />} />
        <Route path="/reserve" element={<Reserve />} />
        <Route path="/story" element={<Story />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
