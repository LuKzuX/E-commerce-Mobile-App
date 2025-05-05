import axios from 'axios'
import { ip } from '../getIp'
import { useAuthContext } from '../context/authContext'

export default function useAddProductToCart() {
  const { user, setUser } = useAuthContext()
  const removeProductFromCart = async (id) => {
    try {
      await axios.delete(
        `http://${ip}:5000/material-delivery/cart/${id}`,// empty object for request body
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
  return removeProductFromCart
}
