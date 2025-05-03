import { ip } from "../getIp";
import { useState, useEffect } from "react";
import axios from "axios";
import { useProductContext } from "@/context/productContext";

export default function useGetProductDetails() {
  const [data, setData] = useState([]);
  const { products, getData } = useProductContext();

  useEffect(() => {
    const getProduct = async (id) => {
      try {
        const product = await axios.get(
          `http://${ip}:5000/material-delivery/${id}`
        );
        setData(product.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [id, products]);
  return { data, setData, getData };
}
