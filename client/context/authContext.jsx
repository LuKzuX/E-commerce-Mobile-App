import { createContext, useContext } from 'react'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { ip } from '../getIp.js'
import { useNavigation } from '@react-navigation/native'

export const AuthContext = createContext({})

export const useAuthContext = () => {
  return useContext(AuthContext)
}

export const AuthContextProvider = ({ children }) => {
  const navigation = useNavigation()
  const [user, setUser] = useState(null)

  const signin = async (email, password) => {
    try {
      const res = await axios.post(
        `http://${ip}:5000/material-delivery/signin`,
        {
          email,
          password,
        }
      )
      await AsyncStorage.setItem('user', JSON.stringify(res.data))
      setUser(res.data)
      navigation.navigate('Tabs')
    } catch (error) {
      console.log(error)
    }
  }

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user')
      setUser(null)
      console.log('user loggouted')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const getUserSession = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('user')
        if (savedUser) {
          setUser(JSON.parse(savedUser))
        } else {
          setUser(null)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getUserSession()
  }, [])

  return (
    <AuthContext.Provider value={{ signin, logout, user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
