import axios from 'axios'
import { ip } from '../getIp'
import { useNavigation } from 'expo-router'
import { useState } from 'react'

export const useSignup = () => {
  const navigator = useNavigation()
  const [error, setError] = useState('')
  const signin = async (username, email, password) => {
    try {
      await axios.post(`http://${ip}:5000/material-delivery/signup`, {
        username,
        email,
        password,
      })
      navigator.replace('Signin')
    } catch (error) {
      setError(error.response.data.statusText)
      console.log(error)
    }
  }
  return { signin, error }
}
