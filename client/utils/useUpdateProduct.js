import { ip } from '../getIp'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuthContext } from '../context/authContext'
import { useRoute, useNavigation } from '@react-navigation/native'

export default function useUpdateProduct() {
  const navigation = useNavigation()
  const { user } = useAuthContext()
  const updateProduct = async (
    id,
    productName,
    productPrice,
    productCategory,
    productDescription,
    productQuantity
  ) => {
    try {
      await axios.patch(
        `http://${ip}:5000/material-delivery/${id}`,
        {
          productName,
          productPrice,
          productCategory,
          productDescription,
          productQuantity,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      console.log('updated')
    } catch (error) {
      console.log(error)
    }
  }

  return { updateProduct }
}
