import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import { useCartContext } from '@/context/cartContext'
import { useEffect } from 'react'

export default function Cart() {
  const { boughtProducts } = useCartContext()
  console.log(boughtProducts)

  return (
    <View>
      <Text>iuui</Text>
    </View>
  )
}
