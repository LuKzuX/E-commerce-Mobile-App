import axios from 'axios'
import { useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native'

export default function ProductDetails() {
  const route = useRoute()
  const { _id } = route.params
}
