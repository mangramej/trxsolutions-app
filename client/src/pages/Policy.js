import React from 'react'
import Layout from '../components/Layout/Layout'

const Policy = () => {
  return (
    <Layout title={"Policy - TRX Solutions"}>
        <div className='row contactus'>
          <div className='col-md-6'>
            <img src="/images/policy.jpg"
            alt="contactus" style={{width:"100%"}}/>
          </div>
          <div className='col-md-4'>
            <h1 className='bg-success p-2 text-white text-center'>Privacy Policy</h1>
            <p className='text-justify mt-2'>
              Below are the privacy policy of the company.
            </p>
            
          </div>
        </div>
    </Layout>
  )
}

export default Policy