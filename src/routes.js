import About from "./pages/About/About";
import Cart from "./pages/Cart/Cart";
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
  LOGO_DETAIL__ROUTE,
  NEWS_DETAIL__ROUTE,
  NEWS_ROUTE,
  //   PDF_PAGE,
  PRIVATE__ROUTE,
  PRODUCT_PAGE_ROUTE,
  SEARCH__ROUTE,
  SUBCATEGORIES_PAGE_ROUTE,
  UNDERSUBCAT_PAGE_ROUTE,
} from "./utils/consts";
import BannerDetail from "./pages/NewsDetail/BannerDetail";
import LogoDetail from "./pages/LogoDetail/LogoDetail";
import UnderSubcat from "./pages/UnderSubcat/UnderSubcat";
import SubcategoriesPage from "./pages/SubcategoriesPage/SubcategoriesPage";
import CategoriesPage from "./pages/CategoriesPage/CategoriesPage";
// import PdfPage from "./pages/PdfPage/PdfPage";

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
    path: SUBCATEGORIES_PAGE_ROUTE + "/:id",
    Component: <SubcategoriesPage />,
  },
  {
    path: UNDERSUBCAT_PAGE_ROUTE + "/:id",
    Component: <UnderSubcat />,
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
  {
    path: LOGO_DETAIL__ROUTE + "/:id",
    Component: <LogoDetail />,
  },

  //   {
  //     path: PDF_PAGE,
  //     Component: <PdfPage />,
  //   },
];
