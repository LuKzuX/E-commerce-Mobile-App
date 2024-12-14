import { Link } from 'expo-router'
import { View, Text, StyleSheet } from 'react-native'
import { useState, useEffect } from 'react'
import axios from "axios"

export default function HomeScreen() {
  const [data, setData] = useState([])
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

  if (data) {
    return data.map((obj) => (
      <View key={obj._id}>
        <Text>{obj.productName}</Text>
        <Text>{obj.productPrice}</Text>
      </View>
    ))
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
