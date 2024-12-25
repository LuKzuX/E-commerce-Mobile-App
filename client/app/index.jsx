import { ip } from "../getIp.js";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import useGetProducts from "../utils/useGetProducts.js";
import { ProductList } from "./components/ProductList.jsx";

export default function HomeScreen() {
  const navigation = useNavigation();
  const { data } = useGetProducts();

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("screens/CreateProductScreen")}
      >
        <Ionicons name="add-circle-outline" size={120} color="gray" />
      </TouchableOpacity>
      <ProductList data={data} />
    </ScrollView>
  );
}

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
