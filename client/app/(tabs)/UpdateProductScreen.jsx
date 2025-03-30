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
} from 'react-native'
import { useState, useEffect } from 'react'
import useUpdateProduct from '../../utils/useUpdateProduct.js'
import { useProductContext } from '@/context/productContext.jsx'
import { useUploadData } from '@/utils/useUploadData.js'
import { useAuthContext } from '../../context/authContext.jsx'
import DropDownPicker from 'react-native-dropdown-picker'

export default function UpdateProductScreen() {
  const route = useRoute()
  const { id } = route.parans
  const { uploadData, handleUpload, success, uri, setUri } = useUploadData()
  const { user } = useAuthContext()
  const { getData } = useProductContext()

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

  const getProductData = async () => {
    try {
      const res = await axios.get(`http://${ip}:5000/material-delivery/`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      if (user) {
        setUsername(res.data.username)
        setEmail(res.data.email)
        setCountry(res.data.address.country)
        setState(res.data.address.state)
        setCity(res.data.address.city)
        setStreet(res.data.address.street)
        setAreaCode(res.data.address.areaCode)
      }
    } catch (error) {
      console.log('no user logged')
    }
  }

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
              getData()
          }}
          className='text-center self-center bg-bg-yellow py-6 px-12 text-text-medium rounded-xl'
        >
          Update Product
        </Text>
        <Text>{success}</Text>
      </View>
    </View>
  )
}
