import { ip } from '../getIp'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function useGetProducts() {
  const [data, setData] = useState([])

  const getData = async () => {
    try {
      const products = await axios.get(`http://${ip}:5000/material-delivery/`)
      setData(products.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return { data }
}
