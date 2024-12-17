import { Link } from "expo-router";
import { View, Text, StyleSheet, Button, Image, FlatList } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { launchImageLibrary } from "react-native-image-picker";

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

  const handleSelectImage = async () => {
    try {
      await launchImageLibrary(
        { mediaType: "photo", quality: 1 },
        (response) => {
          const imageUri = response.assets[0].uri;
          setProductImage(imageUri); // Set the image URI

          // Now call handleUpload after the image has been selected
        }
      );
      handleUpload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      const image = {
        uri: productImage,
        type: "image/jpeg", // or 'image/png' based on your image type
        name: "product_image.jpg",
      };
      formData.append("productImage", image);
      // Make the POST request with Axios to upload the image
      const response = await axios.post(
        "http://192.168.1.111:5000/material-delivery/new-product",

        {
          headers: {
            "Content-Type": "multipart/form-data", // This is needed for file uploads
          },
        }
      );
      
      console.log(formData);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <>
      <Text style={styles.title}>Image Uploader</Text>

      {/* Image selection */}
      <Button title="Select Image" onPress={handleSelectImage} />

      {/* Display uploaded images */}
      <Text style={styles.uploadedTitle}>Uploaded Images:</Text>
      {data &&
        data.map((obj, index) => (
          <View key={obj._id}>
            <Image
              source={obj.productImage}
              style={styles.uploadedImage}
            ></Image>
          </View>
        ))}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  previewContainer: {
    marginTop: 20,
    alignItems: "center",
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
});
