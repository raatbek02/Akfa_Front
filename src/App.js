import "./App.css";
import { Routes, Route} from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import About from "./pages/About/About";
import Delivery from "./pages/Delivery/Delivery";
import Contacts from "./pages/Contacts/Contacts";
import News from "./pages/News/News";
import CategoriesPage from "./pages/CategoriesPage/CategoriesPage";
import ProductPage from "./pages/ProductPage/ProductPage";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="about" element={<About />} />
        <Route path="delivery" element={<Delivery />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="news" element={<News />} />
        <Route path="categoriesPage/:id" element={<CategoriesPage />} />
        <Route path="productPage/:id" element={<ProductPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
