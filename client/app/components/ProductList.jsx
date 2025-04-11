import { ip } from '../../getIp.js'
import { useNavigation } from '@react-navigation/native'
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native'

export default function ProductList({ data }) {
  const navigation = useNavigation()

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
          <Text className='text-green-600 text-text-small'>
            {item.productPrice}
          </Text>
        </View>
      </View>
      <Text
        className='self-center text-text-small bg-bg-yellow py-[6px] px-[30px] rounded-xl mt-[10px]'
        onPress={() => console.log(item.productName)}
      >
        Add to Cart
      </Text>
    </TouchableOpacity>
  )

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      numColumns={2}
    />
  )
}
