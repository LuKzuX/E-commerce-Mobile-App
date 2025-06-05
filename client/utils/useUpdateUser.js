import axios from 'axios'
import { ip } from '../getIp'
import { useAuthContext } from '../context/authContext'
import { useState } from 'react'

export default function useUpdateUser() {
  const { user } = useAuthContext()
  const [updateUserInfoError, setUpdateUserInfoError] = useState("")
  const updateUserInfo = async (
    username,
    password,
    newPassword,
    email,
    country,
    state,
    city,
    street,
    areaCode
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
          state,
          city,
          street,
          areaCode,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
    } catch (error) {
      console.log(error.response.data.statusText);
      
      setUpdateUserInfoError(error.response.data.statusText)
      setTimeout(() => {
        setUpdateUserInfoError("")
      }, 4000);
    }
  }
  return {updateUserInfo, updateUserInfoError}
}
