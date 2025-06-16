import * as ImagePicker from 'expo-image-picker'
import axios from 'axios'
import { useState } from 'react'
import { useAuthContext } from '../context/authContext'
import { getApiUrl } from '../config'

export const useUploadData = () => {
  const [uri, setUri] = useState('')
  const [success, setSuccess] = useState('')
  const { user } = useAuthContext()

  const uploadData = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      })
      if (!result.canceled) {
        const selectedUri = result.assets[0].uri
        setUri(selectedUri)
      }
    } catch (error) {
      console.error('Error picking image:', error)
      setSuccess('Error selecting image')
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
    console.log('Form Data:', {
      name,
      price,
      category,
      description,
      quantity,
      uri
    })

    if (!name || !price || !category || !description || !quantity || !uri) {
      console.log('Missing fields:', {
        name: !name,
        price: !price,
        category: !category,
        description: !description,
        quantity: !quantity,
        uri: !uri
      })
      setSuccess('Please fill all fields and select an image')
      return
    }

    if (typeof price !== 'number' || isNaN(price)) {
      console.log('Invalid price:', price, typeof price)
      setSuccess('Please enter a valid price')
      return
    }

    const formData = new FormData()
    formData.append('productImage', {
      uri: uri,
      name: 'uploaded_image.jpg',
      type: 'image/jpeg',
    })
    formData.append('productName', name)
    formData.append('productPrice', price)
    formData.append('productCategory', category)
    formData.append('productDescription', description)
    formData.append('productQuantity', quantity)

    console.log('Sending form data:', Object.fromEntries(formData))

    try {
      const response = await axios[method](route, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user.token}`,
        },
      })
      setSuccess('Product created successfully')
      return response.data
    } catch (error) {
      console.error('Error uploading product:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers
      })
      setSuccess(error.response?.data?.error || error.response?.data?.statusText || error.message || 'Error creating product')
      throw error
    }
  }

  return { uploadData, handleUpload, success, uri, setUri }
}
