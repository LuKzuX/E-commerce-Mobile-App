import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native'
import car from '../../assets/images/car.webp'
import computer from '../../assets/images/computer.webp'
import smartphone from '../../assets/images/smartphone.webp'
import fridge from '../../assets/images/fridge.jpg'
import toy from '../../assets/images/toy.webp'
import furniture from '../../assets/images/furniture.webp'
import food from '../../assets/images/food.webp'
import office from '../../assets/images/office.webp'

export default function ProductCategoriesScreen() {
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
      <TouchableOpacity className='flex items-center pb-0 px-7 py-10 bg-white'>
        <View>
          <Image
            source={item.image}
            className='h-[150px] w-[150px]'
            resizeMode='contain'
          />
          <Text className='text-center text-text-small'>{item.label}</Text>
        </View>
      </TouchableOpacity>
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
