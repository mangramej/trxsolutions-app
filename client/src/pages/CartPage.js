import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout.js";
import { useCart } from "../context/cart.js";
import { useAuth } from "../context/auth.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();

  // Increase quantity
  const increaseQuantity = (pid) => {
    const updatedCart = cart.map((item) => {
      if (item._id === pid) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Decrease quantity
  const decreaseQuantity = (pid) => {
    const updatedCart = cart.map((item) => {
      if (item._id === pid) {
        const newQuantity = item.quantity ? item.quantity - 1 : 1; // Set quantity to 1 if it doesn't exist or becomes less than 1
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Remove item
  const removeCartItem = (pid) => {
    const updatedCart = cart.filter((item) => item._id !== pid);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item.price * item.quantity;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "PHP",
      });
    } catch (error) {
      console.log(error);
      return 0; // Return a default value in case of an error
    }
  };

  // Get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const integrateDuplicates = () => {
    const integratedCart = cart.reduce((acc, item) => {
      const existingItem = acc.find((i) => i._id === item._id);
      if (existingItem) {
        existingItem.quantity += item.quantity || 1;
      } else {
        acc.push({ ...item, quantity: item.quantity || 1 });
      }
      return acc;
    }, []);
    return integratedCart;
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      const integratedCart = integrateDuplicates();
      const formattedCart = integratedCart.map((item) => ({
        _id: item._id,
        quantity: item.quantity,
        name: item.name,
        price: item.price,
      }));

      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/payment`,
        {
          cart: formattedCart,
          total: parseFloat(totalPrice().replace(/[^0-9.-]+/g, "")),
        }
      );

      setLoading(false);
      localStorage.removeItem("cart");
      setCart(integratedCart); // Update the cart state with the integrated cart
      setCart([])
      navigate("/dashboard/user/orders");
      toast.success("Checkout Completed Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    setCart(integrateDuplicates());
  }, []);

  return (
    <Layout>
      <div className="container mt-4">
        {cart.length === 0 ? <h1>Empty Cart</h1> : <h1>Cart</h1>}

        {cart.length === 0 ? (
          <p>wow it's so empty here</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Image</th>
                <th scope="col">Product</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Product Total</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item._id}>
                  <td><img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${item._id}`}
                      className="card-img-top"
                      alt={item.name}
                      style={{height: "100px"}}
                    /></td>
                  <td>{item.name}</td>
                  <td>₱{item.price}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => decreaseQuantity(item._id)}
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => increaseQuantity(item._id)}
                    >
                      +
                    </button>
                  </td>
                  <td>₱{(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => removeCartItem(item._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="d-flex justify-content-end">
          <p className="fw-bold">Net Total: {totalPrice()}</p>
        </div>
        <div className="d-flex justify-content-end">
          {auth?.token ? (
            <button
              className="btn btn-primary"
              onClick={handlePayment}
              disabled={cart.length === 0 || loading}
            >
              {loading ? "Processing..." : "Checkout"}
            </button>
          ) : (
            <p>Please <button className="btn btn-sm btn-outline-success" onClick={() => navigate(`/login`)}>Login</button> to proceed with the checkout.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
