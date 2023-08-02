import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";

const Search = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  // Filter turned-off products from search results
  const filteredResults = values?.results.filter((p) => p.status);

  return (
    <Layout title={"Search"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {filteredResults.length === 0
              ? "No Products Found"
              : `Found ${filteredResults.length}`}
          </h6>
        </div>
        <div className="d-flex flex-wrap mt-4">
          {filteredResults.length === 0 ? (
            <p className=""></p>
          ) : (
            filteredResults.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top shop-product-image"
                  alt={p.name}
                  onClick={() => navigate(`/product/${p.slug}`)}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text">&#x20B1; {p.price}</p>
                  
                  <button className="btn btn-secondary ms-1 atc" 
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, p])
                    );
                    toast.success("Item added to cart");
                  }}>
                    Add to cart
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
