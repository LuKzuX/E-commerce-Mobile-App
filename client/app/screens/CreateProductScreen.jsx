import { uploadData } from '../../utils/uploadData.js'
import { ip } from '../../getIp.js'
import { View, Text, StyleSheet, Button, Image, TextInput } from 'react-native'
import { useState, useEffect } from 'react'

export default function CreateProductScreen() {
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productCategory, setProductCategory] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [productQuantity, setProductQuantity] = useState('')

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setProductName(text)}
        placeholder='name'
        keyboardType='letter'
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setProductPrice(text)}
        placeholder='price'
        keyboardType='numeric'
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setProductCategory(text)}
        placeholder='category'
        keyboardType='letter'
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setProductDescription(text)}
        placeholder='desc'
        keyboardType='letter'
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setProductQuantity(text)}
        placeholder='quantity'
        keyboardType='numeric'
      />
      <Button
        title='Select Image'
        onPress={async () => {
          await uploadData(
            `http://${ip}:5000/material-delivery/new-product`,
            productName,
            productPrice,
            productCategory,
            productDescription,
            productQuantity
          )
          getData()
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  previewContainer: {
    marginTop: 20,
    alignItems: 'center',
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
})
