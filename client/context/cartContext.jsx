import { createContext, useContext } from 'react'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { ip } from '../getIp.js'
import { useNavigation } from '@react-navigation/native'
import { useAuthContext } from '../context/authContext.jsx'

export const CartContext = createContext({})

export const useCartContext = () => {
  return useContext(CartContext)
}

export const CartContextProvider = ({ children }) => {
  const { user } = useAuthContext()
  const [cartData, setCartData] = useState([])
  const [boughtProducts, setBoughtProducts] = useState([])

  useEffect(() => {
    //get products and set inital staTE FOR Boughtproductys
  }, [user, cartData])

  const addProductToCart = (id) => {

  }

  const isProductInCart = (id) => {

  }

  const incrementQuantity = (id) => {

  }

  const decrementQuantity = (id) => {

  }

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        isProductInCart,
        incrementQuantity,
        decrementQuantity,
        boughtProducts
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
