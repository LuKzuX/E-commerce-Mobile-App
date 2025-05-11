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

  useEffect(() => {
    const quantity = getProductQuantity?.() || 0

    Animated.timing(translateX, {
      toValue: -(quantity * 50) + 80 - quantity * 10, 
      duration: 300,
      useNativeDriver: true,
    }).start()
  }, [getProductQuantity()]) // re-run when quantity changes

  return (
    <View className='flex-row justify-center gap-2'>
      <TouchableOpacity>
        <Ionicons
          className={`${
            getProductQuantity() <= 0 ? 'opacity-50' : 'opacity-100'
          } px-2`}
          disabled={getProductQuantity() <= 0}
          onPress={decrement}
          name='remove-outline'
          size={25}
        />
      </TouchableOpacity>
      <View className='flex-row items-center overflow-hidden border rounded-lg'>
        <Animated.View
          style={{
            transform: [{ translateX }],
            width: 50,
            overflow: 'auto',
            flexDirection: 'row',
            gap: 50,
          }}
        >
          <Text className='w-[10px]'>1</Text>
          <Text className='w-[10px]'>2</Text>
          <Text className='w-[10px]'>3</Text>
          <Text className='w-[10px]'>4</Text>
          <Text className='w-[10px]'>5</Text>
        </Animated.View>
      </View>
      <TouchableOpacity>
        <Ionicons
          className={`${
            getProductQuantity() >= 5 ? 'opacity-50' : 'opacity-100'
          } px-2`}
          disabled={getProductQuantity() >= 5}
          onPress={increment}
          name='add-outline'
          size={25}
        />
      </TouchableOpacity>
    </View>
  )
}
