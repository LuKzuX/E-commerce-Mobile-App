import Ionicons from '@expo/vector-icons/Ionicons'
import { View, Text, TouchableOpacity } from 'react-native'
import { Animated } from 'react-native'
import { useRef, useEffect } from 'react'

export default function GetProductQuantityInCart({
  getProductQuantity,
  increment,
  decrement,
}) {
  const translateX = useRef(new Animated.Value(0)).current
  const quantity = getProductQuantity?.() || 0

  useEffect(() => {
    // Calculate proper translation: (index - 1) * (text width + gap)
    // Each item is 30px wide, gap is 10px between items
    const offset = -(quantity - 1) * 40
    
    Animated.timing(translateX, {
      toValue: offset,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }, [quantity])

  return (
    <View className='flex-row justify-center gap-2 items-center'>
      <TouchableOpacity onPress={decrement} disabled={quantity <= 0}>
        <Ionicons
          style={{
            opacity: quantity <= 0 ? 0.5 : 1,
          }}
          disabled={quantity <= 0}
          name='remove-outline'
          size={25}
        />
      </TouchableOpacity>
      <View className='flex-row items-center overflow-hidden border border-gray-300 rounded-lg bg-white' style={{ width: 40, height: 40 }}>
        <Animated.View
          style={{
            transform: [{ translateX }],
            width: 200,
            flexDirection: 'row',
            gap: 10,
            paddingHorizontal: 5,
          }}
        >
          <Text className='w-[30px] text-center font-semibold'>1</Text>
          <Text className='w-[30px] text-center font-semibold'>2</Text>
          <Text className='w-[30px] text-center font-semibold'>3</Text>
          <Text className='w-[30px] text-center font-semibold'>4</Text>
          <Text className='w-[30px] text-center font-semibold'>5</Text>
        </Animated.View>
      </View>
      <TouchableOpacity onPress={increment} disabled={quantity >= 5}>
        <Ionicons
          style={{
            opacity: quantity >= 5 ? 0.5 : 1,
          }}
          disabled={quantity >= 5}
          name='add-outline'
          size={25}
        />
      </TouchableOpacity>
    </View>
  )
}
