import { Link } from 'expo-router'
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  FlatList,
  Platform,
} from 'react-native'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { uploadImage } from '../utils/uploadImage'

export default function HomeScreen() {
  const navigation = useNavigation()
  const [data, setData] = useState('')

  const getData = async () => {
    try {
      const products = await axios.get('http://192.168.1.111:5000/material-delivery/')
      setData(products.data)
      console.log(products.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <Text style={styles.title}>Image Uploader</Text>
      <Button
        title='Select Image'
        onPress={async () => {
          await uploadImage(
            'http://192.168.1.111:5000/material-delivery/new-product'
          ), getData()
        }}
      />
      <Text style={styles.uploadedTitle}>Uploaded Images:</Text>
      {data &&
        data.map((obj, index) => (
          <View key={obj._id}>
            <Image
              source={{ uri: 'http://192.168.1.111:5000/' + obj.productImage }}
              style={styles.uploadedImage}
            ></Image>
            <Text>{obj.productName}</Text>
            <Text>{obj.productPrice}</Text>
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
