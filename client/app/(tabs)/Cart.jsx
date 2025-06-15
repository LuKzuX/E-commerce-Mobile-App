import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import { useCartContext } from '@/context/cartContext'
import GetProductQuantityInCart from '../components/ProductQuantityInCart'
import { getApiUrl } from '@/config'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function Cart() {
  const {
    boughtProducts,
    setBoughtProducts,
    deleteProductFromCart,
    incrementQuantity,
    decrementQuantity,
    getProductQuantityInCart,
  } = useCartContext()

  let a = 0
  for (let i = 0; i < boughtProducts.length; i++) {
    a += boughtProducts[i].totalPrice
  }

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
  const renderItem = ({ item }) => (
    <View className='flex-row items-center justify-between px-4 py-5 bg-white border-b border-gray-200 space-x-3'>
      {/* Product Image */}
      <Image
        source={{ 
          uri: item.image.startsWith('http') 
            ? item.image 
            : `${getApiUrl()}/${item.image.replace(/\\/g, '/')}`
        }}
        className='w-[100px] h-[100px]'
        resizeMode='contain'
      />

      {/* Product Info */}
      <View className='flex-1'>
        <ThreeDots string={item.name} />

        <View className='mt-2 space-y-[4px]'>
          {/* Total Price */}
          <View className='flex-row items-center'>
            <Text className='text-[11px] text-gray-500 mr-[2px]'>$</Text>
            <Text className='text-green-600 text-[15px] font-bold'>
              {(parseFloat(item.totalPrice) || 0).toFixed(2)}
            </Text>
            <Text className='ml-1 text-[10px] text-gray-400'>Total</Text>
          </View>

          {/* Unit Price */}
          <View className='flex-row items-center'>
            <Text className='text-[10px] text-gray-500 mr-[2px]'>$</Text>
            <Text className='text-green-500 text-[13px] font-semibold'>
              {item.price || 0}
            </Text>
            <Text className='ml-1 text-[10px] text-gray-400'>Unit</Text>
          </View>
        </View>
      </View>

      {/* Quantity + Delete */}
      <View className='items-center justify-between h-[80px] space-y-2'>
        <GetProductQuantityInCart
          getProductQuantity={() => getProductQuantityInCart(item.id)}
          increment={() => incrementQuantity(item.id)}
          decrement={() => decrementQuantity(item.id)}
        />
        <TouchableOpacity
          onPress={() => {
            deleteProductFromCart(item.id, true)
            setBoughtProducts((prev) =>
              prev.filter((obj) => obj.id !== item.id)
            )
          }}
        >
          <Ionicons name='trash-bin-outline' size={22} color='red' />
        </TouchableOpacity>
      </View>
    </View>
  )

  return (
    <View className='flex-1'>
      {boughtProducts.length === 0 ? (
        <View className='flex-1 items-center justify-center'>
          <Text className='text-gray-500 text-lg'>Your cart is empty</Text>
        </View>
      ) : (
        <FlatList
          data={boughtProducts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={1}
        />
      )}
      <View className='bg-white px-6 py-4 rounded-xl shadow-md my-4'>
        <Text className='text-lg font-semibold text-gray-800'>Total: ${a}</Text>
      </View>
    </View>
  )
}
