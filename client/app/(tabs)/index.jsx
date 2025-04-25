import { View, Text, TouchableOpacity, Pressable } from 'react-native'
import { useState, useEffect } from 'react'
import ProductList from '../components/ProductList.jsx'
import { useAuthContext } from '../../context/authContext.jsx'
import { useProductContext } from '@/context/productContext.jsx'
import { useRoute } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons'
import SearchBar from '../components/SearchBar.jsx'
import Filter from '../components/FilterComponent.jsx'
import Sort from '../components/SortComponent.jsx'

export default function HomeScreen() {
  const route = useRoute()
  const { products, setProducts, getData, category, displayCat, find } = useProductContext()
  const [pageValue, setPageValue] = useState(1)
  const [sortValue, setSortValue] = useState('')
  const [isSortOpen, setIsSortOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [minValue, setMinValue] = useState('')
  const [maxValue, setMaxValue] = useState('')

  useEffect(() => {
    getData(pageValue, find, '', category)
  }, [])

  const handleSortMenu = () => {
    if (isSortOpen) {
      setIsSortOpen(false)
    } else {
      setIsSortOpen(true)
    }
  }
  const handleFilterMenu = () => {
    if (isFilterOpen) {
      setIsFilterOpen(false)
    } else {
      setIsFilterOpen(true)
    }
  }

 
  return (
    <View className='flex-1 bg-white'>
      {isFilterOpen && (
        <Pressable
          className='absolute top-0 w-screen h-screen bg-black bg-black/50 z-10'
          onPress={handleFilterMenu}
        ></Pressable>
      )}
      {isSortOpen && (
        <Pressable
          className='absolute top-0 w-screen h-screen bg-black bg-black/50 z-10'
          onPress={handleSortMenu}
        ></Pressable>
      )}
      <View className='bg-white'>
        <SearchBar />
        <View className='flex-row border-b border-gray-300 justify-evenly'>
          <TouchableOpacity
            onPress={() => {
              handleFilterMenu()
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
      <Filter
        getData={getData}
        find={find}
        sortValue={sortValue}
        category={category}
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        minValue={minValue}
        setMinValue={setMinValue}
        maxValue={maxValue}
        setMaxValue={setMaxValue}
      />
      <Sort
        getData={getData}
        find={find}
        sortValue={sortValue}
        setSortValue={setSortValue}
        category={category}
        isSortOpen={isSortOpen}
        setIsSortOpen={setIsSortOpen}
        minValue={minValue}
        setMinValue={setMinValue}
        maxValue={maxValue}
        setMaxValue={setMaxValue}
      />
    </View>
  )
}
