import { View, Text } from 'react-native'
import { useState, useEffect } from 'react'
import ProductList from '../components/ProductList.jsx'
import { useAuthContext } from '../../context/authContext.jsx'
import { useProductContext } from '@/context/productContext.jsx'
import { useRoute } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons'
import SearchBar from '../components/SearchBar.jsx'
import { ScrollView } from 'react-native-gesture-handler'

export default function HomeScreen() {
  const route = useRoute()
  const { products, getData, category, displayCat, find } = useProductContext()
  const { user } = useAuthContext()
  const [pageValue, setPageValue] = useState(1)
  const [sortValue, setSortValue] = useState('')

  useEffect(() => {
    getData(pageValue, find, sortValue, category)
  }, [])

  return (
    <View>
      <View className='bg-bg-gray'>
        <SearchBar></SearchBar>
        <View className='flex-row'>
          <View className='flex-row items-center'>
            <Ionicons name='filter-outline'></Ionicons>
            <Text>Filter</Text>
          </View>
          <View className='flex-row items-center'>
            <Ionicons name='today-outline'></Ionicons>
            <Text>Filter</Text>
          </View>
        </View>
        {category && (
          <View className='flex-row justify-between items-center bg-[#FFCA75] p-2 px-3 rounded-lg m-2'>
            <Text className='text-text-small-medium'>{displayCat}</Text>
            <Ionicons
              name={'close-outline'}
              size={30}
              onPress={() => getData(pageValue, searchValue, sortValue, '')}
            />
          </View>
        )}
      </View>
      <ProductList data={products} getData={getData} />
    </View>
  )
}
