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
  const { data, getData } = useGetProducts()
  const { user } = useAuthContext()
  const [pageValue, setPageValue] = useState(1)
  const [searchValue, setSearchValue] = useState('')
  const [sortValue, setSortValue] = useState('')

  useEffect(() => {
    getData()
  }, [])

  return (
    <View className='bg-bg-gray flex-1'>
      <SafeAreaView>
        <TextInput
          onChangeText={(text) => {
            setSearchValue(text)
          }}
          className='bg-white p-2 m-2 rounded-lg border text-text-small-medium'
          placeholder='Search'
        ></TextInput>
        <Button
          onPress={() => getData(pageValue, searchValue, sortValue)}
          title='press'
        ></Button>
      </SafeAreaView>
      <ProductList data={data} />
    </View>
  )
}
