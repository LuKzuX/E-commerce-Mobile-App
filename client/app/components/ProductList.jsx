import { useNavigation } from '@react-navigation/native'
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import { useInfiniteQuery, useQueryClient } from 'react-query'
import { useAuthContext } from '../../context/authContext'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useCartContext } from '../../context/cartContext'
import GetProductQuantityInCart from './ProductQuantityInCart'
import { formatedPrice } from '../../utils/formatedPrice'
import { useEffect } from 'react'
import { getApiUrl } from '../../config'

export default function ProductList({
  products,
  getProducts,
  find,
  sortValue,
  category,
  minValue,
  maxValue,
}) {
  const navigation = useNavigation()
  const {
    addProductToCart,
    isProductInCart,
    getProductQuantityInCart,
    incrementQuantity,
    decrementQuantity,
    boughtProducts,
    setBoughtProducts,
  } = useCartContext()
  const queryClient = useQueryClient()

  const { data, error, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['products', find, sortValue, category, minValue, maxValue],
    queryFn: ({ pageParam = 1 }) =>
      getProducts(
        sortValue,
        find,
        pageParam,
        category,
        minValue !== undefined ? minValue : '',
        maxValue !== undefined ? maxValue : ''
      ),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || !Array.isArray(lastPage)) return undefined
      return lastPage.length === 8 ? allPages.length + 1 : undefined
    },
    staleTime: Infinity,
    cacheTime: Infinity,
  })

  const allProducts = data?.pages?.flat() || products

  const ThreeDots = ({ string }) => {
    if (!string) return null
    if (string.length <= 17) {
      return <Text  className='font-semibold text-text-small-medium'>{string}</Text>
    } else {
      let newStr = ''
      for (let i = 0; i < 17; i++) {
        newStr += string[i]
      }
      return <Text  className='font-semibold text-text-small-medium'>{newStr + '...'}</Text>
    }
  }

  const loadMoreData = () => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }

  const renderItem = ({ item }) => {
    if (!item || !item._id) return null

    return (
      <View className='flex w-1/2 px-7 py-10 bg-white'>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ProductDetails', { id: item._id })
          }
        >
          <Image
            source={{
              uri: `https://pub-e0192fb33eb54d89be185d36bda72b76.r2.dev/${
                item.productImage.split('/')[3]
              }`,
            }}
            className='h-[150px]'
            resizeMode='contain'
          />
          <View className='mt-[5px] flex-col justify-between'>
            <ThreeDots string={item.productName} />
            <View className='flex-row items-center'>
              <Text className='text-sm mr-[1px]'>$</Text>
              <Text className='text-green-600 text-text-small font-semibold'>
                {formatedPrice(String(item.productPrice.$numberDecimal))}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {isProductInCart(item._id.toString()) ? (
          <View className='flex-row items-center justify-center mt-2'>
            <GetProductQuantityInCart
              getProductQuantity={() =>
                getProductQuantityInCart(item._id.toString())
              }
              increment={() => incrementQuantity(item._id.toString())}
              decrement={() => decrementQuantity(item._id.toString())}
            />
          </View>
        ) : (
          <TouchableOpacity
            className='self-center mt-[10px]'
            onPress={() => {
              setBoughtProducts((prev) => {
                const existing = prev.find((obj) => obj.id === item._id)
                if (existing) {
                  return prev.map((obj) =>
                    obj.id === item._id
                      ? {
                          ...obj,
                          qnt: obj.qnt + 1,
                          totalPrice: (obj.qnt + 1) * obj.price,
                        }
                      : obj
                  )
                } else {
                  return [
                    ...prev,
                    {
                      id: item._id,
                      qnt: 1,
                      name: item.productName,
                      price: item.productPrice?.$numberDecimal,
                      image: item.productImage,
                      totalPrice: item.productPrice,
                    },
                  ]
                }
              })
              addProductToCart(item._id.toString())
            }}
          >
            <Text className='text-text-small bg-bg-yellow py-[6px] px-[30px] rounded-xl'>
              Add to Cart
            </Text>
          </TouchableOpacity>
        )}
      </View>
    )
  }

  return (
    <FlatList
      data={allProducts}
      renderItem={renderItem}
      keyExtractor={(item) => item?._id?.toString() || Math.random().toString()}
      numColumns={2}
      onEndReached={loadMoreData}
      onEndReachedThreshold={0.5}
    />
  )
}
