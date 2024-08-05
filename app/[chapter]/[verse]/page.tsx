"use client";
import React, { useState, useEffect } from "react";

const Page = ({ params }: { params: { chapter: string, verse: string } }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const proxy = "https://cors-anywhere.herokuapp.com/";
  const url = `https://gita-api.vercel.app/tel/verse/${params.chapter}/${params.verse}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(proxy + url);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const json = await res.json();
        setData(json);
      } catch (error: any) {
        setError(error.message || "Fetching data failed");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  if (data === null) {
    return <h1>No data available</h1>;
  }
  return (
    <div className="main">
    <h1>{`అధ్యాయం - ${params.chapter}, శ్లోకం - ${params.verse}`}</h1>
    <h1>శ్లోకం - </h1>
    <p>{data.verse}</p>
    <h1>అనువాదం - </h1>
    <p>{data.translation}</p>

    <h1>తాత్పర్యములు - </h1>
    <p className='purport'>{data.purport[1]}</p>
    <p className='purport'>{data.purport[2]}</p>
    <p className='purport'>{data.purport[3]}</p>
<div className="buttons ">
  <a href={`../${params.chapter}/${(parseInt(params.verse) - 1).toString()}/`}><button className="w-min mr-2 h-min px-5 py-2 border-2 border-black rounded-sm">prev</button></a>
    <a href={`../${params.chapter}/${(parseInt(params.verse) + 1).toString()}/`}><button className="w-min h-min px-5 py-2 border-2 border-black rounded-sm">next</button></a>
</div>
    </div>
  );
};

export default Page;
