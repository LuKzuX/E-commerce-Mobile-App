import { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import axios from 'axios'

export default function DetailsScreen() {
  const [data, setData] = useState('')
  useEffect(() => {
    const getData = async () => {
      try {
        const products = await axios.get(
          'http://10.0.0.160:5000/material-delivery/'
        )
        setData(products.data)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])

  return (
    <View style={styles.container}>
      <Text>test</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
