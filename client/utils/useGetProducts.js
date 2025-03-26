import { ip } from '../getIp'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function useGetProducts() {
  const [data, setData] = useState([])

  const getData = async (page = 1, find = '', sort) => {
    try {
      const products = await axios.get(
        `http://${ip}:5000/material-delivery/?s=${sort}&f=${find}&p=${page}`
      )
      setData(products.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
  }, [data])

  return { data, getData }
}
