import axios from 'axios'
import { useState, useEffect } from 'react'
import { Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import useGetProductDetails from '../../utils/useGetProductDetails'
import useDeleteProduct from '../../utils/useDeleteProduct'
import { useProductContext } from '@/context/productContext'
import { useAuthContext } from '@/context/authContext'
import { ip } from '../../getIp'
import { useNavigation, useRoute } from '@react-navigation/native'
import SearchBar from '../components/SearchBar'
import { prettierPrice } from '@/utils/prettierPrice'

export default function ProductDetails() {
  const { user } = useAuthContext()
  const route = useRoute()
  const { id } = route.params
  const { data, setData } = useGetProductDetails(id)
  const deleteProduct = useDeleteProduct()
  const navigation = useNavigation()
  const { getData } = useProductContext()
  const categories = [
    { label: 'Computers', value: 'computers' },
    { label: 'Smartphones', value: 'smartphones' },
    { label: 'Home Appliances', value: 'home-appliances' },
    { label: 'Toys', value: 'toys' },
    { label: 'Automotive', value: 'automotive' },
    { label: 'Furniture', value: 'furniture' },
    { label: 'Food & Beverage', value: 'food-beverage' },
    { label: 'Office Supplies', value: 'office-supplies' },
  ]

  const Cat = () => {
    if (!data) {
      return <Text>Loading...</Text>
    }

    const category = categories.find(
      (item) => item.value === data[0].productCategory
    )

    return (
      <View>
        <Text>{category?.label || 'Unknown Category'}</Text>
      </View>
    )
  }

  useEffect(() => {
    setData([])
  }, [id])

  return (
    <ScrollView className='bg-bg-gray'>
      <SearchBar></SearchBar>
      {data[0] && (
        <View className='flex flex-col gap-6 p-6 bg-white rounded-lg'>
          {/* Product Image */}
          <View>
            <Image
              source={{ uri: `http://${ip}:5000/` + data[0].productImage }}
              className='w-full h-[250px] rounded-md'
              resizeMode='contain'
            />
          </View>

          <View className='flex-col gap-4 p-4 bg-white rounded-lg shadow-md'>
            {/* Product Title and Price */}
            <View className='flex-row justify-between items-center'>
              <Text className='text-text-small-medium font-bold text-gray-900 w-[70%]'>
                {data[0].productName}
              </Text>
              <View className='flex-row items-center'>
                <Text className='text-sm mr-[1px]'>$</Text>
                <Text className='text-text-small-medium font-semibold text-green-600'>
                  {prettierPrice(data[0].productPrice)}
                </Text>
              </View>
            </View>
            <View className='h-[1px] bg-gray-300'></View>

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
                <Cat></Cat>
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

          {user?.user.isAdmin && (
            <View className='flex-row items-center justify-center gap-4 px-6'>
              <Text
                onPress={async () => {
                  await deleteProduct(id)
                  await getData()
                }}
                className='bg-bg-red px-6 py-3 rounded-md text-white font-semibold'
              >
                Delete Product
              </Text>
              <Text
                onPress={() => navigation.navigate('UpdateProduct', { id })}
                className='bg-orange-400 px-6 py-3 rounded-md text-white font-semibold'
              >
                Update Product
              </Text>
            </View>
          )}
          <View className='mt-6 space-y-3'>
            <TouchableOpacity className='bg-bg-yellow p-4 rounded-lg items-center shadow-md'>
              <Text className='text-lg font-bold text-text-dark'>
                Add to Cart
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  )
}
