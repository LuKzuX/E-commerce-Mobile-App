import { Link } from "expo-router";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
export default function HomeScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState("");
  useEffect(() => {
    const getData = async () => {
      try {
        const products = await axios.get(
          "http://192.168.1.111:5000/material-delivery/"
        );
        setData(products.data);
        console.log(products.data);
        
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  {data && console.log(data)
  }

  return (
    <>
      {data &&
        data.map((obj) => (
          <View key={obj._id}>
            <Image
              resizeMode="cover"
              source={obj.productImage}
              style={styles.image}
            ></Image>
            <Text>{obj.productName}</Text>
            <Text>{obj.productPrice}</Text>
          </View>
        ))}
        
      <Button
        title="Go to Signup"
        onPress={() => navigation.navigate("screens/SignupScreen")}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
});
