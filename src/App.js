import "./App.css";
import { CartProvider } from "react-use-cart";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import AppRouter from "./components/AppRouter";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "./http/userApi";
import axios from "axios";
import { addProducts } from "./store/productSlice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      getUserData(dispatch);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      await axios
        .get(`http://127.0.0.1:8000/api/products`)
        .then(({ data }) => dispatch(addProducts(data)));
    };
    getProducts();
  }, []);

  if (loading) {
    return <p>Загрузкa...</p>;
  }

  return (
    <div className="App">
      <CartProvider>
        <Header />
        <AppRouter />
        <Footer />
      </CartProvider>
    </div>
  );
}

export default App;
