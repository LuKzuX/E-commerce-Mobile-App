import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useProductContext } from '@/context/productContext'
import car from '../../assets/images/car.webp'
import computer from '../../assets/images/computer.webp'
import smartphone from '../../assets/images/smartphone.webp'
import fridge from '../../assets/images/fridge.jpg'
import toy from '../../assets/images/toy.webp'
import furniture from '../../assets/images/furniture.webp'
import food from '../../assets/images/food.webp'
import office from '../../assets/images/office.webp'

export default function ProductCategoriesScreen() {
  const { getData, setDisplayCat } = useProductContext()
  const navigation = useNavigation()
  const categories = [
    { label: 'Computers', value: 'computers', image: computer },
    { label: 'Smartphones', value: 'smartphones', image: smartphone },
    { label: 'Home Appliances', value: 'home-appliances', image: fridge },
    { label: 'Toys', value: 'toys', image: toy },
    { label: 'Automotive', value: 'automotive', image: car },
    { label: 'Furniture', value: 'furniture', image: furniture },
    { label: 'Food & Beverage', value: 'food-beverage', image: food },
    { label: 'Office Supplies', value: 'office-supplies', image: office },
  ]

  const renderItem = ({ item }) => (
    <ScrollView>
      <View className='bg-bg-gray p-3'>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home')
            getData(1, '', '', item.value)
            setDisplayCat(item.label)
          }}
          className='flex items-center p-6 bg-white rounded-[60px]'
        >
          <View>
            <Image
              source={item.image}
              className='h-[150px] w-[150px]'
              resizeMode='contain'
            />
            <Text className='text-center text-text-small'>{item.label}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
