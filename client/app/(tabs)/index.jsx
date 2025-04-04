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
import Ionicons from '@expo/vector-icons/Ionicons'

export default function HomeScreen() {
  const route = useRoute()
  const { products, getData, category, displayCat } = useProductContext()
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
        <View className='relative'>
          <TextInput
            onKeyPress={(e) => {
              if (e.nativeEvent.key === 'Enter') {
                getData(pageValue, searchValue, sortValue, category)
              }
            }}
            onChangeText={(text) => {
              setSearchValue(text)
            }}
            className='bg-white p-2 m-2 rounded-lg border text-text-small-medium pr-16 h-[45px]'
            placeholder='Search'
          ></TextInput>
          <Ionicons
            className='absolute right-4 top-[25%]'
            name={'search-outline'}
            size={30}
            onPress={() => getData(pageValue, searchValue, sortValue, category)}
          />
        </View>
        {category && (
          <View className='flex-row items-center bg-yellow-500 bg-opacity-[20%] p-2 rounded-lg m-2'>
            <Ionicons
              name={'close-outline'}
              size={20}
              onPress={() => getData(pageValue, searchValue, sortValue, '')}
            />
            <Text>{displayCat}</Text>
          </View>
        )}
      </SafeAreaView>
      <ProductList data={products} getData={getData} />
    </View>
  )
}
