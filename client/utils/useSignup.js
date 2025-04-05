import axios from 'axios'
import { ip } from '../getIp'
import { useNavigation } from 'expo-router'

export const useSignup = () => {
  const signin = async (username, email, password) => {
    try {
      const res = await axios.post(`http://${ip}:5000/material-delivery/signup`, {username, email, password})
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }
  return signin
}
