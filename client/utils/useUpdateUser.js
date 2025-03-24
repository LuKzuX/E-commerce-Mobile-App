import axios from 'axios'
import { ip } from '../getIp'
import { useAuthContext } from '../context/authContext'

export default function useUpdateUser() {
  const { user } = useAuthContext()
  const updateUserInfo = async (
    username,
    password,
    newPassword,
    email,
    country,
    areaCode,
    city,
    street,
    state
  ) => {
    try {
      await axios.patch(
        `http://${ip}:5000/material-delivery/user`,
        {
          username,
          password,
          newPassword,
          email,
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
    } catch (error) {
      console.log(error)
    }
  }
  return updateUserInfo
}
