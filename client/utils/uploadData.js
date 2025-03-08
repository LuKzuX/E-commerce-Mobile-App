import * as ImagePicker from 'expo-image-picker'
import axios from 'axios'

export const uploadData = async (route, name, price, category, description, quantity) => {
  try {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    if (!result.canceled) {
      const selectedUri = result.assets[0].uri
      if (selectedUri) await handleUpload(selectedUri, route, name, price, category, description, quantity)
    }
  } catch (error) {
    console.log(error)
  }
}

const handleUpload = async (fileUri, route, name, price, category, description, quantity) => {
  const formData = new FormData()
  formData.append('productImage', {
    uri: fileUri,
    name: 'uploaded_image.jpg', // Default name if extraction fails
    type: 'image/jpeg', // Or 'image/png' based on the file type
  })
  formData.append('productName', name)
  formData.append('productPrice', price)
  formData.append('productCategory', category)
  formData.append('productDescription', description)
  formData.append('productQuantity', quantity)
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
