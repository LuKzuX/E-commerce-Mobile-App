import { createContext, useContext } from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { getApiUrl } from '../config.js'
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
  const [error, setError] = useState('')

  const getCartProducts = async () => {
    try {
      const res = await axios.get(`${getApiUrl()}/cart`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      const productsInCart = res.data.map((obj) => {
        return {
          id: obj._id.toString(),
          name: obj.productName,
          qnt: obj.quantity,
          price: obj.productPrice,
          totalPrice: obj.totalPrice,
          image: obj.productImage,
        }
      })
      setBoughtProducts(productsInCart)
    } catch (error) {
      setError(error.response.data)
    }
  }

  useEffect(() => {
    getCartProducts()
  }, [user])

  useEffect(() => {
    getAllQuantity()
  }, [boughtProducts])

  const addProductToCart = async (id) => {
    try {
      await axios.post(
        `${getApiUrl()}/cart/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      getCartProducts()
    } catch (error) {
      setError(error)
    }
  }

  const deleteProductFromCart = async (id, removeAll) => {
    try {
      await axios.delete(`${getApiUrl()}/cart/${id}?removeAll=${removeAll}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      getCartProducts()
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
          newArr[i] = { ...newArr[i], id: id, qnt: 1 }
          addProductToCart(id)
          setBoughtProducts(newArr)
          return
        } else {
          const currentQnt = newArr[i].qnt || 0
          const newQnt = currentQnt + 1
          newArr[i] = {
            ...newArr[i],
            id: id,
            qnt: boughtProducts[i].qnt + 1,
            totalPrice: newQnt * newArr[i].price,
          }
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
          const currentQnt = newArr[i].qnt || 0
          const newQnt = currentQnt - 1
          newArr[i] = {
            ...newArr[i],
            id: id,
            qnt: boughtProducts[i].qnt - 1,
            totalPrice: newQnt * newArr[i].price,
          }
          setBoughtProducts(newArr)
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
        deleteProductFromCart,
        incrementQuantity,
        decrementQuantity,
        boughtProducts,
        setBoughtProducts,
        allQuantity,
        error,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
