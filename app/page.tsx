"use client";

import { useState } from "react";
import ResultCard from "../components/ResultCard";

const countries = [
  "United States",
  "Japan",
  "United Kingdom",
  "Australia",
  "New Zealand",
  "Canada",
  "Germany",
  "France",
  "Singapore",
  "South Korea",
];

const categories = [
  "Fashion / Clothing",
  "Shoes / Sneakers",
  "Electronics",
  "Perfume / Cosmetics",
  "Collectibles / Hobby",
  "Luxury / Designer",
  "Food / Consumables",
  "Other",
];

export default function Home() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [shipFrom, setShipFrom] = useState("Japan");
  const [shipTo, setShipTo] = useState("United States");
  const [category, setCategory] = useState(
  "Shoes / Sneakers"
);

  async function analyze() {
    setLoading(true);
    setResult(null);

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    body: JSON.stringify({
  url,
  shipFrom,
  shipTo,
  category,
}),
    });

    const data = await res.json();

    setResult(data);
    setLoading(false);
  }

  return (
    <main className="max-w-2xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Preflight
      </h1>

       {result && (
        <>
          <ResultCard result={result} url={url} />

          <div className="mt-4 text-sm text-gray-600">
            This is a heuristic estimate based on
            shipping and import patterns.
          </div>
        </>
      )}


      <input
        className="border border-gray-300 p-3 w-full rounded-xl mb-4 shadow-sm"
        placeholder="Paste product URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <div className="mb-5">

  <label className="text-sm font-medium block mb-2">
    Product category
  </label>

  <div className="grid grid-cols-2 gap-3 mb-4">

  <div>
    <label className="text-sm font-medium">
      Ships from
    </label>

    <select
      className="border p-2 w-full rounded mt-1"
      value={shipFrom}
      onChange={(e) => setShipFrom(e.target.value)}
    >
      {countries.map((c) => (
        <option key={c}>{c}</option>
      ))}
    </select>
  </div>

  <div>
    <label className="text-sm font-medium">
      Ship to
    </label>

    <select
      className="border p-2 w-full rounded mt-1"
      value={shipTo}
      onChange={(e) => setShipTo(e.target.value)}
    >
      {countries.map((c) => (
        <option key={c}>{c}</option>
      ))}
    </select>
  </div>

</div>

  <div className="grid grid-cols-2 gap-2">

    {categories.map((c) => (
      <button
        key={c}
        type="button"
        onClick={() => setCategory(c)}
        className={`border rounded p-2 text-sm text-left
          ${
            category === c
              ? "bg-black text-white"
              : "bg-white"
          }`}
      >
        {c}
      </button>
    ))}

  </div>

</div>

      <button
        onClick={analyze}
        className="bg-black hover:bg-gray-800 text-white px-5 py-3 rounded-xl shadow-sm 
        transition"
      >
        Analyze
      </button>

      {loading && (
        <p className="mt-4">
          Analyzing...
        </p>
      )}
     
    </main>
  );
}