import axios from 'axios'
import { useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import { Text } from 'react-native'

export default function ProductDetails() {
  const route = useRoute()
  const { id } = route.params
  console.log(id);
  return <Text>details</Text>
  
  
}
