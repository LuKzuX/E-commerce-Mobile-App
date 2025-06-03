import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import { useCartContext } from '@/context/cartContext'
import GetProductQuantityInCart from '../components/ProductQuantityInCart'
import { ip } from '@/getIp'
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
    <View className='flex-row px-7 py-10 bg-white items-center justify-between border-b'>
      {/* Image */}
      <Image
        source={{ uri: `http://${ip}:5000/${item.image.replace(/\\/g, '/')}` }}
        className='h-[100px] w-[100px]'
        resizeMode='contain'
      />

      {/* Product info */}
      <View className='flex-1 ml-4'>
        <ThreeDots string={item.name} />
        <View>
          <View className='flex-row items-center mt-1'>
            <Text className='text-sm mr-[1px]'>$</Text>
            <Text className='text-green-600 text-text-small font-semibold'>
              {(parseFloat(item.totalPrice) || 0).toFixed(2)}
            </Text>
          </View>
          <View className='flex-row items-center mt-1'>
            <Text className='text-[10px] mr-[1px]'>$</Text>
            <Text className='text-green-600 text-sm font-semibold'>
              {item.price || 0}
            </Text>
          </View>
        </View>
      </View>

      {/* Buttons on the right */}
      <View className='items-end flex-row items-center gap-2'>
        <GetProductQuantityInCart
          getProductQuantity={() => getProductQuantityInCart(item.id)}
          increment={() => incrementQuantity(item.id)}
          decrement={() => decrementQuantity(item.id)}
        />
        <TouchableOpacity>
          <Ionicons
            onPress={() => {
              deleteProductFromCart(item.id, true)
              setBoughtProducts((prev) =>
                prev.filter((obj) => obj.id !== item.id)
              )
            }}
            name='trash-bin-outline'
            size={25}
            color={'red'}
          ></Ionicons>
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
    </View>
  )
}
