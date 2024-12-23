import { createBrowserRouter } from 'react-router-dom';
import {Login, NotFound, Welcome, Register, Products, About, Contact, CreateProduct, EditProduct, Cart, ProductDetail, SearchResult, Search} from '../pages';
import App from '../App';

export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <Welcome />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/create/product",
          element: <CreateProduct />,
        },
        {
          path: "/edit/product/:id",
          element: <EditProduct />,
        },
        {
          path: "/products/:id",
          element: <ProductDetail />,
        },
        {
          path: "/search",
          element: <Search />,
        },
        {
          path: "/search/:searchTerm",
          element: <SearchResult />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    }
  ]);