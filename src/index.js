import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Blog from "./pages/Blog/Blog";
import Register from "./pages/Register/Register";
import UserUpdate from "./pages/User/UserUpdate";
import BlogDetail from "./pages/Blog/BlogDetail";
import AddProduct from "./pages/User/AddProduct";
import MyProduct from "./pages/User/MyProduct";
import UpdateProduct from "./pages/User/UpdateProduct";
import ProductDetail from "./pages/Home/ProductDetail";
import Cart from "./pages/Home/Cart";
import WishList from "./pages/WihsList/WishList";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <App>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/wishlist" element={<WishList />} />

        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blog/detail/:id" element={<BlogDetail />} />
        <Route path="/user/update/:id" element={<UserUpdate />} />
        <Route path="/user/addproduct" element={<AddProduct />} />
        <Route path="/user/product/update/:id" element={<UpdateProduct />} />
        <Route path="/user/myproduct" element={<MyProduct />} />
        <Route path="/product/detail/:id" element={<ProductDetail />} />
      </Routes>
    </App>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
