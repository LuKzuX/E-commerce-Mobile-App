import axios from 'axios'
import { useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import { Text, View, Image } from 'react-native'
import useGetProductDetails from '../../utils/useGetProductDetails'
import { ip } from '../../getIp'

export default function ProductDetails() {
  const route = useRoute()
  const { id } = route.params
  const { data } = useGetProductDetails(id)

  return (
    <View>
      {data[0] && (
        <View className='flex flex-row justify-center px-6'>
          <Image
            source={{ uri: `http://${ip}:5000/` + data[0].productImage }}
            style={{ width: '100%', height: 350, resizeMode: 'cover' }}
          />
        </View>
      )}
    </View>
  )
}
