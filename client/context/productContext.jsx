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

  const getProducts = async (
    sort,
    find,
    page,
    category,
    minPrice,
    maxPrice
  ) => {
    try {
      // Ensure minPrice and maxPrice are numbers and set defaults if invalid
      const min = !isNaN(Number(minPrice)) && minPrice !== '' ? Number(minPrice) : 0;
      const max = !isNaN(Number(maxPrice)) && maxPrice !== '' ? Number(maxPrice) : 100000000;
      const url = `${getApiUrl()}/?s=${sort}&f=${find}&p=${page}&c=${category}&minprice=${min}&maxprice=${max}`
      console.log('Making request to:', url)

      const res = await axios.get(url)
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
        status: error.response?.status,
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
        setProducts,
        getProducts,
        totalPages,
        category,
        setCategory,
        displayCat,
        setDisplayCat,
        find,
        setFind,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}
