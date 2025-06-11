import axios from 'axios'
import { useNavigation } from 'expo-router'
import { useState } from 'react'
import { getApiUrl } from '../config'

export const useSignup = () => {
  const navigator = useNavigation()
  const [error, setError] = useState('')
  const signup = async (username, email, password) => {
    try {
      await axios.post(`${getApiUrl()}/material-delivery/signup`, {
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
  return { signup, error }
}
