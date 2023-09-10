"use client";

import { Product } from "@/types/product";
import { Button } from "@nextui-org/react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Props = {};

const apiUrl = "http://localhost:3000/api/products";

export default async function ProductsList({}: Props) {
  let data = await getData();

  async function getData() {
    const { data } = await axios.get(apiUrl);
    return data as Product[];
  }

  async function handleDelete(id: number) {
    await axios.delete(`${apiUrl}`, { data: { id } });
    data = await getData();
  }

  async function handleCreate(title: string, image: string) {
    await axios.post(`${apiUrl}`, { title, image });
    data = await getData();
  }

  return (
    <>
      <h1>Products</h1>
      <ul>
        {data.map((product: Product) => (
          <li key={product.id}>
            <h2>{product.title}</h2>
            <Image
              src={product.image}
              alt={product.title}
              width={200}
              height={200}
            />
            <p>likes: {product.likes}</p>
            <Button onClick={() => handleDelete(product.id)}>Delete</Button>
          </li>
        ))}
      </ul>

      <div>
        <Button
          onClick={() =>
            handleCreate("test", "https://i.imgur.com/hlXfJHv.jpeg")
          }
        >
          Add new
        </Button>
      </div>
    </>
  );
}
