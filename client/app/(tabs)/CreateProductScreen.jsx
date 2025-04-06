import { useUploadData } from '../../utils/useUploadData.js'
import { ip } from '../../getIp.js'
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
import { useProductContext } from '@/context/productContext.jsx'

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
  const { getData } = useProductContext()

  return (
    <View className='flex-1 p-10 bg-bg-gray'>
      <View className='bg-white p-2 rounded-md'>
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
              onChangeText={(text) => setProductPrice(text)}
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
                className='py-3 px-6 bg-blue-400 self-start text-text-small rounded-xl'
              >
                Select Image:
              </Text>
              {uri ? (
                <Image
                  source={{ uri }}
                  style={{ width: 110, height: 110, objectFit: 'cover' }}
                />
              ) : null}
            </View>
            <Text
              onPress={async () => {
                try {
                  await handleUpload(
                    `http://${ip}:5000/material-delivery/new-product`,
                    'post',
                    productName,
                    productPrice,
                    productCategoryValue,
                    productDescription,
                    productQuantity
                  )
                  await getData()
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
                } catch (error) {}
              }}
              className='text-center self-center bg-bg-yellow py-4 px-12 text-text-small-medium rounded-xl'
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
