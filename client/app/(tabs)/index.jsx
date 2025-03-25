import { ip } from '../../getIp.js'
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
} from 'react-native'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import useGetProducts from '../../utils/useGetProducts.js'
import ProductList from '../components/ProductList.jsx'
import { useAuthContext } from '../../context/authContext.jsx'

export default function HomeScreen() {
  const navigation = useNavigation()
  const { data } = useGetProducts()
  const { user } = useAuthContext()
  const [searchValue, setSearchValue] = useState('')

  return (
    <View className='bg-bg-gray flex-1'>
      <SafeAreaView>
        <TextInput
          className='bg-white p-2 m-2 rounded-lg border text-text-small-medium'
          placeholder='Search'
        ></TextInput>
      </SafeAreaView>
      <ProductList data={data} />
    </View>
  )
}
