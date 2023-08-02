import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const calculateTotal = (products) => {
    let total = 0;
    products.forEach((p) => {
      total += p.price;
    });
    return total;
  };

  const generateReceipt = (order) => {
    const { buyer, products, createAt } = order;
    const receiptContent = `
      Customer Name: ${buyer.name}
      GCash: 09XXXXXXXXX
      Seller: TRX Solutions
      Date Downloaded: ${moment(createAt).format("MMMM Do YYYY, h:mm:ss a")}
      Total Amount to Pay: ₱${calculateTotal(products)}
    `;

    // Create a blob with the receipt content
    const blob = new Blob([receiptContent], { type: "text/plain" });

    // Create a URL for the blob
    const url = URL.createObjectURL(blob);

    // Create a link element to download the receipt
    const link = document.createElement("a");
    link.href = url;
    link.download = "receipt.txt";
    link.click();

    // Clean up the URL object
    URL.revokeObjectURL(url);
  };

  const formatDate = (date) => {
    return moment(date).format("MMMM Do YYYY, h:mm:ss a");
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

  return (
    <Layout title={"My Orders"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Transactions</h1>
            {orders?.map((o, i) => {
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
                        <th scope="col">Order Quantity</th>
                        <th scope="col">Total to Pay</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{formatDate(o?.createdAt)}</td>
                        <td>{o?.payment.success ? "Success" : "Pending"}</td>
                        <td>{calculateTotalQuantity(o)}</td>
                        <td>₱{o?.total}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    <p>
                      Note: <b>Payment First Before Delivery!</b>
                    </p>
                    <p>Buyer: {o?.buyer?.name}</p>
                    <p>Seller: TRX Solutions</p>
                    <p>Ordered Date: {formatDate(o?.createdAt)}</p>
                    <p>
                      Total to Pay: <b>₱{o?.total}</b>
                    </p>
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
                  <div className="text-center mt-3 pb-3">
                    <button
                      className="btn btn-primary"
                      onClick={() => generateReceipt(o)}
                    >
                      Download Receipt
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
