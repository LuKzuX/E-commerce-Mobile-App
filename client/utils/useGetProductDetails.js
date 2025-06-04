import { ip } from '../getIp'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useProductContext } from '@/context/productContext'

export default function useGetProductDetails(id) {
  const [data, setData] = useState([])
  const { products, getData } = useProductContext()

  const fetchProduct = async () => {
    try {
      const product = await axios.get(
        `http://${ip}:5000/material-delivery/${id}`
      )
      setData(product.data)
    } catch (error) {
      console.log(error)
    }
    return { data, setData, refetch: fetchProduct }
  }

  useEffect(() => {
    fetchProduct()
  }, [id])
  useEffect(() => {
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
    getProduct()
  }, [id])
  return { data, setData }
}
