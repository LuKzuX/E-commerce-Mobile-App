import { createContext, useContext } from 'react'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const AuthContext = createContext({})

export const useAuthContext = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState('')

  useEffect(() => {
    const getUserSession = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('user')
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.log(error)
      }
    }
    getUserSession()
  }, [])
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
