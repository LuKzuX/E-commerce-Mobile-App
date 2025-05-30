import { createContext, useContext, useState } from 'react'
import axios from 'axios'
import { ip } from '../getIp'

const ProductContext = createContext()

export function ProductContextProvider({ children }) {
  const [products, setProducts] = useState([])
  const [cat, setCat] = useState('')
  const [displayCat, setDisplayCat] = useState('')
  const [find, setFind] = useState('')
  const [error, setError] = useState('')

  const getData = async (
    page = 1,
    find = '',
    sort = '',
    category = '',
    minPrice = '',
    maxPrice = ''
  ) => {
    try {
      const response = await axios.get(
        `http://${ip}:5000/material-delivery/?s=${sort}&f=${find}&p=${page}&c=${category}&minprice=${minPrice}&maxprice=${maxPrice}`
      )
      setCat(category)
      return response.data
    } catch (error) {
      setError(error)
    }
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        getData,
        find,
        setFind,
        category: cat,
        displayCat,
        setDisplayCat,
        error,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export function useProductContext() {
  const context = useContext(ProductContext)
  return context
}
