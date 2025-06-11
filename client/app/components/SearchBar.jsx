import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  StatusBar,
} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useEffect, useState } from 'react'
import { useAuthContext } from '../../context/authContext'
import { useProductContext } from '../../context/productContext'
import { useNavigation } from '@react-navigation/native'
import { useCartContext } from '../../context/cartContext'
import { useRoute } from '@react-navigation/native'

export default function SearchBar() {
  const navigation = useNavigation()

  const { products, find, setFind, getProducts, category, displayCat } =
    useProductContext()
  const [search, setSearch] = useState('')
  const { allQuantity } = useCartContext()

  return (
    <View>
      <StatusBar backgroundColor='#2563eb' barStyle='light-content' />
      <SafeAreaView>
        <View className='flex-row items-center p-2 bg-blue-600 '>
          <Ionicons
            className='absolute left-[7%] z-50'
            name={'search-outline'}
            size={25}
            onPress={() => getProducts(1, find, '', '')}
          />
          <TextInput
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={async (e) => {
              setFind(e.nativeEvent.text)
              await getProducts(1, e.nativeEvent.text, '', '')
              navigation.navigate('Home')
            }}
            className='bg-white p-3 m-2 border text-text-small pl-12 rounded-[15px] flex-1'
            placeholder='Search'
          ></TextInput>
          <Ionicons
            className='w-[12%] text-center'
            color='white'
            name={'cart-outline'}
            size={30}
            onPress={() => navigation.navigate('Cart')}
          />

          {allQuantity >= 1 && (
            <Text className='absolute right-1 top-3 text-white bg-red-500 py-1 px-2 rounded-xl font-bold'>
              {allQuantity}
            </Text>
          )}
        </View>
      </SafeAreaView>
      {find && (
        <View className='mx-4 my-2 flex-row items-center justify-between rounded-2xl bg-blue-100 px-4 py-2 shadow-sm'>
          <Text className='text-sm font-medium text-blue-800'>{find}</Text>
          <TouchableOpacity
            onPress={() => {
              setFind('')
              setSearch('')
              getProducts(1, '', '', category)
            }}
            className='ml-3 rounded-full p-1 bg-blue-200'
          >
            <Ionicons size={20} name='close-outline' color='#1e3a8a' />
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}
