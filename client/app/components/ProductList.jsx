import { ip } from '../../getIp.js'
import { useNavigation } from '@react-navigation/native'
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import { useInfiniteQuery } from 'react-query'
import { prettierPrice } from '../../utils/prettierPrice.js'
import { useAuthContext } from '@/context/authContext.jsx'
import Ionicons from '@expo/vector-icons/Ionicons.js'
import { useCartContext } from '../../context/cartContext.jsx'

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
  const {
    addProductToCart,
    isProductInCart,
    getProductQuantityInCart,
    incrementQuantity,
    decrementQuantity,
    boughtProducts,
    setBoughtProducts,
  } = useCartContext()

  const { data, error, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['products', find, sortValue, category, minValue, maxValue],
    queryFn: ({ pageParam = 1 }) =>
      getData(pageParam, find, sortValue, category, minValue, maxValue),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 8 ? allPages.length + 1 : undefined
    },
  })
  const allProducts = data?.pages?.flat() || []

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

  const loadMoreData = () => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }

  const renderItem = ({ item }) => (
    <View className='flex w-1/2 px-7 py-10 bg-white'>
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductDetails', { id: item._id })}
      >
        <Image
          source={{ uri: `http://${ip}:5000/` + item.productImage }}
          className='h-[150px]'
          resizeMode='contain'
        />
        <View className='mt-[5px] flex-col justify-between'>
          <ThreeDots string={item.productName} />
          <View className='flex-row items-center'>
            <Text className='text-sm mr-[1px]'>$</Text>
            <Text className='text-green-600 text-text-small font-semibold'>
              {prettierPrice(item.productPrice)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      {isProductInCart(item._id.toString()) ? (
        <View className='flex-row items-center justify-center mt-2'>
          <TouchableOpacity
            onPress={() => decrementQuantity(item._id.toString())}
          >
            <Text className='text-text-medium'>-</Text>
          </TouchableOpacity>
          <Text className='mx-2 self-center text-text-small bg-bg-yellow py-[6px] px-[30px] rounded-xl'>
            {getProductQuantityInCart(item._id.toString())}
          </Text>
          <TouchableOpacity
            disabled={getProductQuantityInCart(item._id.toString()) >= 100}
            onPress={() => 
              incrementQuantity(item._id.toString())
            }
            style={{
              opacity:
                getProductQuantityInCart(item._id.toString()) >= 100 ? 0.5 : 1,
            }}
          >
            <Ionicons name='add-outline' size={24} />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          className='self-center mt-[10px]'
          onPress={() => {
            setBoughtProducts((prev) => [
              ...prev,
              { id: item._id.toString(), qnt: 1 },
            ])
            addProductToCart(item._id.toString())
            setBoughtProducts((prev) =>
              prev.filter((id) => id !== item._id.toString())
            )
          }}
        >
          <Text className='text-text-small bg-bg-yellow py-[6px] px-[30px] rounded-xl'>
            Add to Cart
          </Text>
        </TouchableOpacity>
      )}
    </View>
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
