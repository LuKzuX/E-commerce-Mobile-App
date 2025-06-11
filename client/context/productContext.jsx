import { createContext, useContext } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { getApiUrl } from '../config.js'

export const ProductContext = createContext({})

export const useProductContext = () => {
  return useContext(ProductContext)
}

export const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [totalPages, setTotalPages] = useState(0)

  const getProducts = async (sort, find, page, category, minPrice, maxPrice) => {
    try {
      const res = await axios.get(
        `${getApiUrl()}/?s=${sort}&f=${find}&p=${page}&c=${category}&minprice=${minPrice}&maxprice=${maxPrice}`
      )
      setProducts(res.data.products)
      setTotalPages(res.data.totalPages)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ProductContext.Provider value={{ products, getProducts, totalPages }}>
      {children}
    </ProductContext.Provider>
  )
}
