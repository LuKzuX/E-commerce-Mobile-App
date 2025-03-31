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
  ])

  const [productDescription, setProductDescription] = useState('')
  const [productQuantity, setProductQuantity] = useState('')
  const { getData } = useProductContext()

  return (
    <View className='flex-1 p-10 bg-bg-gray'>
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
        <DropDownPicker
          placeholder='category'
          open={open}
          value={productCategoryValue}
          items={productCategory}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setProductCategory}
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
        <View className='flex-row items-center justify-between'>
          <Text
            onPress={async () => {
              await uploadData()
            }}
            className='py-3 px-6 bg-blue-400 self-start text-text-small-medium rounded-xl'
          >
            Select Image:
          </Text>
          {uri ? (
            <Image
              source={{ uri }}
              style={{ width: 90, height: 90, objectFit: 'cover' }}
            />
          ) : null}
        </View>
        <Text
          onPress={async () => {
            await handleUpload(
              `http://${ip}:5000/material-delivery/new-product`,
              productName,
              productPrice,
              productCategoryValue,
              productDescription,
              productQuantity
            ),
              setProductName('')
            setProductPrice('')
            setProductCategory([
              { label: 'Remote Control', value: 'remote-control' },
              { label: 'Computers', value: 'computers' },
              { label: 'Smartphones', value: 'smartphones' },
              { label: 'Home Appliances', value: 'home-appliances' },
              { label: 'Fashion', value: 'fashion' },
              { label: 'Books', value: 'books' },
              { label: 'Toys', value: 'toys' },
              { label: 'Sports & Outdoors', value: 'sports-outdoors' },
              { label: 'Automotive', value: 'automotive' },
              {
                label: 'Beauty & Personal Care',
                value: 'beauty-personal-care',
              },
              { label: 'Groceries', value: 'groceries' },
              { label: 'Health & Wellness', value: 'health-wellness' },
              { label: 'Furniture', value: 'furniture' },
              { label: 'Music & Instruments', value: 'music-instruments' },
              {
                label: 'Movies & Entertainment',
                value: 'movies-entertainment',
              },
              { label: 'Food & Beverage', value: 'food-beverage' },
              { label: 'Baby & Kids', value: 'baby-kids' },
              { label: 'Office Supplies', value: 'office-supplies' },
            ])
            setProductDescription('')
            setProductQuantity('')
            setUri('')
            getData()
          }}
          className='text-center self-center bg-bg-yellow py-6 px-12 text-text-medium rounded-xl'
        >
          Create Product
        </Text>
        <Text>{success}</Text>
      </View>
    </View>
  )
}
