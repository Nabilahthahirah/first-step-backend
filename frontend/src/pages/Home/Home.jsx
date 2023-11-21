// eslint-disable-next-line no-unused-vars
import React from 'react'
import Categories from '../../components/categories/Categories'
import Navbar from '../../components/navbar/Navbar'
import Slider from '../../components/slider/Slider'

const Home = () => {
  return (
    <>
      <Navbar />
      <Slider />
      <Categories />
    </>
  )
}

export default Home