import {useUploadData} from "@/utils/uploadData.js"
import { ip } from '../../getIp.js'
import { View, Text, ScrollView, StyleSheet, Button, Image, TextInput } from 'react-native'
import { useState, useEffect } from 'react'


export default function CreateProductScreen() {
  const {uploadData, handleUpload, success, uri} = useUploadData()
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productCategory, setProductCategory] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [productQuantity, setProductQuantity] = useState('')

  return (
    <ScrollView className='flex-1 p-10 bg-bg-gray'>
      <View className='bg-white flex flex-col gap-10 p-6 shadow-md'>
        <TextInput
          className='border-b text-text-small-medium'
          onChangeText={(text) => setProductName(text)}
          placeholder='name'
          keyboardType='letter'
        />
        <TextInput
          className='border-b text-text-small-medium '
          onChangeText={(text) => setProductPrice(text)}
          placeholder='price'
          keyboardType='numeric'
        />
        <TextInput
          className='border-b text-text-small-medium'
          onChangeText={(text) => setProductCategory(text)}
          placeholder='category'
          keyboardType='letter'
        />
        <TextInput
          className='border-b text-text-small-medium'
          onChangeText={(text) => setProductDescription(text)}
          placeholder='desc'
          keyboardType='letter'
        />
        <TextInput
          className='border-b text-text-small-medium'
          onChangeText={(text) => setProductQuantity(text)}
          placeholder='quantity'
          keyboardType='numeric'
        />
        <Text
          onPress={async () => {
            await uploadData()
          }}
          className='py-3 px-6 bg-blue-400 self-start text-text-small-medium rounded-xl'
        >
          Select Image:
        </Text>
        {uri ? (
          <Image source={{ uri }} style={{ width: "100%", height: 150, objectFit: 'contain' }} />
        ) : null}
        <Text
          onPress={async () => {
            await handleUpload(
              `http://${ip}:5000/material-delivery/new-product`,
              productName,
              productPrice,
              productCategory,
              productDescription,
              productQuantity,
            )
          }}
          className='text-center self-center bg-bg-yellow py-6 px-12 text-text-medium rounded-xl'
        >
          Create Product
        </Text>
        <Text>{success}</Text>
      </View>
    </ScrollView>
  )
}
