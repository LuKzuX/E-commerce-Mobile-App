import { ip } from '@/getIp'
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native'

export const ProductList = ({ data }) => {
  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <Image
        source={{ uri: `http://${ip}:5000/` + item.productImage }}
        style={styles.uploadedImage}
      />
      <View style={styles.containerContent}>
        <Text style={styles.productName}>{item.productName}</Text>
        <View style={styles.productPriceContainer}>
          <Text style={styles.productPriceCurrency}>$</Text>
          <Text style={styles.productPrice}>{item.productPrice}</Text>
        </View>
      </View>
      <Text
        style={styles.btn}
        onPress={() => console.log(item.productDescription)}
      >
        Add to Cart
      </Text>
    </View>
  )

  return (
    <FlatList
      style={styles.list}
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      numColumns={2}
    />
  )
}

const styles = StyleSheet.create({
  list: {
    gap: 20,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 5,
  },
  containerContent: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  uploadedImage: {
    height: 150,
    resizeMode: 'cover',
  },
  productName: {
    fontSize: 20,
  },
  productPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productPriceCurrency: {
    fontSize: 12,
    marginRight: 1,
  },
  productPrice: {
    fontSize: 20,
  },
  btn: {
    alignSelf: 'center',
    backgroundColor: '#ffd814',
    paddingVertical: 6,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 10,
  },
})
