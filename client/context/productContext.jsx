import { createContext, useContext } from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { getApiUrl } from '../config.js'

export const ProductContext = createContext({})

export const useProductContext = () => {
  return useContext(ProductContext)
}

export const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [category, setCategory] = useState('')
  const [displayCat, setDisplayCat] = useState('')
  const [find, setFind] = useState('')

  const getProducts = async (sort, find, page, category, minPrice, maxPrice) => {
    try {
      const url = `${getApiUrl()}/?s=${sort}&f=${find}&p=${page}&c=${category}&minprice=${minPrice}&maxprice=${maxPrice}`
      console.log('Making request to:', url)
      
      const res = await axios.get(url)
      console.log('Raw API Response:', res)
      console.log('Response Data:', res.data)
      console.log('Response Data Type:', typeof res.data)
      console.log('Is Array?', Array.isArray(res.data))
      
      if (Array.isArray(res.data)) {
        setProducts(res.data)
        setTotalPages(Math.ceil(res.data.length / 8))
        return res.data
      } else {
        console.error('Unexpected response format:', res.data)
        setProducts([])
        setTotalPages(0)
        return []
      }
    } catch (error) {
      console.error('Error fetching products:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      })
      setProducts([])
      setTotalPages(0)
      return []
    }
  }

  useEffect(() => {
    console.log('Initial products fetch')
    getProducts('', '', 1, '', '', '')
  }, [])

  return (
    <ProductContext.Provider 
      value={{ 
        products, 
        getProducts, 
        totalPages,
        category,
        setCategory,
        displayCat,
        setDisplayCat,
        find,
        setFind
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}
