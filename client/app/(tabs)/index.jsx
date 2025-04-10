import { View, Text } from 'react-native'
import { useState, useEffect } from 'react'
import ProductList from '../components/ProductList.jsx'
import { useAuthContext } from '../../context/authContext.jsx'
import { useProductContext } from '@/context/productContext.jsx'
import { useRoute } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons'
import SearchBar from '../components/SearchBar.jsx'

export default function HomeScreen() {
  const route = useRoute()
  const { products, getData, category, displayCat } = useProductContext()
  const { user } = useAuthContext()
  const [pageValue, setPageValue] = useState(1)
  const [searchValue, setSearchValue] = useState('')
  const [sortValue, setSortValue] = useState('')

  useEffect(() => {
    getData(pageValue, searchValue, sortValue, category)
  }, [])

  return (
    <View className='bg-bg-gray'>
      <SearchBar></SearchBar>
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

      <ProductList data={products} getData={getData} />
    </View>
  )
}
