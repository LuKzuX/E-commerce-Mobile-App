import * as ImagePicker from 'expo-image-picker'
import axios from 'axios'
import { useState } from 'react'
import { useAuthContext } from '../context/authContext'
import { ip } from '@/getIp'

export const useUploadData = () => {
  const [uri, setUri] = useState('')
  const [success, setSuccess] = useState('')
  const { user } = useAuthContext()

  const uploadData = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      })
      if (!result.canceled) {
        const selectedUri = result.assets[0].uri
        setUri(selectedUri)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpload = async (
    route,
    method,
    name,
    price,
    category,
    description,
    quantity
  ) => {
    if (price == typeof String) {
      setSuccess('type a valid price')
      return
    }
    const formData = new FormData()

    let validUri = uri
    if (uri.uri) {
      validUri = uri.uri
    }
    formData.append('productImage', {
      uri: validUri,
      name: 'uploaded_image.jpg', // Default name if extraction fails
      type: 'image/jpeg', // Or 'image/png' based on the file type
    })
    formData.append('productName', name)
    formData.append('productPrice', price)
    formData.append('productCategory', category)
    formData.append('productDescription', description)
    formData.append('productQuantity', quantity)
    try {
      await axios[method](route, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user.token}`,
        },
      })
      setSuccess('created')
    } catch (error) {
      console.log(error);
      
    }
  }

  return { uploadData, handleUpload, success, uri, setUri }
}
