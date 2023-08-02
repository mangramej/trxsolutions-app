import React from 'react'
import Layout from '../components/Layout/Layout'
import { Link } from 'react-router-dom'

const Pagenotfound = () => {
  return (
    <Layout title={"PAGE NOT FOUND"}>
        <div className="pnf">
          <h1 className="pnf-title">404</h1>
          <h2 className='pnf-heading'>Oops! Page not found!</h2>
          <Link to='/' className="pnf-btn">
            Go back
          </Link>
        </div>
    </Layout>
  )
}

export default Pagenotfound