import "./App.css";
// import { CartProvider } from "react-use-cart";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import AppRouter from "./components/AppRouter";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "./http/userApi";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      getUserData(dispatch);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return <p>Загрузкa...</p>;
  }

  return (
    <div className="App">
      <Header />
      <AppRouter />
      <Footer />
    </div>
  );
}

export default App;
