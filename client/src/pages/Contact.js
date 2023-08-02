import React from 'react'
import Layout from '../components/Layout/Layout'

const Contact = () => {
  return (
    <Layout title={"Contact us - TRX Solutions"}>
        <div className='row contactus'>
          <div className='col-md-6'>
            <img src="/images/contactus.jpg"
            alt="contactus" style={{width:"100%"}}/>
          </div>
          <div className='col-md-4'>
            <h1 className='bg-success p-2 text-white text-center'>Contact us</h1>
            <p className='text-justify mt-2'>
              If you have any inquiries, feel free to reach us below.
            </p>
            <p className='mt-3'>
               <a href='https://www.facebook.com/profile.php?id=100064249682991'>Facebook</a>
            </p>
          </div>
        </div>
    </Layout>
  )
}

export default Contact