import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";
import "../styles/HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(1);

  // get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  // get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products.filter((product) => product.featured)); // filter products with status set to true
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
    //eslint-disable-next-line
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filtered products
  const filterProduct = async () => {
    try {
      const {
        data,
      } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filters`,
        { checked, radio }
      );
      setProducts(data?.products.filter((product) => product.featured));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"TRX Solutions"}>
      <div className="bg">
        <div className="center">
          <div className="columns-wrapper">
            <div className="column">
              <div>
                <h1 className="title">TRX Solutions Corporation</h1>
                <p className="desc">
                  TRX Solutions Co. is an I.T. company that is located in the
                  heart of Quezon City. We aim to be the leading provider of
                  business in all forms of Industry catering IT products and
                  services to provide clients with best solutions for their
                  companies’ total. Partnering with the best technologies but
                  not limited to Hewlett lPackard, Apple, Dell, Lenovo, Acer,
                  Microsoft, Adobe, APC, Vertiv, 3M, Belden, Panduit, Fluke
                  Networks, D-Link, Samsung, Asus, Toshiba, Fujitsu, Intel,
                  Synology, Western Digital, Seagate, Kaspersky & the likes.
                </p>
                <div className="ButtonsWrapper">
                  <NavLink to="/shop" className="nav-link">
                    <button className="homePageButton">Shop Now</button>
                  </NavLink>
                </div>
              </div>
              <div className="column">
                <img src="/images/logo.png" alt="" className="trxLogo" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div>
          <h2 className="title center">FEATURED PRODUCTS</h2>
        </div>
        <section className="produkto" id="produ">
          <div className="box-con">
            {products?.length > 0 ? (
              products?.map((p) => (
                <div  style={{ width: "18rem" }}>
                  <div className="boks">
                    <div className="imahe">
                      <img
                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                        className="card-img-top shop-product-image"
                        alt={p.name}
                        onClick={() => navigate(`/product/${p.slug}`)}
                      />
                    </div>
                    <div className="cont">
                      <h3>{p.name}</h3>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Coming Soon!</p>
            )}
          </div>
        </section>
      </div>
      <br />
      <div>
        <h2 className="title center">SOLUTIONS BOARD</h2>
      </div>

      <section className="grid-section">
        <div className="grid">
          <div className="grid-img">
            <img src="../../images/Cabling.png" />
          </div>
          <div className="overlay">
            <h2>Structured Cabling</h2>
            <a href="#" className="img-btn">
              View More
            </a>
          </div>
        </div>
        <div className="grid">
          <div className="grid-img">
            <img src="../../images/network installation.png" />
          </div>
          <div className="overlay">
            <h2>Network Installation</h2>
            <a href="#" className="img-btn">
              View More
            </a>
          </div>
        </div>
        <div className="grid">
          <div className="grid-img">
            <img src="../../images/hardware repair.jpg" />
          </div>
          <div className="overlay">
            <h2>Hardware Repair</h2>
            <a href="#" className="img-btn">
              View More
            </a>
          </div>
        </div>
        <div className="grid">
          <div className="grid-img">
            <img src="../../images/rack.jpg" />
          </div>
          <div className="overlay">
            <h2>Network Rehabilitation</h2>
            <a href="#" className="img-btn">
              View More
            </a>
          </div>
        </div>
        <div className="grid">
          <div className="grid-img">
            <img src="../../images/slide1.jpg" />
          </div>
          <div className="overlay">
            <h2>Projects</h2>
            <a href="#" className="img-btn">
              View More
            </a>
          </div>
        </div>
      </section>

      <hr />

      <div>
        <div>
          <h2 className="title center">SERVICES DASHBOARD</h2>
        </div>
        <section className="grid-section1">
          <div className="grid1">
            <div className="grid-img1">
              <img src="../../images/Cabling.png" />
            </div>
            <div className="overlay1">
              <h2>CCTV Surveillance</h2>
              <a href="#" className="img-btn">
                View More
              </a>
            </div>
          </div>
          <div className="grid1">
            <div className="grid-img1">
              <img src="../../images/Cabling.png" />
            </div>
            <div className="overlay1">
              <h2>Wireless Network</h2>
              <a href="#" className="img-btn">
                View More
              </a>
            </div>
          </div>
          <div className="grid1">
            <div className="grid-img1">
              <img src="../../images/Cabling.png" />
            </div>
            <div className="overlay1">
              <h2>Network Infrastructure</h2>
              <a href="#" className="img-btn">
                View More
              </a>
            </div>
          </div>
          <div className="grid1">
            <div className="grid-img1">
              <img src="../../images/Cabling.png" />
            </div>
            <div className="overlay1">
              <h2>Digital Signage</h2>
              <a href="#" className="img-btn">
                View More
              </a>
            </div>
          </div>
          <div className="grid1">
            <div className="grid-img1">
              <img src="../../images/Cabling.png" />
            </div>
            <div className="overlay1">
              <h2>Network Security</h2>
              <a href="#" className="img-btn">
                View More
              </a>
            </div>
          </div>
          <div className="grid1">
            <div className="grid-img1">
              <img src="../../images/Cabling.png" />
            </div>
            <div className="overlay1">
              <h2>Data Center</h2>
              <a href="#" className="img-btn">
                View More
              </a>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default HomePage;
