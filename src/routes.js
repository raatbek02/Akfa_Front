import About from "./pages/About/About";
import Cart from "./pages/Cart/Cart";
import CategoriesPage from "./pages/CategoriesPage/CategoriesPage";
import Checkout from "./pages/Checkout/Checkout";
import Compare from "./pages/Compare/Compare";
import Contacts from "./pages/Contacts/Contacts";
import Delivery from "./pages/Delivery/Delivery";
import Home from "./pages/Home";
import News from "./pages/News/News";
import NewsDetail from "./pages/NewsDetail/NewsDetail";
import CategoryBannerDetail from "./pages/NewsDetail/CategoryBannerDetail";
import ProductPage from "./pages/ProductPage/ProductPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import {
  ABOUT_ROUTE,
  BANNER_DETAIL__ROUTE,
  CART_ROUTE,
  CATEGORIES_PAGE_ROUTE,
  CATEGORY_BANNER_DETAIL__ROUTE,
  CHECKOUT__ROUTE,
  COMPARE__ROUTE,
  CONTACTS_ROUTE,
  DELIVERY_ROUTE,
  HOME_ROUTE,
  NEWS_DETAIL__ROUTE,
  NEWS_ROUTE,
  PRIVATE__ROUTE,
  PRODUCT_PAGE_ROUTE,
  SEARCH__ROUTE,
} from "./utils/consts";
import BannerDetail from "./pages/NewsDetail/BannerDetail";

export const authRoutes = [
  {
    path: PRIVATE__ROUTE,
    //  Component: <Cart />,
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
  {
    path: CART_ROUTE,
    Component: <Cart />,
  },
  {
    path: CHECKOUT__ROUTE,
    Component: <Checkout />,
  },
  {
    path: COMPARE__ROUTE,
    Component: <Compare />,
  },
  {
    path: SEARCH__ROUTE,
    Component: <SearchPage />,
  },
  {
    path: NEWS_DETAIL__ROUTE + "/:id",
    Component: <NewsDetail />,
  },
  {
    path: CATEGORY_BANNER_DETAIL__ROUTE + "/:id",
    Component: <CategoryBannerDetail />,
  },
  {
    path: BANNER_DETAIL__ROUTE + "/:id",
    Component: <BannerDetail />,
  },
];
