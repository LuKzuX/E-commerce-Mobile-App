import { ip } from '../getIp.js'
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function HomeScreen() {
  const navigation = useNavigation()
  const [data, setData] = useState('')

  const getData = async () => {
    try {
      const products = await axios.get(`http://${ip}:5000/material-delivery/`)
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
      <TouchableOpacity onPress={() => navigation.navigate('CreateProduct')}>
        <Ionicons name='add-circle-outline' size={120} color='gray' />
      </TouchableOpacity>

      {data &&
        data.map((obj, index) => (
          <View key={obj._id}>
            <Image
              source={{ uri: `http://${ip}:5000/` + obj.productImage }}
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
})
