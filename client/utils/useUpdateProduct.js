import { ip } from '../getIp'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function useUpdateProduct() {
  const updateProduct = async (
    id,
    productName,
    productPrice,
    productCategory,
    productDescription,
    productQuantity
  ) => {
    try {
      await axios.patch(`http://${ip}:5000/material-delivery/${id}`, {
        productName,
        productPrice,
        productCategory,
        productDescription,
        productQuantity,
      })
      console.log('updated')
    } catch (error) {
      console.log(error)
    }
  }

  return { updateProduct }
}
