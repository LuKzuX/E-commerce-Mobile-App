import { useState } from 'react'
import { View, Text } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function Filter({ getData, find, sortValue, category }) {
  const [minValue, setMinValue] = useState('')
  const [maxValue, setMaxValue] = useState('')

  return (
    <View style={{zIndex: 9999}} className=' absolute bg-white w-full p-6 bottom-0'>
      <Ionicons className='self-end' size={30} name='close-outline'></Ionicons>
      <View className='flex flex-col items-start'>
        <Text
          onPress={() => {
            setMinValue(0)
            setMaxValue(100)
          }}
        >
          $0 to $100
        </Text>
      </View>
      <Text
        onPress={async () =>
          await getData(1, find, sortValue, category, minValue, maxValue)
        }
        className='bg-blue-500 text-white text-center self-center px-12 p-4 text-text-small-medium font-bold mt-10 rounded-xl'
      >
        Apply Filters
      </Text>
    </View>
  )
}
