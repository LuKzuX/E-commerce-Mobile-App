import axios from 'axios'
import { ip } from '../getIp'
import { useAuthContext } from '../context/authContext'

export default function useUpdateUser() {
  const { user } = useAuthContext()
  const updateUserInfo = async (
    username,
    email,
    password,
    country,
    areaCode,
    city,
    street,
    state
  ) => {
    try {
      const res = await axios.patch(
        `http://${ip}:5000/material-delivery/user`,
        {
          username,
          email,
          password,
          country,
          areaCode,
          city,
          street,
          state,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }
  return updateUserInfo
}
