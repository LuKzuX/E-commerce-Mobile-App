import { useState } from 'react'
import { View, Text } from 'react-native'

export default function Filter({ getData, find, sortValue, category }) {
  const [minValue, setMinValue] = useState('')
  const [maxValue, setMaxValue] = useState('')

  return (
    <View>
      <View className='flex flex-col'>
        <Text
          onPress={() => {
            setMinValue(0)
            setMaxValue(100)
          }}
        >
          $0 to $100
        </Text>
      </View>
      <Text onPress={async () => await getData(1, find, sortValue, category, minValue, maxValue)}>apply</Text>
    </View>
  )
}
