import { useState, useEffect, useRef } from 'react'
import { View, Text, Animated, TouchableOpacity } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function Sort({
  getData,
  find,
  sortValue,
  setSortValue,
  category,
  isSortOpen,
  setIsSortOpen,
  minValue,
  setMinValue,
  maxValue,
  setMaxValue,
}) {
  const slideAnim = useRef(new Animated.Value(-800)).current
  const [sortValueLocal, setSortValueLocal] = useState('')
  const properties = [
    { productName: 'A-Z' },
    { '-productName': 'Z-A' },
    { productPrice: 'Price Low to High' },
    { '-productPrice': 'Price High to Low' },
  ]

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isSortOpen ? 0 : -800,
      duration: 500,
      useNativeDriver: false,
    }).start()
  }, [isSortOpen])

  return (
    <Animated.View
      style={{ top: slideAnim, zIndex: 9999 }}
      className={`z-90 absolute bg-white w-full p-6`}
    >
      <Ionicons
        className='self-end mb-10'
        size={30}
        name='close-outline'
        onPress={() => setIsSortOpen(false)}
      ></Ionicons>
      <View className='flex-col gap-10'>
        {properties.map((obj) => {
          const [key, label] = Object.entries(obj)[0]
          let selected = sortValueLocal === key
          return (
            <TouchableOpacity
              onPress={() => {
                if (!selected) {
                  setSortValueLocal(key)
                } else {
                  selected = ''
                  setSortValueLocal('')
                }
              }}
              className={`px-4 py-2 rounded-full border ${
                selected ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
              }`}
              key={key}
            >
              <Text className={selected ? 'text-white' : 'text-black'}>
                {label}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>
      <TouchableOpacity
        onPress={() => {
          setSortValue(sortValueLocal)
          getData(1, find, sortValue, category, minValue, maxValue)
          setIsSortOpen(false)
        }}
        className='bg-blue-500 self-center px-12 p-4 mt-10 rounded-xl'
      >
        <Text className='text-white text-text-small-medium font-bold'>
          Apply Filters
        </Text>
      </TouchableOpacity>
    </Animated.View>
  )
}
