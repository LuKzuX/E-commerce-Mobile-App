import { createContext, useContext } from 'react'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { ip } from '../getIp.js'
import { useNavigation } from '@react-navigation/native'

export const AuthContext = createContext({})

export const useAuthContext = () => {
  return useContext(AuthContext)
}

export const AuthContextProvider = ({ children }) => {
  const navigation = useNavigation()
  const [user, setUser] = useState("aaaa")

  const signin = async (email, password) => {
    try {
      const res = await axios.post(`http://${ip}:5000/material-delivery/signin`, {
        email,
        password,
      })
      await AsyncStorage.setItem('user', JSON.stringify(res.data));
      setUser(res.data)
      navigation.navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
 
  useEffect(() => {
    const getUserSession = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('user')

        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.log(error)
      }
    }
    getUserSession()
  }, [])
  
  return (
    <AuthContext.Provider value={{signin, user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
