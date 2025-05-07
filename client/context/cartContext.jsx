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
  const [boughtProducts, setBoughtProducts] = useState([])

  useEffect(() => {
    const getCartData = async () => {
      try {
        const res = await axios.get(
          `http://${ip}:5000/material-delivery/cart`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        )
        const productsInCart = res.data.map((obj) => {
          return { id: obj._id.toString(), qnt: obj.quantity }
        })
        setBoughtProducts(productsInCart)
      } catch (error) {
        console.log(error)
      }
    }
    getCartData()
  }, [user, cartData])

  const addProductToCart = async (id) => {
    try {
      await axios.post(
        `http://${ip}:5000/material-delivery/cart/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  const isProductInCart = (id) => {}

  const getProductQuantityInCart = (id) => {}

  const incrementQuantity = (id) => {}

  const decrementQuantity = (id) => {}

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        isProductInCart,
        getProductQuantityInCart,
        incrementQuantity,
        decrementQuantity,
        boughtProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
