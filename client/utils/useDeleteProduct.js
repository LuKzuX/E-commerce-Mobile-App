import { ip } from '../getIp'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuthContext } from '../context/authContext'

export default function useDeleteProduct() {
  const { user } = useAuthContext()
  const deleteProduct = async (id) => {
    try {
      const res = await axios.delete(`http://${ip}:5000/material-delivery/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      console.log(res.data);
      
    } catch (error) {
      console.log(error)
    }
  }
  return deleteProduct
}
