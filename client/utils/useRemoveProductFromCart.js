import axios from 'axios'
import { useAuthContext } from '../context/authContext'
import { getApiUrl } from '../config'

export default function useAddProductToCart() {
  const { user, setUser } = useAuthContext()
  const removeProductFromCart = async (id) => {
    try {
      await axios.delete(
        `${getApiUrl()}/cart/${id}`,
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
