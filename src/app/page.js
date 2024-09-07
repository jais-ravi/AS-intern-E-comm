import React from 'react'
import Footer from '@/components/Footer/Footer'
import CatNav from '@/components/Header/CatNav'
import Navbar from '@/components/Header/Navbar'


const page = () => {
  return (
    <div className='w-full h-[100vh] bg-zinc-100'>
    <Navbar/>
    <CatNav/>
    </div>
  )
}

export default page
