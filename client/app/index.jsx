import { Link } from 'expo-router'
import { View, Text, StyleSheet, Button, Image, FlatList } from 'react-native'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'

export default function HomeScreen() {
  const navigation = useNavigation()
  const [data, setData] = useState('')
  const [productImage, setProductImage] = useState('')

  useEffect(() => {
    const getData = async () => {
      try {
        const products = await axios.get(
          'http://10.0.0.160:5000/material-delivery/'
        )
        setData(products.data)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])

  const handleSelectImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      })
      if (!result.canceled) {
        const selectedUri = result.assets[0]
        setProductImage(selectedUri) // Update state with the URI// Log the URI directly here
        handleUpload() // Optionally handle upload here, e.g., handleUpload(selectedUri)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpload = async () => {
    const formData = new FormData()
    formData.append('productImage', productImage)
    try {
      const response = await axios.post(
        'http://10.0.0.160:5000/material-delivery/new-product',
        formData
      )
      console.log(formData.get('productImage'))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Text style={styles.title}>Image Uploader</Text>
      <Button title='Select Image' onPress={handleSelectImage} />
      <Text style={styles.uploadedTitle}>Uploaded Images:</Text>
      {data &&
        data.map((obj, index) => (
          <View key={obj._id}>
            <Image
              source={{ uri: productImage }}
              style={styles.uploadedImage}
            ></Image>
            <Text>{obj.productName}</Text>
          </View>
        ))}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  previewContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  previewImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  uploadedTitle: {
    marginTop: 20,
    fontSize: 18,
    marginBottom: 10,
  },
  uploadedImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
})
