import { ip } from "@/getIp";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export const ProductList = ({ data }) => {
  return data
    .map((obj, index) => (
      <View key={obj._id}>
        <Image
          source={{ uri: `http://${ip}:5000/` + obj.productImage }}
          style={styles.uploadedImage}
        ></Image>
        <Text>{obj.productName}</Text>
        <Text>{obj.productPrice}</Text>
      </View>
    ));
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ebebeb",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  previewImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  uploadedTitle: {
    marginTop: 20,
    fontSize: 18,
    marginBottom: 10,
  },
  uploadedImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
