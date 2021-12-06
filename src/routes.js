import About from "./pages/About/About";
import Cart from "./pages/Cart/Cart";
import CategoriesPage from "./pages/CategoriesPage/CategoriesPage";
import Contacts from "./pages/Contacts/Contacts";
import Delivery from "./pages/Delivery/Delivery";
import Home from "./pages/Home";
import News from "./pages/News/News";
import ProductPage from "./pages/ProductPage/ProductPage";
import {
  ABOUT_ROUTE,
  CART_ROUTE,
  CATEGORIES_PAGE_ROUTE,
  CONTACTS_ROUTE,
  DELIVERY_ROUTE,
  HOME_ROUTE,
  NEWS_ROUTE,
  PRODUCT_PAGE_ROUTE,
} from "./utils/consts";

export const authRoutes = [
  {
    path: CART_ROUTE,
    Component: <Cart />,
  },
];

export const publicRoutes = [
  {
    path: HOME_ROUTE,
    Component: <Home />,
  },
  {
    path: ABOUT_ROUTE,
    Component: <About />,
  },
  {
    path: NEWS_ROUTE,
    Component: <News />,
  },
  {
    path: DELIVERY_ROUTE,
    Component: <Delivery />,
  },
  {
    path: CONTACTS_ROUTE,
    Component: <Contacts />,
  },
  {
    path: CATEGORIES_PAGE_ROUTE + "/:id",
    Component: <CategoriesPage />,
  },
  {
    path: PRODUCT_PAGE_ROUTE + "/:id",
    Component: <ProductPage />,
  },
];
