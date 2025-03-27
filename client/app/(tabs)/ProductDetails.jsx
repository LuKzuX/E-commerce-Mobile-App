import axios from 'axios'
import { useState, useEffect } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import { Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import useGetProductDetails from '../../utils/useGetProductDetails'
import useDeleteProduct from '../../utils/useDeleteProduct'
import { ip } from '../../getIp'

export default function ProductDetails() {
  const route = useRoute()
  const navigation = useNavigation()
  const { id, getData } = route.params
  const { data } = useGetProductDetails(id)
  const deleteProduct = useDeleteProduct()

  const handleDelete = async () => {
    try {
      await deleteProduct(id)
      getData() // Refresh the product list
      navigation.goBack() // Go back to the previous screen
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

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

          <View className='flex-col gap-4 p-4 bg-white rounded-lg shadow-md'>
            {/* Product Title and Price */}
            <View className='flex-row justify-between items-center'>
              <Text className='text-text-medium font-bold text-gray-900'>
                {data[0].productName}
              </Text>
              <Text className='text-text-medium font-semibold text-green-600'>
                ${data[0].productPrice}
              </Text>
            </View>

            {/* Product Description */}
            <Text className='text-text-small text-gray-600'>
              {data[0].productDescription}
            </Text>

            {/* Product Category */}
            <View className='flex-row items-center'>
              <Text className='text-text-small text-gray-500 font-semibold'>
                Category:{' '}
              </Text>
              <Text className='text-text-small text-gray-700'>
                {data[0].productCategory}
              </Text>
            </View>

            {data[0].productQuantity <= 50 && data[0].productQuantity >= 1 && (
              <View className='px-3 py-1 bg-yellow-100 rounded-md w-fit'>
                <Text className='text-text-small text-yellow-600 font-semibold'>
                  Low on Stock
                </Text>
              </View>
            )}
            {data[0].productQuantity <= 0 && (
              <View className='px-3 py-1 bg-red-100 rounded-md w-fit'>
                <Text className='text-text-small text-red-600 font-semibold'>
                  Sold Out
                </Text>
              </View>
            )}
            {data[0].productQuantity >= 100 && (
              <View className='px-3 py-1 bg-green-100 rounded-md w-fit'>
                <Text className='text-text-small text-green-600 font-semibold'>
                  In Stock
                </Text>
              </View>
            )}
          </View>

          <View className='flex-row items-center justify-center gap-4 px-6'>
            <TouchableOpacity
              onPress={handleDelete}
              className='bg-red-500 px-6 py-3 rounded-md'
            >
              <Text className='text-white font-semibold'>Delete Product</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => deleteProduct(id)}
              className='bg-orange-400 px-6 py-3 rounded-md'
            >
              <Text className='text-white font-semibold'>Update Product</Text>
            </TouchableOpacity>
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
