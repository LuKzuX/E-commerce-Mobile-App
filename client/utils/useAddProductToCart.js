import axios from 'axios'
import { ip } from '../getIp'
import { useAuthContext } from '../context/authContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function useAddProductToCart() {
  const { user, setUser } = useAuthContext()
  const addProductToCart = async (id) => {
    try {
      const res = await axios.post(
        `http://${ip}:5000/material-delivery/cart/${id}`,
        {}, // empty object for request body
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      setUser((prop) => prop.cart = res.data.user.cart) // Assuming res.data contains updated user info
      console.log(res.data.user.cart);
      
    } catch (error) {
      console.log(error)
    }
  }
  return addProductToCart
}
 