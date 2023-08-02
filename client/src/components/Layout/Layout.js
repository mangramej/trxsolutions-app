import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "100vh" }}>
        <Toaster />
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "TRX Solutions",
  descriptions: "TRX Solutions Ecommerce Online Shop",
  keywords:
    "TRX, Solutions, TRX Solutions, TRX Ecommerce, TRX shop, TRX Online Shop, TRX Ecommerce Online shop",
  author: "Jhon Gerald Villalon",
};

export default Layout;
