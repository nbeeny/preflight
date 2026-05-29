import { NextResponse } from "next/server";

const categoryProfiles: any = {
  "Fashion / Clothing": {
    weight: 0.5,
    risk: "low",
  },

  "Shoes / Sneakers": {
    weight: 1.5,
    risk: "low",
  },

  Electronics: {
    weight: 3,
    risk: "medium",
  },

  "Perfume / Cosmetics": {
    weight: 1,
    risk: "high",
  },

  "Collectibles / Hobby": {
    weight: 2,
    risk: "medium",
  },

  "Luxury / Designer": {
    weight: 2,
    risk: "medium",
  },

  "Food / Consumables": {
    weight: 2,
    risk: "very high",
  },

  Other: {
    weight: 1,
    risk: "low",
  },
};

function inferProductName(url: string) {
  const last = url
    .split("/")
    .filter(Boolean)
    .pop();

  return (
    decodeURIComponent(last || "")
      .replace(/[-_]/g, " ")
      .slice(0, 80) || "Unknown product"
  );
}

export async function POST(req: Request) {

  const {
    url,
    shipFrom,
    shipTo,
    category,
    weight,
  } = await req.json();

  const productName =
    inferProductName(url);

  const profile =
    categoryProfiles[category] ||
    categoryProfiles["Other"];

  const risk = profile.risk;

  const shippingLow =
    20 + profile.weight * 4;

  const shippingHigh =
    40 + profile.weight * 9;

  const totalLow =
    Math.round(10 + shippingLow);

  const totalHigh =
    Math.round(10 + shippingHigh);

  const partnerLink =
    `https://forwarderscompare.com/best-usa-international.php`   

    console.log({
  shipFrom,
  shipTo,
  weight,
  category,
});

  return NextResponse.json({
    productName,

    category,

    shipFrom,

    shipTo,

    risk,

    routeRecommendation:
      "Use a forwarding service for best reliability",

    reasons: [
      "Ships from domestic retailer",
      "Forwarding services commonly used",
      "International checkout support may be limited",
    ],

    shippingOptions: [
      "DHL Express Worldwide",
      "FedEx International Priority",
      "UPS Worldwide Saver",
    ],

    risks: [
      "Import duties may apply",
      "Retailer may block some forwarders",
    ],

    confidence: 78,

    totalLow,

    totalHigh,

    partnerLink,
  });
}