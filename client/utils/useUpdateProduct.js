import { ip } from '../getIp'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function useUpdateProduct() {
  const updateProduct = async (id) => {
    try {
      await axios.patch(`http://${ip}:5000/material-delivery/${id}`)
      console.log('updasted')
    } catch (error) {
      console.log(error)
    }
  }

  return { updateProduct }
}
