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
  const [allQuantity, setAllQuantity] = useState(0)

  useEffect(() => {
    const getCartData = async () => {
      if (!user || !user.token) return
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
  }, [user])
  
  useEffect(() => {
    getAllQuantity()
  }, [boughtProducts])

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

  const deleteProductFromCart = async (id, removeAll) => {
    try {
      await axios.delete(`http://${ip}:5000/material-delivery/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
    } catch (error) {
      console.log(error)
    }
  }

  const isProductInCart = (id) => {
    for (let i = 0; i < boughtProducts.length; i++) {
      if (boughtProducts[i].id == id) {
        return true
      }
    }
    return false
  }

  const getProductQuantityInCart = (id) => {
    for (let i = 0; i < boughtProducts.length; i++) {
      if (boughtProducts[i].id == id) {
        return boughtProducts[i].qnt
      }
    }
  }

  const incrementQuantity = (id) => {
    for (let i = 0; i < boughtProducts.length; i++) {
      if (boughtProducts[i].id === id) {
        const newArr = [...boughtProducts]
        if (boughtProducts[i].qnt == undefined) {
          newArr[i] = { id: id, qnt: 1 }
          addProductToCart(id)
          setBoughtProducts(newArr)
        } else {
          newArr[i] = { id: id, qnt: boughtProducts[i].qnt + 1 }
          addProductToCart(id)
          setBoughtProducts(newArr)
        }
      }
    }
  }

  const decrementQuantity = (id) => {
    for (let i = 0; i < boughtProducts.length; i++) {
      if (boughtProducts[i].id === id) {
        if (boughtProducts[i].qnt > 1) {
          const newArr = [...boughtProducts]
          newArr[i] = { id: id, qnt: boughtProducts[i].qnt - 1 }
          setBoughtProducts(newArr)
          deleteProductFromCart(id)
        } else {
          const newArr = [...boughtProducts]
          const filteredArr = newArr.filter((obj) => obj.id !== id)
          setBoughtProducts(filteredArr)
          deleteProductFromCart(id)
        }
      }
    }
  }

  const getAllQuantity = () => {
    let allQnt = 0
    for (let i = 0; i < boughtProducts.length; i++) {
      allQnt += boughtProducts[i].qnt
    }
    setAllQuantity(allQnt)
  }

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        isProductInCart,
        getProductQuantityInCart,
        incrementQuantity,
        decrementQuantity,
        boughtProducts,
        setBoughtProducts,
        allQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
