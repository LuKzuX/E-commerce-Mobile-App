import { View, Text, StyleSheet, Button, Image, TouchableOpacity, ScrollView, SafeAreaView, TextInput } from 'react-native'
import { useState, useEffect } from 'react'
import { useProductContext } from '@/context/productContext.jsx'
import { useUploadData } from '@/utils/useUploadData.js'
import { useAuthContext } from '../../context/authContext.jsx'
import DropDownPicker from 'react-native-dropdown-picker'
import { useRoute, useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { useQueryClient } from 'react-query'
import useGetProductDetails from '@/utils/useGetProductDetails.js'
import { getApiUrl } from '../../config.js'

export default function UpdateProductScreen() {
  const route = useRoute()
  const { id } = route.params
  const navigation = useNavigation()

  const { uploadData, handleUpload, success, uri, setUri } = useUploadData()
  const { user } = useAuthContext()

  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [open, setOpen] = useState(false)
  const [productCategoryValue, setValue] = useState(null)
  const [productCategory, setProductCategory] = useState([
    { label: 'Computers', value: 'computers' },
    { label: 'Smartphones', value: 'smartphones' },
    { label: 'Home Appliances', value: 'home-appliances' },
    { label: 'Toys', value: 'toys' },
    { label: 'Automotive', value: 'automotive' },
    { label: 'Furniture', value: 'furniture' },
    { label: 'Food & Beverage', value: 'food-beverage' },
    { label: 'Office Supplies', value: 'office-supplies' },
  ])
  const [productDescription, setProductDescription] = useState('')
  const [productQuantity, setProductQuantity] = useState('')
  const queryClient = useQueryClient()
  const { refetch } = useGetProductDetails(id)

  const currency = (input) => {
    let cleaned = ''
    for (let i = 0; i < input.length; i++) {
      if (!isNaN(input[i]) && input[i] !== ' ') {
        cleaned += input[i]
      }
    }
    let result = ''
    let count = 0
    for (let i = cleaned.length - 1; i >= 0; i--) {
      result = cleaned[i] + result
      count += 1
      if (count % 5 == 0 && i !== 0) {
        result = '.' + result
      }
      if (count == 2) {
        result = '.' + result
      }
    }
    return result
  }

  const convertBackToInt = (input) => {
    let result = ''
    for (let i = 0; i < input.length; i++) {
      if (input[i] == '.' && i >= input.length - 3) {
        result += input[i]
      }
      if (input[i] !== '.') {
        result += input[i]
      }
    }
    return parseFloat(result)
  }

  useEffect(() => {
    const getProductData = async () => {
      try {
        const res = await axios.get(
          `${getApiUrl()}/material-delivery/${id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        )
        setProductName(res.data[0].productName)
        setProductPrice(res.data[0].productPrice)
        setProductDescription(res.data[0].productDescription)
        setProductQuantity(res.data[0].productQuantity)
        setUri(`http://${getApiUrl()}/` + res.data[0].productImage)
      } catch (error) {
        console.log(error)
      }
    }
    getProductData()
  }, [])

  return (
    <View className='flex-1 p-10 bg-bg-gray'>
      <View className='bg-white p-2 rounded-2xl'>
        <DropDownPicker
          placeholder='category'
          open={open}
          value={productCategoryValue}
          items={productCategory}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setProductCategory}
        />
        <ScrollView>
          <View className='bg-white flex flex-col gap-10 p-6 shadow-md'>
            <TextInput
              className='border-b text-text-small'
              value={productName}
              onChangeText={(text) => setProductName(text)}
              placeholder='name'
              keyboardType='letter'
            />
            <TextInput
              className='border-b text-text-small '
              value={currency(productPrice)}
              onChangeText={(text) => setProductPrice(currency(text))}
              placeholder='price'
              keyboardType='numeric'
            />
            <TextInput
              className='border-b text-text-small'
              value={productDescription}
              onChangeText={(text) => setProductDescription(text)}
              placeholder='desc'
              keyboardType='letter'
              multiline
            />
            <TextInput
              className='border-b text-text-small'
              value={productQuantity}
              onChangeText={(text) => setProductQuantity(text)}
              placeholder='quantity'
              keyboardType='numeric'
            />
            <View className='flex-row items-center justify-between'>
              <Text
                onPress={async () => {
                  await uploadData()
                  if (response) {
                    await refetch() // Refetch the updated product details
                    queryClient.invalidateQueries(['products'])
                    navigation.navigate('ProductDetails', { id })
                  }
                }}
                className='py-3 px-6 bg-blue-400 self-start text-text-small rounded-xl font-semibold'
              >
                Select Image:
              </Text>
              {uri && (
                <Image
                  source={uri ? { uri } : { uri }}
                  style={{ width: 110, height: 110, objectFit: 'contain' }}
                />
              )}
            </View>
            <TouchableOpacity
              onPress={async () => {
                try {
                  const response = await handleUpload(
                    `${getApiUrl()}/material-delivery/${id}`,
                    'patch',
                    productName,
                    convertBackToInt(currency(productPrice)),
                    productCategoryValue,
                    productDescription,
                    productQuantity
                  )
                  if (response) {
                    queryClient.invalidateQueries(['products'])
                    navigation.navigate('ProductDetails', { id })
                  }
                } catch (error) {
                  console.log(error)
                }
              }}
            >
              <Text className='text-center self-center bg-bg-yellow py-4 px-12 text-text-small-medium rounded-xl font-bold'>
                Update Product
              </Text>
            </TouchableOpacity>
            <Text>{success}</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  )
}
