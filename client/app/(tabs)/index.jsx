import { View, Text, TouchableOpacity } from 'react-native'
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
  const [isSortOpen, setIsSortOpen] = useState(false)
  useEffect(() => {
    getData(pageValue, find, '', category)
  }, [])

  const handleSortMenu = () => {
    if (isSortOpen) {
      setIsSortOpen(false)
    } else {
      setIsSortOpen(true)
    }
    console.log(isSortOpen)
  }

  return (
    <View className='flex-1 bg-white'>
      <View className='bg-white'>
        <SearchBar />
        <View className='flex-row border-b border-gray-300 justify-evenly'>
          <TouchableOpacity
            onPress={() => {
              handleSortMenu()
            }}
            className='flex-row items-center p-4 gap-[1px]'
          >
            <Ionicons size={25} name='filter-outline' />
            <Text>Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleSortMenu()
            }}
            className='flex-row items-center p-4 gap-[1px]'
          >
            <Ionicons size={25} name='today-outline' />
            <Text>Sort</Text>
          </TouchableOpacity>
        </View>
        {category && (
          <View className='flex-row justify-between items-center bg-[#FFCA75] p-2 px-3 rounded-lg m-2'>
            <Text className='text-text-small-medium'>{displayCat}</Text>
            <Ionicons
              name={'close-outline'}
              size={30}
              onPress={() => getData(pageValue, '', sortValue, '')}
            />
          </View>
        )}
      </View>
      <ProductList data={products} getData={getData} />
    </View>
  )
}
