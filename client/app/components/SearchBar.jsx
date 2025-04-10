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
import { useState } from 'react'
import { useAuthContext } from '../../context/authContext'
import { useProductContext } from '@/context/productContext'
import { useNavigation } from '@react-navigation/native'

export default function SearchBar() {
  const navigation = useNavigation()
  const [searchValue, setSearchValue] = useState('')
  const { user } = useAuthContext()
  const { products, getData, category, displayCat } = useProductContext()
  return (
    <View>
      <StatusBar backgroundColor='#2563eb' barStyle='light-content' />
      <SafeAreaView>
        <View className='flex-row items-center p-2 bg-blue-600 '>
          <Ionicons
            className='absolute left-[7%] z-50'
            name={'search-outline'}
            size={25}
            onPress={() => getData(pageValue, searchValue, sortValue, category)}
          />
          <TextInput
            onSubmitEditing={(e) => {
              navigation.navigate('Home')
              getData(1, searchValue, '', '')
              setSearchValue(e.nativeEvent.text)
            }}
            className='bg-white p-3 m-2 border text-text-small pl-12 rounded-[15px] flex-1'
            placeholder='Search'
          ></TextInput>
          <Ionicons
            className='w-[12%] text-center'
            color='white'
            name={'cart-outline'}
            size={30}
            onPress={() => {
              getData(pageValue, searchValue, sortValue, category)
            }}
          />
        </View>
      </SafeAreaView>
      {searchValue && (
        <View>
          <Text>{searchValue}</Text>
        </View>
      )}
    </View>
  )
}
