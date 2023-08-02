import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Select, Input } from "antd";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";

const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Unprocessed",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/all-orders`
      );
      setOrders(data);
      setFilteredOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  useEffect(() => {
    filterOrders();
  }, [searchInput]);

  const handleChange = async (orderId, value) => {
    try {
      const {
        data,
      } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`,
        { status: value }
      );
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const filterOrders = () => {
    const filtered = orders.filter((order) => {
      const { buyer, status, createAt } = order;
      const formattedDate = moment(createAt).format("MMMM Do YYYY");
      return (
        buyer?.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        status.toLowerCase().includes(searchInput.toLowerCase()) ||
        formattedDate.toLowerCase().includes(searchInput.toLowerCase())
      );
    });
    setFilteredOrders(filtered);
  };

  const calculateTotalQuantity = (order) => {
    let totalQuantity = 0;
    order?.products?.forEach((product) => {
      if (product.quantity) {
        totalQuantity += product.quantity;
      }
    });
    return totalQuantity;
  };

  const formatDate = (date) => {
    return moment(date).format("MMMM Do YYYY, h:mm:ss a");
  };

  return (
    <Layout title={"All Orders Data"}>
      <div className="row">
        <div className="col-md-3">
          <hr />
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <hr />
          <h1 className="text-center">All Transactions</h1>
          <div className="search-bar">
            <Input
              placeholder="Search by buyer or status"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          {filteredOrders?.map((o, i) => {
            return (
              <div className="border" key={o._id}>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col">Date</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Total to Pay</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>
                        <Select
                          bordered={false}
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o?.status}
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      <td>{o?.buyer?.name}</td>
                      <td>{formatDate(o?.createdAt)}</td>
                      <td>
                        {o?.payment.success ? "Success" : "Cash on Delivery"}
                      </td>
                      <td>{calculateTotalQuantity(o)}</td>
                      <td>₱{o?.total}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="container">
                  <p>
                    <b>Orders</b>
                  </p>
                  {o?.products?.map((p) => (
                    <div className="row mb-2 p-3 card flex-row" key={p.id}>
                      <div className="col-md-4">
                        <img
                          src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p.product}`}
                          className="card-img-top"
                          alt={p.name}
                          width="100px"
                        />
                      </div>
                      <div className="col-md-8">
                        <h6>{p.name}</h6>
                        <h6>₱{p.price}</h6>
                        <h6>Quantity: {p.quantity}</h6>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
