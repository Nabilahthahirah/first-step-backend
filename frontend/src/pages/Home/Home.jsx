// eslint-disable-next-line no-unused-vars
import React from 'react'
import Categories from '../../components/categories/Categories'
import Footer from '../../components/footer/Footer'
import Navbar from '../../components/navbar/Navbar'
import Products from '../../components/products/Products'
import Slider from '../../components/slider/Slider'

const Home = () => {
  return (
    <>
      <Navbar />
      <Slider />
      <Categories />
      <Products />
      <Footer />
    </>
  )
}

export default Home