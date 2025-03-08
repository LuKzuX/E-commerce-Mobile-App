import { ip } from '../getIp.js'
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import useGetProducts from '../utils/useGetProducts.js'
import { ProductList } from './components/ProductList.jsx'
import Navbar from './components/Navbar.jsx'

export default function HomeScreen() {
  const navigation = useNavigation()
  const { data } = useGetProducts()

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addItemBtn}
        onPress={() => navigation.navigate('screens/CreateProductScreen')}
      >
        <Ionicons name='add-circle-outline' size={120} color='gray' />
        <Text style={styles.btnText}>Add Product</Text>
      </TouchableOpacity>
      <ProductList data={data} property='productName' />
      <Navbar />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebebeb',
  },
  addItemBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  btnText: {
    fontSize: 20,
    fontWeight: 500,
    color: 'gray',
  },
})
