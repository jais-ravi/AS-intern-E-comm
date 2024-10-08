import React from 'react'
import Footer from '@/components/Footer/Footer'
import CatNav from '@/components/Header/CatNav'
import Navbar from '@/components/Header/Navbar'


const page = () => {
  return (
    <div className=' min-h-screen w-full bg-slate-400'>
    <Navbar/>
    {/* <CatNav/> */}
    <Footer/>
    </div>
  )
}

export default page
