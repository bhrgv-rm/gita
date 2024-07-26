"use client";
import React, { useState, useEffect } from "react";

const Page = ({ params }: { params: { slug: string } }) => {
  const [data, setData] = useState("");
  // const url = "https://jsonplaceholder.typicode.com/posts";
  // const url = "http://gita-api.vercel.app/tel/verse/1/1";
  const url = "http://localhost:8010/proxy/tel/verse/1/1";

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(url);
      console.log(res.status);
      const json = await res.json();
      setData(json);
      console.log(json);
    };
    fetchData();
  }, []);
  return <h1>{JSON.stringify(data)}</h1>;
};

export default Page;
