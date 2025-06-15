import { useUploadData } from '../../utils/useUploadData.js'
import { getApiUrl } from '../../config.js'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Button,
  Image,
  TextInput,
} from 'react-native'
import { useState, useEffect } from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import { useProductContext } from '../../context/productContext'
import { useQueryClient } from 'react-query'

export default function CreateProductScreen() {
  const { uploadData, handleUpload, success, uri, setUri } = useUploadData()
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
  const { getProducts } = useProductContext()
  const queryClient = useQueryClient()

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
          <View className='bg-white flex flex-col gap-10 py-6 px-4 shadow-md'>
            <TextInput
              className='border-b text-text-small'
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
              onChangeText={(text) => setProductDescription(text)}
              placeholder='desc'
              keyboardType='letter'
              multiline
            />
            <TextInput
              className='border-b text-text-small'
              onChangeText={(text) => setProductQuantity(text)}
              placeholder='quantity'
              keyboardType='numeric'
            />
            <View className='flex-row items-center justify-between'>
              <Text
                onPress={async () => {
                  await uploadData()
                }}
                className='py-3 px-6 bg-blue-400 self-start text-text-small rounded-xl text-white font-semibold'
              >
                Select Image:
              </Text>
              {uri ? (
                <Image
                  source={{ uri: uri ? uri : null }}
                  className='w-full h-[200px]'
                  resizeMode='contain'
                />
              ) : null}
            </View>
            <Text
              onPress={async () => {
                try {
                  await handleUpload(
                    `${getApiUrl()}/new-product`,
                    'post',
                    productName,
                    convertBackToInt(currency(productPrice)),
                    productCategoryValue,
                    productDescription,
                    Number(productQuantity)
                  )
                  queryClient.invalidateQueries(['products'])
                  setProductName('')
                  setProductPrice('')
                  setProductCategory([
                    { label: 'Computers', value: 'computers' },
                    { label: 'Smartphones', value: 'smartphones' },
                    { label: 'Home Appliances', value: 'home-appliances' },
                    { label: 'Toys', value: 'toys' },
                    { label: 'Automotive', value: 'automotive' },
                    { label: 'Furniture', value: 'furniture' },
                    { label: 'Food & Beverage', value: 'food-beverage' },
                    { label: 'Office Supplies', value: 'office-supplies' },
                  ])
                  setProductDescription('')
                  setProductQuantity('')
                  setUri('')
                } catch (error) {
                  console.log(error)
                }
              }}
              className='text-center self-center bg-bg-yellow py-4 px-12 text-text-small-medium rounded-xl font-bold'
            >
              Create Product
            </Text>
            <Text>{success}</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  )
}
