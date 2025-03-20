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
import ProductList from './components/ProductList.jsx'
import Navbar from './components/Navbar.jsx'
import { useAuthContext } from '../context/authContext.jsx'

export default function HomeScreen() {
  const navigation = useNavigation()
  const { data } = useGetProducts()
  const { user } = useAuthContext();

  useEffect(() => {
    console.log('Current User:', user); // Log the user to verify
  }, [user]);

  return (
    <View className='bg-bg-gray flex-1'>
      <TouchableOpacity
        className='justify-center items-center py-5'
        onPress={() => navigation.navigate('screens/CreateProductScreen')}
      >
        <Ionicons name='add-circle-outline' size={120} color='gray' />
        <Text className='text-xl text-gray-500'>Add Product</Text>
      </TouchableOpacity>
      <ProductList data={data} property='productName' />
      <Navbar />
    </View>
  )
}
