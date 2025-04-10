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

import { useAuthContext } from '../../context/authContext'

export default function SearchBar() {
  const { user } = useAuthContext()
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
            onKeyPress={(e) => {
              if (e.nativeEvent.key === 'Enter') {
                getData(pageValue, searchValue, sortValue, category)
              }
            }}
            onChangeText={(text) => {
              setSearchValue(text)
            }}
            className='bg-white p-3 m-2 border text-text-small pl-12 rounded-[15px] flex-1'
            placeholder='Search'
          ></TextInput>
          <Ionicons
            className='w-[12%] text-center'
            color='white'
            name={'cart-outline'}
            size={30}
            onPress={() => getData(pageValue, searchValue, sortValue, category)}
          />
        </View>
      </SafeAreaView>
    </View>
  )
}
