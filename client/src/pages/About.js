import React from "react";
import Layout from "../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About us - TRX Solutions"}>
      <hr />
      <div className="row sectioner v">
        <div className="col-md-6">
          <p className="desc">
            To ensure quality workmanship without compromising its price.
            Increase assets & investments by creating a long-term customer
            satisfaction through innovation and advanced technology at the same
            time gaining customers & employees respect, honesty & integrity.
          </p>
        </div>
        <div className="col-md-4">
          <h1 className="vision">VISION</h1>
        </div>
      </div>

      <div className="row mission">
        <div className="col-md-6">
          <h1 className="vision">MISSION</h1>
        </div>
        <div className="col-md-4">
          <p className="desc">
            We will strive to deliver good quality products & exceptional
            services with well-known brands in the most competitive price
            moreover building good reputation & become a key player. We live on
            "What client want is what we eagerly give"
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
