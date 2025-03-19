import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../context/authContext'
import { useContext } from 'react'
import { ip } from '../getIp'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const useSignin = () => {
  const navigation = useNavigation()
  const { user, setUser } = useContext(AuthContext)
  

  const signin = async (email, password) => {
    try {
      const res = await axios.post(`http://${ip}:5000/material-delivery/signin`, {
        email,
        password,
      })
      await AsyncStorage.setItem('user', JSON.stringify(res.data))
      setUser(res.data)
      navigation.navigate('/')
      console.log(user, setUser);
    } catch (error) {
      console.log(error)
    }
  }

  return { signin }
}
