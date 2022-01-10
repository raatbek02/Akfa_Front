import { useEffect } from "react";
// import axios from "axios";
import { useDispatch } from "react-redux";
import { CartProvider } from "react-use-cart";
import { ToastContainer } from "react-toastify";

import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import AppRouter from "./components/AppRouter";
// import { addProducts } from "./store/productSlice";
import { setSubCategory_id } from "./store/modalCatalog";
import "react-toastify/dist/ReactToastify.css";
// import { setAuthCart } from "./store/carts";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  //   const user = useSelector((state) => state.userSlice.user);
  const subCategory_id = localStorage.getItem("subCategory_ID");

  useEffect(() => {
    dispatch(setSubCategory_id(Number(subCategory_id)));
  }, []);

  //   if (loading) {
  //     return <p>Загрузкa...</p>;
  //   }

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
