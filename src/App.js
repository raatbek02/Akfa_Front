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
import { setSubCategory_id } from "./store/modalCatalog";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userSlice.user);
  const subCategory_id = localStorage.getItem("subCategory_ID");
  //   console.log(" App subCategory_id", typeof Number(subCategory_id));

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
        .then(
          ({ data }) => dispatch(addProducts(data)),
          dispatch(setSubCategory_id(Number(subCategory_id)))
        );
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
        <ToastContainer />
      </CartProvider>
    </div>
  );
}

export default App;
