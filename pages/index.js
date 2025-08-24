import { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";

export default function Home() {
  const [apod, setApod] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/api/fetchApod");
        setApod(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load APOD data.");
      }
    }
    fetchData();
  }, []);

  if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;
  if (!apod) return <p className="text-center mt-20">Loading...</p>;

  return (
    <>
      <Head>
        <title>{apod.title} | Daily Astronomy</title>
        <meta name="description" content={apod.aiDescription} />
        <meta property="og:title" content={apod.title} />
        <meta property="og:description" content={apod.aiDescription} />
        <meta property="og:image" content={apod.url} />
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
        <h1 className="text-3xl font-bold mb-4">{apod.title}</h1>
        <p className="mb-4">{apod.date}</p>
        <img src={apod.url} alt={apod.title} className="mb-4 rounded-lg shadow-lg max-w-full" />
        <p className="text-lg mb-4">{apod.aiDescription}</p>

        <div className="flex gap-4 mt-4">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(apod.title + " " + apod.url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-500 rounded"
          >
            Share on Twitter
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(apod.url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-700 rounded"
          >
            Share on Facebook
          </a>
        </div>

        <div className="mt-6 p-4 border border-gray-500 rounded w-full max-w-md text-center">
          Place your AdSense or affiliate link here
        </div>
      </div>
    </>
  );
}
