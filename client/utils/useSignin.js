import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../context/authContext'
import { useContext } from 'react'

export const useSignin = () => {
  const { user, setUser } = useContext(AuthContext)
  const navigation = useNavigation()

  const signin = async (email, password) => {
    try {
      const res = await axios.post('/material-delivery/signin', {
        email,
        password,
      })
      localStorage.setItem('user', JSON.stringify(res.data))
      setUser(res.data)
      navigation.navigate('screens/SigninScreen')
    } catch (error) {
      console.log(error)
    }
  }

  return { signin }
}
