import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import CarModelsList from "./car-models-item.jsx";
import CarDetailPage from "./CarDetailPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CarModelsList />} />
        <Route path="/car/:id" element={<CarDetailPage />} />
      </Routes>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
