import { createContext, useContext, useState } from 'react'
import axios from 'axios'
import { ip } from '../getIp'

const ProductContext = createContext()

export function ProductContextProvider({ children }) {
  const [products, setProducts] = useState([])

  const getData = async (page = 1, find = '', sort = '') => {
    try {
      const response = await axios.get(
        `http://${ip}:5000/material-delivery/?s=${sort}&f=${find}&p=${page}`
      )
      setProducts(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ProductContext.Provider value={{ products, getData }}>
      {children}
    </ProductContext.Provider>
  )
}

export function useProductContext() {
  const context = useContext(ProductContext)
  return context
} 