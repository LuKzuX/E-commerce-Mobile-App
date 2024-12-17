import { Link } from "expo-router";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import {
  launchImageLibraryAsync,
  requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState("");
  const [productImage, setProductImage] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const products = await axios.get(
          "http://192.168.1.111:5000/material-delivery/"
        );
        setData(products.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
}
