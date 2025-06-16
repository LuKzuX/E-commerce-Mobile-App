import { useEffect } from 'react'
import { Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import useGetProductDetails from '../../utils/useGetProductDetails'
import useDeleteProduct from '../../utils/useDeleteProduct'
import { useProductContext } from '../../context/productContext'
import { useAuthContext } from '@/context/authContext'
import { useNavigation, useRoute } from '@react-navigation/native'
import SearchBar from '../components/SearchBar'
import { useCartContext } from '../../context/cartContext.jsx'
import GetProductQuantityInCart from '../components/ProductQuantityInCart.jsx'
import { formatedPrice } from '../../utils/formatedPrice.js'
import { getApiUrl } from '../../config'

export default function ProductDetails() {
  const { user } = useAuthContext()
  const route = useRoute()
  const { id } = route.params
  const deleteProduct = useDeleteProduct()
  const navigation = useNavigation()
  const { getProducts, products, setProducts } = useProductContext()
  const { data, setData } = useGetProductDetails(id)
  const categories = [
    { label: 'Computers', value: 'computers' },
    { label: 'Smartphones', value: 'smartphones' },
    { label: 'Home Appliances', value: 'home-appliances' },
    { label: 'Toys', value: 'toys' },
    { label: 'Automotive', value: 'automotive' },
    { label: 'Furniture', value: 'furniture' },
    { label: 'Food & Beverage', value: 'food-beverage' },
    { label: 'Office Supplies', value: 'office-supplies' },
  ]
  const {
    addProductToCart,
    isProductInCart,
    getProductQuantityInCart,
    incrementQuantity,
    decrementQuantity,
    boughtProducts,
    setBoughtProducts,
  } = useCartContext()

  const Cat = () => {
    if (!data) {
      return <Text>Loading...</Text>
    }

    const category = categories.find(
      (item) => item.value === data[0].productCategory
    )

    return (
      <View>
        <Text>{category?.label || 'Unknown Category'}</Text>
      </View>
    )
  }

  const updateProductList = (id) => {
    const newList = products.filter((obj) => obj._id !== id)
    setProducts(newList)
  }

  return (
    <ScrollView className='bg-bg-gray'>
      <SearchBar></SearchBar>
      {data[0] && (
        <View className='flex flex-col gap-6 p-6 bg-white rounded-lg'>
          {/* Product Image */}
          <View>
            <Image
              source={{
              uri: `https://pub-e0192fb33eb54d89be185d36bda72b76.r2.dev/${
                data[0].productImage.split('/')[3]
              }`,
            }}
              className='w-full h-[300px]'
              resizeMode='contain'
            />
          </View>

          <View className='flex-col gap-4 p-4 bg-white rounded-lg shadow-md'>
            <View className='flex-row justify-between items-center'>
              <Text className='text-text-small-medium font-bold text-gray-900 w-[70%]'>
                {data[0].productName}
              </Text>
              <View className='flex-row items-center'>
                <Text className='text-sm mr-[1px]'>$</Text>
                <Text className='text-text-small-medium font-semibold text-green-600'>
                  {formatedPrice(String(data[0].productPrice.$numberDecimal))}
                </Text>
              </View>
            </View>
            <View className='h-[1px] bg-gray-300'></View>

            {/* Product Description */}
            <Text className='text-text-small text-gray-600'>
              {data[0].productDescription}
            </Text>

            {/* Product Category */}
            <View className='flex-row items-center'>
              <Text className='text-text-small text-gray-500 font-semibold'>
                Category:{' '}
              </Text>
              <Text className='text-text-small text-gray-700'>
                <Cat></Cat>
              </Text>
            </View>

            {data[0].productQuantity <= 50 && data[0].productQuantity >= 1 && (
              <View className='px-3 py-1 bg-yellow-100 rounded-md w-fit'>
                <Text className='text-text-small text-yellow-600 font-semibold'>
                  Low on Stock
                </Text>
              </View>
            )}
            {data[0].productQuantity <= 0 && (
              <View className='px-3 py-1 bg-red-100 rounded-md w-fit'>
                <Text className='text-text-small text-red-600 font-semibold'>
                  Sold Out
                </Text>
              </View>
            )}
            {data[0].productQuantity >= 100 && (
              <View className='px-3 py-1 bg-green-100 rounded-md w-fit'>
                <Text className='text-text-small text-green-600 font-semibold'>
                  In Stock
                </Text>
              </View>
            )}
          </View>

          {user?.user.isAdmin && (
            <View className='flex-row items-center justify-center gap-4 px-6'>
              <TouchableOpacity
                onPress={async () => {
                  await deleteProduct(id)
                  updateProductList(id)
                  navigation.navigate('Home')
                }}
              >
                <Text className='bg-bg-red px-6 py-3 rounded-md text-white font-semibold'>
                  Delete Product
                </Text>
              </TouchableOpacity>
              <Text
                onPress={() => {
                  navigation.navigate('UpdateProduct', { id: id })
                }}
                className='bg-orange-400 px-6 py-3 rounded-md text-white font-semibold'
              >
                Update Product
              </Text>
            </View>
          )}
          <View className='mt-6 space-y-3'>
            {isProductInCart(data[0]._id.toString()) ? (
              <View className='flex-row items-center justify-center mt-2'>
                <GetProductQuantityInCart
                  getProductQuantity={() =>
                    getProductQuantityInCart(data[0]._id.toString())
                  }
                  increment={() => incrementQuantity(data[0]._id.toString())}
                  decrement={() => decrementQuantity(data[0]._id.toString())}
                />
              </View>
            ) : (
              <TouchableOpacity
                className='self-center mt-[10px]'
                onPress={() => {
                  setBoughtProducts((prev) => {
                    const existing = prev.find((obj) => obj.id === data[0]._id)
                    if (existing) {
                      // Increase quantity and totalPrice
                      return prev.map((obj) =>
                        obj.id === data[0]._id
                          ? {
                              ...obj,
                              qnt: obj.qnt + 1,
                              totalPrice: (obj.qnt + 1) * obj.price,
                            }
                          : obj
                      )
                    } else {
                      // Add new product
                      return [
                        ...prev,
                        {
                          id: data[0]._id,
                          qnt: 1,
                          name: data[0].productName,
                          price: data[0].productPrice,
                          image: data[0].productImage,
                          totalPrice: data[0].productPrice,
                        },
                      ]
                    }
                  })
                  addProductToCart(data[0]._id.toString())
                }}
              >
                <Text className='text-text-small bg-bg-yellow py-[6px] px-[30px] rounded-xl'>
                  Add to Cart
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </ScrollView>
  )
}
