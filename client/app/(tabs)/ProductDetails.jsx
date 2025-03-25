import axios from 'axios'
import { useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import { Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import useGetProductDetails from '../../utils/useGetProductDetails'
import { ip } from '../../getIp'

export default function ProductDetails() {
  const route = useRoute()
  const { id } = route.params
  const { data } = useGetProductDetails(id)

  return (
    <ScrollView className='bg-bg-gray'>
      {data[0] && (
        <View className='flex flex-col gap-6 p-6 bg-white rounded-lg'>
          {/* Product Image */}
          <View>
            <Image
              source={{ uri: `http://${ip}:5000/` + data[0].productImage }}
              className='w-full h-96 rounded-md object-cover'
            />
          </View>

          <View className='flex-col gap-4'>
            <View className='flex-row justify-between'>
              <Text className='text-text-large font-bold'>
                {data[0].productName}
              </Text>
              <View className='flex-row items-center'>
                <Text className='text-text-large font-semibold text-green-700'>
                  ${data[0].productPrice}
                </Text>
              </View>
            </View>
            <Text className='text-text-small'>
              {data[0].productDescription}
            </Text>
            <View className='flex-row '>
              <Text className='text-gray-500 text-text-small'>Category: </Text>
              <Text className='text-text-small'>{data[0].productCategory}</Text>
            </View>
            {data[0].productQuantity <= 50 && data[0].productQuantity >= 1 && <Text className='text-text-small text-yellow-500'>Low on Stock</Text>}
            {data[0].productQuantity <= 0 && <Text className='text-text-small text-red-500'>Sold Out</Text>}
            {data[0].productQuantity >= 100 && <Text className='text-text-small text-green-700'>In Stock</Text>}
          </View>

          <View className='mt-6 space-y-3'>
            <TouchableOpacity className='bg-bg-yellow p-4 rounded-lg items-center shadow-md'>
              <Text className='text-lg font-semibold text-text-dark'>
                Add to Cart
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  )
}
