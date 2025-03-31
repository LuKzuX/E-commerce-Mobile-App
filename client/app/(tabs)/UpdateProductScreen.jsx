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
import { useRoute, useNavigation } from '@react-navigation/native'
import axios from 'axios'

export default function UpdateProductScreen() {
  const route = useRoute()
  const { id } = route.params
  const { uploadData, handleUpload, success, uri, setUri } = useUploadData()
  const { user } = useAuthContext()
  const { getData } = useProductContext()
  const { updateProduct } = useUpdateProduct()

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

  useEffect(() => {
    const getProductData = async () => {
      try {
        const res = await axios.get(
          `http://${ip}:5000/material-delivery/${id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        )
        setProductName(res.data[0].productName)
        setProductPrice(String(res.data[0].productPrice))
        setValue(res.data[0].productCategory)
        setProductDescription(res.data[0].productDescription)
        setProductQuantity(String(res.data[0].productQuantity))
        setUri({ uri: `http://${ip}:5000/` + res.data[0].productImage })
      } catch (error) {
        console.log(error)
      }
    }
    getProductData()
  }, [])

  return (
    <View className='flex-1 p-10 bg-bg-gray'>
      <View className='bg-white flex flex-col gap-10 p-6 shadow-md'>
        <TextInput
          className='border-b text-text-small-medium'
          value={productName}
          onChangeText={(text) => setProductName(text)}
          placeholder='name'
          keyboardType='letter'
        />
        <TextInput
          className='border-b text-text-small-medium '
          value={productPrice}
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
          value={productDescription}
          onChangeText={(text) => setProductDescription(text)}
          placeholder='desc'
          keyboardType='letter'
        />
        <TextInput
          className='border-b text-text-small-medium'
          value={productQuantity}
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
              source={uri}
              style={{ width: 90, height: 90, objectFit: 'cover' }}
            />
          ) : null}
        </View>
        <Text
          onPress={async () => {
            try {
              await handleUpload(
                `http://${ip}:5000/material-delivery/${id}`,
                productName,
                productPrice,
                productCategoryValue,
                productDescription,
                productQuantity
              )
              getData()
              console.log('updated')
            } catch (error) {
              console.log(error)
            }
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
