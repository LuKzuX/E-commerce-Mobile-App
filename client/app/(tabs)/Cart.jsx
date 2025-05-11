import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import { useCartContext } from '@/context/cartContext'
import GetProductQuantityInCart from '../components/ProductQuantityInCart'
import { ip } from '@/getIp'
import { prettierPrice } from '@/utils/prettierPrice'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function Cart() {
  const {
    boughtProducts,
    setBoughtProducts,
    incrementQuantity,
    decrementQuantity,
    getProductQuantityInCart,
    isProductInCart,
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
        <View className='flex-row items-center mt-1'>
          <Text className='text-sm mr-[1px]'>$</Text>
          <Text className='text-green-600 text-text-small font-semibold'>
            {prettierPrice(item.totalPrice || 0)}
          </Text>
        </View>
      </View>

      {/* Buttons on the right */}
      <View className='items-end flex-row items-center gap-2'>
        {isProductInCart(item.id) ? (
          <GetProductQuantityInCart
            getProductQuantity={() => getProductQuantityInCart(item.id)}
            increment={() => incrementQuantity(item.id)}
            decrement={() => decrementQuantity(item.id)}
          />
        ) : (
          <TouchableOpacity
            onPress={() => {
              setBoughtProducts((prev) => [
                ...prev,
                {
                  id: item.id,
                  qnt: 1,
                  name: item.name,
                  price: item.price,
                  image: item.image,
                },
              ])
              addProductToCart(item.id)
            }}
          >
            <Text className='text-text-small bg-bg-yellow py-[6px] px-[15px] rounded-xl'>
              Add
            </Text>
          </TouchableOpacity>
        )}
        <Ionicons name='trash-bin-outline' size={25} color={'red'}></Ionicons>
      </View>
    </View>
  )

  return (
    <View>
      {!boughtProducts && (
        <View>
          <Text>Cart empty</Text>
        </View>
      )}
      {boughtProducts && (
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
