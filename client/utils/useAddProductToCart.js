import axios from 'axios'
import { ip } from '../getIp'
import { useAuthContext } from '../context/authContext'

export default function useAddProductToCart() {
  const { user } = useAuthContext()
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
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  return addProductToCart
}
 