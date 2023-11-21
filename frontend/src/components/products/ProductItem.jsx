// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loading from '../loading/Loading'
import staticImage from '/third.jpg' 

const ProductItem = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://polls.apiblueprint.org/api/products');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      {data && (
        <ul>
          {data.map(item => (
            <li key={item.name}>
              <img src={item.image} alt={staticImage} style={{ maxWidth: '100px' }} />
              <p>{item.category_name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductItem;
