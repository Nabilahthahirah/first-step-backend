// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loading from '../loading/Loading'
import staticImage from '/third.jpg' 

const ProductItem = () => {
  const [product, setProduct] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://private-7380c-firststep2.apiary-mock.com/api/product')
        const result = await response.data

        console.log(result?.data)

        setProduct(result)

      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <div>
      {product?.data ? (
      product.data?.map(item => (
        <div key={item.id}>
          <p>Name: {item.name}</p>
          <img src={item.photo} alt={staticImage} style={{ maxWidth: '100px' }} />
        </div>
      ))
      ) : (
        <p>No data available</p>
      )
      }
    </div>
  )
}

export default ProductItem
