import { ip } from '../../getIp.js'
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
  FlatList,
} from 'react-native'
import { useState, useEffect } from 'react'
import ProductList from '../components/ProductList.jsx'
import { useAuthContext } from '../../context/authContext.jsx'
import { useProductContext } from '@/context/productContext.jsx'

export default function ProductCategoriesScreen() {
  const categories = [
    { label: 'Remote Control', value: 'remote-control' },
    { label: 'Computers', value: 'computers' },
    { label: 'Smartphones', value: 'smartphones' },
    { label: 'Home Appliances', value: 'home-appliances' },
    { label: 'Fashion', value: 'fashion' },
    { label: 'Books', value: 'books' },
    { label: 'Toys', value: 'toys' },
    { label: 'Sports & Outdoors', value: 'sports-outdoors' },
    { label: 'Automotive', value: 'automotive' },
    { label: 'Beauty & Personal Care', value: 'beauty-personal-care' },
    { label: 'Groceries', value: 'groceries' },
    { label: 'Health & Wellness', value: 'health-wellness' },
    { label: 'Furniture', value: 'furniture' },
    { label: 'Music & Instruments', value: 'music-instruments' },
    { label: 'Movies & Entertainment', value: 'movies-entertainment' },
    { label: 'Food & Beverage', value: 'food-beverage' },
    { label: 'Baby & Kids', value: 'baby-kids' },
    { label: 'Office Supplies', value: 'office-supplies' },
  ]

  const renderItem = ({ item }) => (
    <TouchableOpacity className='flex-1 pb-0 px-7 py-10 bg-white'>
      <View>
        {/* <Image
        source={{ uri: `http://${ip}:5000/` + item.productImage }}
        className='h-[150px] object-cover'
      /> */}
        <Text>{item.label}</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <FlatList
      data={categories}
      renderItem={renderItem}
      keyExtractor={(item) => item.value}
      numColumns={2}
    />
  )
}
