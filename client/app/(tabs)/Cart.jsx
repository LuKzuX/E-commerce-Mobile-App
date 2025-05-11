import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import { useCartContext } from '@/context/cartContext'
import { useEffect } from 'react'
import { useRoute } from '@react-navigation/native'

export default function Cart() {
  const { allProducts } = useCartContext()
  console.log(allProducts)

  return (
    <View>
      <Text>iuui</Text>
    </View>
  )
}
