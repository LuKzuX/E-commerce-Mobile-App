import { View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AntDesign from '@expo/vector-icons/AntDesign'
import Feather from '@expo/vector-icons/Feather'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useRoute } from '@react-navigation/native'

export default function Navbar() {
  const navigation = useNavigation()
  const route = useRoute()

  return (
    <View>
      <View className='flex flex-row justify-evenly bg-white pb-1'>
        <View className='w-[40px] flex flex-col items-center'>
          {route.name == '/' && (
            <View className='w-full h-[2px] bg-black mb-[2px]'></View>
          )}
          <AntDesign name='home' size={30} color='black' />
          <Text>Home</Text>
        </View>

        <View className='w-[40px] flex flex-col items-center'>
          {route.name == '/' && (
            <View className='w-full h-[2px] bg-black mb-[2px]'></View>
          )}
          <Ionicons name='cart-outline' size={30} color='black' />
          <Text>Cart</Text>
        </View>
        <View className='w-[40px] flex flex-col items-center'>
          <View
            className={`${
              route.name === 'User' ? 'bg-white' : 'bg-black'
            }w-full h-[2px] mb-[2px]`}
          ></View>
          <Feather onPress={() => navigation.navigate("User")} name='user' size={30} color='black' />
          <Text>You</Text>
        </View>
      </View>
    </View>
  )
}
