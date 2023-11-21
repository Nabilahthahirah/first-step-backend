// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loading from '../loading/Loading'
import staticImage from '/third.jpg' 

const CategoryItem = () => {
  const [category, setCategory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://private-7380c-firststep2.apiary-mock.com/api/category')
        const result = await response.data

        console.log(result?.data)

        setCategory(result)

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
      {category?.data ? (
      category.data?.map(item => (
        <div key={item.id}>
          <p>Name: {item.category_name}</p>
          <img src={item.image} alt={staticImage} style={{ maxWidth: '100px' }} />
        </div>
      ))
      ) : (
        <p>No data available</p>
      )
      }
    </div>
  )
}

export default CategoryItem
