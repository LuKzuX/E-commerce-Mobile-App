import { ip } from '../../getIp.js'
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
import useGetProducts from '../../utils/useGetProducts.js'
import ProductList from '../components/ProductList.jsx'
import { useAuthContext } from '../../context/authContext.jsx'
import Navbar from '../components/Navbar.jsx'

export default function HomeScreen() {
  const navigation = useNavigation()
  const { data } = useGetProducts()
  const { user } = useAuthContext()

  return (
    <View className='bg-bg-gray flex-1'>
      <View></View>
      <ProductList data={data} property='productName' />
    </View>
  )
}
