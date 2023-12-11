import React from "react";
import Header from "./components/MainPage/Header";
import MainPage from "./components/MainPage/MainPageC";
// import Footer from "./components/MainPage/Footer";
// BrowserRouter
import { BrowserRouter, Routes, Route } from "react-router-dom";
// 성공
import EventMainPage from "./components/EventPage/EventMainPage";
import Product from "./components/ProductDetail/Product";
import Login from "./components/LoginPage/Login";

// 진행중
// import Products from "./components/productList/Products";
import ProductList from "./components/productList/ProductList";

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<MainPage />} />
            <Route path="/event" element={<EventMainPage />} />
            {/* 잊지말자 productList */}
            <Route path="/productList" element={<ProductList />} />
            <Route path="/detail" element={<Product />} />
          </Routes>
        </BrowserRouter>
        {/* <Footer /> */}
      </div>
    </>
  );
}

export default App;
