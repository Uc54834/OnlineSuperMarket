import Navbar from "./components/Navbar";
import Products from "./components/ProductList";
import Cart from "./components/Cart";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

         <Route path="/" element={<HomePage />} />
         <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
        

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;