// routes.js
import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from '../containers/Home';
import Products from "../containers/Products";

const RoutesConfig = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/products" element={<Products />} />
    </Routes>
  </Router>
);

export default RoutesConfig;
