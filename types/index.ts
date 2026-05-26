export type AnalyzeRequest = {
  url: string;
  price?: number;
};

export type AnalyzeResult = {
  totalLow: number;
  totalHigh: number;
  breakdown: {
    item: number;
    shippingLow: number;
    shippingHigh: number;
    gst: number;
    proxyFeeLow: number;
    proxyFeeHigh: number;
    productTitle: string;
  };
  risk: "low" | "medium" | "high";
  flags: string[];
  allowed: "yes" | "maybe" | "no";
  recommendations: string[];
};