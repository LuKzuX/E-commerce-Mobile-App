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
import ProductList from '../components/ProductList.jsx'
import { useAuthContext } from '../../context/authContext.jsx'
import { useProductContext } from '../../context/productContext'

export default function HomeScreen() {
  const { products, getData } = useProductContext()
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
      <ProductList data={products}/>
    </View>
  )
}
