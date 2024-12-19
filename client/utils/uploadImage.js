import * as ImagePicker from 'expo-image-picker'
import axios from 'axios'

export const uploadImage = async (route) => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      })
      if (!result.canceled) {
        const selectedUri = result.assets[0].uri
        if (selectedUri) await handleUpload(selectedUri, route)
      }
    } catch (error) {
      console.log(error)
    }
  }

const handleUpload = async (fileUri,  route) => {
    const formData = new FormData()
    formData.append('productImage', fileUri)
    try {
      const response = await axios.post(
        route,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }