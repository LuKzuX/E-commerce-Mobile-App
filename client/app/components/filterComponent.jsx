import { useState, useEffect, useRef } from 'react'
import { View, Text, Animated, TouchableOpacity } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useProductContext } from '../../context/productContext'

export default function Filter({
  getData,
  find,
  sortValue,
  category,
  isFilterOpen,
  setIsFilterOpen,
  minValue,
  setMinValue,
  maxValue,
  setMaxValue,
}) {
  const slideAnim = useRef(new Animated.Value(-800)).current
  const [minValueFilter, setMinValueFilter] = useState("")
  const [maxValueFilter, setMaxValueFilter] = useState("")
  const { products, getProducts } = useProductContext()

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isFilterOpen ? 0 : -800,
      duration: 500,
      useNativeDriver: false,
    }).start()
  }, [isFilterOpen])

  const priceRanges = [
    { min: 0, max: 100 },
    { min: 100, max: 200 },
    { min: 200, max: 500 },
    { min: 500, max: 1000 },
    { min: 1000, max: 9999 },
    { min: 10000, max: 999999 },
  ]

  return (
    <Animated.View
      style={{ top: slideAnim, zIndex: 9999 }}
      className={`z-90 absolute bg-white w-full p-6`}
    >
      <Ionicons
        className='self-end mb-10'
        size={30}
        name='close-outline'
        onPress={() => setIsFilterOpen(false)}
      ></Ionicons>
      <View className='flex-col gap-10'>
        {priceRanges.map(({ min, max }) => {
          let selected = minValueFilter === min && maxValueFilter === max

          return (
            <TouchableOpacity
              className={`px-4 py-2 rounded-full border ${
                selected ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
              }`}
              key={`${min}-${max}`}
              onPress={() => {
                if (!selected) {
                  setMinValueFilter(min)
                  setMaxValueFilter(max)
                } else {
                  selected = ''
                  setMinValueFilter('')
                  setMaxValueFilter('')
                }
              }}
            >
              <Text
                className={selected ? 'text-white' : 'text-black'}
              >{`$${min} to $${max}`}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
      <TouchableOpacity
        onPress={() =>{
          setMinValue(minValueFilter)
          setMaxValue(maxValueFilter)
          getProducts(1, find, sortValue, category, minValue, maxValue)
          setIsFilterOpen(false)
        }}
        className='bg-blue-500 self-center px-12 p-4 mt-10 rounded-xl'
      >
        <Text className='text-white font-bold text-text-small-medium'>
          Apply Filters
        </Text>
      </TouchableOpacity>
    </Animated.View>
  )
}
