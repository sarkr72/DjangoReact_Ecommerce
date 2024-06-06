import { Container } from "react-bootstrap";
import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Routes
import ProductScreen from "./screens/ProductScreen";
import Homescreens from "./screens/Homescreens";
import CartScreen from "./screens/CartScreen";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Header />
      <main className=" py-5">
        {" "}
        <Container>
          {/* Wrap Routes around Route */}
          <Routes>
            <Route path="/" element={<Homescreens />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart/:id" element={<CartScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
