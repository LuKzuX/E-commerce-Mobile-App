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
import { useProductContext } from '@/context/productContext.jsx'
import { useNavigation, useRoute } from '@react-navigation/native'

export default function HomeScreen() {
  const route = useRoute()
  const { products, getData, category } = useProductContext()
  const { user } = useAuthContext()
  const [pageValue, setPageValue] = useState(1)
  const [searchValue, setSearchValue] = useState('')
  const [sortValue, setSortValue] = useState('')

  return (
    <View className='bg-bg-gray flex-1'>
      <SafeAreaView>
        <Text>{category}</Text>
        <TextInput
          onKeyPress={(e) => {
            if (e.nativeEvent.key === 'Enter') {
              getData(pageValue, searchValue, sortValue)
            }
          }}
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
      <ProductList data={products} getData={getData} />
    </View>
  )
}
