import axios from 'axios'
import { ip } from '../getIp'
import { useAuthContext } from '../context/authContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState, useEffect } from 'react'

export default function useGetCartData() {
  const { user } = useAuthContext()
  const [cartData, setCartData] = useState([])
  const getCartData = async () => {
   try {
    const res = await axios.get(`http://${ip}:5000/material-delivery/cart`, {
      headers: { Authorization: `Bearer ${user.token}` },
    })
    setCartData(res.data)
   } catch (error) {
    console.log(error)
   }
  }

  useEffect(() => {
    getCartData()
  }, [user])

  return { cartData, getCartData }
}
