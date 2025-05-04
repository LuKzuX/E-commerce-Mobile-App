import { ip } from '../../getIp.js'
import { useNavigation } from '@react-navigation/native'
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import { useInfiniteQuery } from 'react-query'
import { prettierPrice } from '../../utils/prettierPrice.js'
import useAddProductToCart from '../../utils/useAddProductToCart.js'
import { useAuthContext } from '@/context/authContext.jsx'
import { useState, useEffect } from 'react'
import useGetCartData from '../../utils/useGetCartData.js'

export default function ProductList({
  products,
  setData,
  getData,
  find,
  sortValue,
  category,
  minValue,
  maxValue,
}) {
  const navigation = useNavigation()
  const addProductToCart = useAddProductToCart()
  const { user } = useAuthContext()
  const [boughtProducts, setBoughtProducts] = useState([])
  const { cartData } = useGetCartData()

  useEffect(() => {
    if (!user || !user.user || !user.user.cart) {
      setBoughtProducts([])
      return
    }
    const userCart = cartData

    const productIds = userCart.map((item) => item._id.toString())
    setBoughtProducts(productIds)
  }, [user, cartData])

  const ThreeDots = ({ string }) => {
    if (string.length <= 17) {
      return <Text>{string}</Text>
    } else {
      let newStr = ''
      for (let i = 0; i < 17; i++) {
        newStr += string[i]
      }
      return <Text>{newStr + '...'}</Text>
    }
  }

  const { data, error, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['products', find, sortValue, category, minValue, maxValue],
    queryFn: ({ pageParam = 1 }) =>
      getData(pageParam, find, sortValue, category, minValue, maxValue),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 8 ? allPages.length + 1 : undefined
    },
  })
  const allProducts = data?.pages?.flat() || []

  const loadMoreData = () => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductDetails', { id: item._id })}
      className='flex w-1/2 px-7 py-10 bg-white'
    >
      <Image
        source={{ uri: `http://${ip}:5000/` + item.productImage }}
        className='h-[150px]'
        resizeMode='contain'
      />
      <View className='mt-[5px] flex-col justify-between'>
        <ThreeDots string={item.productName}></ThreeDots>
        <View className='flex-row items-center'>
          <Text className='text-sm mr-[1px]'>$</Text>
          <Text className='text-green-600 text-text-small font-semibold'>
            {prettierPrice(item.productPrice)}
          </Text>
        </View>
      </View>
      {boughtProducts.includes(item._id.toString()) && (
        <Text
          className='self-center text-text-small bg-bg-yellow py-[6px] px-[30px] rounded-xl mt-[10px]'
          disabled={true}
        >
          Added to Cart
        </Text>
      )}
      {boughtProducts.includes(item._id.toString()) == false && (
        <Text
          className='self-center text-text-small bg-bg-yellow py-[6px] px-[30px] rounded-xl mt-[10px]'
          onPress={async () => {
            try {
              setBoughtProducts((prev) => [...prev, item._id.toString()])
              await addProductToCart(item._id.toString())
            } catch (error) {
              setBoughtProducts((prev) =>
                prev.filter((id) => id !== item._id.toString())
              )
              console.log(error)
            }
          }}
        >
          Add to Cart
        </Text>
      )}
    </TouchableOpacity>
  )

  return (
    <FlatList
      data={allProducts}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      numColumns={2}
      onEndReached={loadMoreData}
      onEndReachedThreshold={0.5}
    />
  )
}
