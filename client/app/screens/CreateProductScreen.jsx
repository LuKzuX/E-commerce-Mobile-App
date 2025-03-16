import { uploadData } from '../../utils/uploadData.js'
import { ip } from '../../getIp.js'
import { View, Text, StyleSheet, Button, Image, TextInput } from 'react-native'
import { useState, useEffect } from 'react'

export default function CreateProductScreen() {
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productCategory, setProductCategory] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [productQuantity, setProductQuantity] = useState('')

  return (
    <View className='flex-1 p-10 bg-bg-color '>
      <View className='bg-white flex gap-10'>
        <TextInput
          className=''
          onChangeText={(text) => setProductName(text)}
          placeholder='name'
          keyboardType='letter'
        />
        <TextInput
          className=''
          onChangeText={(text) => setProductPrice(text)}
          placeholder='price'
          keyboardType='numeric'
        />
        <TextInput
          className=''
          onChangeText={(text) => setProductCategory(text)}
          placeholder='category'
          keyboardType='letter'
        />
        <TextInput
          className=''
          onChangeText={(text) => setProductDescription(text)}
          placeholder='desc'
          keyboardType='letter'
        />
        <TextInput
          className=''
          onChangeText={(text) => setProductQuantity(text)}
          placeholder='quantity'
          keyboardType='numeric'
        />
        <Text
          onPress={async () => {
            await uploadData(
              `http://${ip}:5000/material-delivery/new-product`,
              productName,
              productPrice,
              productCategory,
              productDescription,
              productQuantity
            )
            getData()
          }}
        >
          Select Image:
        </Text>
        <Text className='bg-yellow-500'>Create Product</Text>
      </View>
    </View>
  )
}
