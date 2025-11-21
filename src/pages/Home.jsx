import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchProducts } from "../api";
import ProductGrid from "../components/ProductGrid";
import FilterBar from "../components/FilterBar";
import "../styles/Home.css";

export default function Home() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
  
    fetchProducts()
      .then(data => {
        let filtered = [...data];
  
           const categories = (searchParams.get("category") || "")
          .split(",")
          .filter(Boolean);
  
        if (categories.length > 0) {
          filtered = filtered.filter(p => categories.includes(p.category));
        }
  
       
        const sort = searchParams.get("sort");
        if (sort === "price_asc") {
          filtered.sort((a, b) => a.price - b.price);
        }
        if (sort === "price_desc") {
          filtered.sort((a, b) => b.price - a.price);
        }
  
        setProducts(filtered);
      })
      .catch(() => setError("Failed to load products"))
      .finally(() => setLoading(false));
  }, [searchParams]);
  

  return (
    <div className="container-fluid py-4">
  <div className="row gx-4">

  
    <div className="col-lg-2 col-md-3">
      <FilterBar />
    </div>


    <main className="col-lg-10 col-md-9">
      <h1 className="mb-4 fw-bold">Our Products</h1>

      {loading && <div className="alert alert-info">Loading...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <ProductGrid products={products} />
    </main>

  </div>
</div>

  );
}
