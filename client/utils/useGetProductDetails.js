import { ip } from '../getIp'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function useGetProductDetails(id) {
  const [data, setData] = useState([])

  const getProduct = async () => {
    try {
      const product = await axios.get(
        `http://${ip}:5000/material-delivery/${id}`
      )
      setData(product.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setData([])
    getProduct()
  }, [id])

  return { data }
}
