import "./App.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./axios";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import mockProducts from "./data/mockProducts";


function App() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [products, setProducts] = useState(mockProducts);
  useEffect(() => {
    /* fetch('https://api.escuelajs.co/api/v1/products')
      .then(res => res.json())
      .then(data => setProducts(data)) */
  }, []);
  return (
    <div>
      <Header />
      <div className="flex flex-wrap">
        {products.map((product, i) => <ProductCard key={i} product={product}/>)}
      </div>
      

    </div>
  );
}

export default App;
