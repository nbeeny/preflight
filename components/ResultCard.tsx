"use client";

import { useState } from "react";

export default function ResultCard({
  result,
  url,
}: {
  result: any;
  url: string;
}) {
  const [paymentHelp, setPaymentHelp] =
    useState<string | null>(null);

  async function sendFeedback(
    vote: "up" | "down"
  ) {
    console.log("sending feedback");

    await fetch("/api/feedback", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        type: "feedback",

        vote,

        url,

        productName: result.productName,

        category: result.category,

        shipFrom: result.shipFrom,

        shipTo: result.shipTo,

        risk: result.risk,
      }),
    });

    alert("Feedback received");
  }

  async function sendPaymentSignal(
    answer: string
  ) {
    setPaymentHelp(answer);

    await fetch("/api/feedback", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        type: "payment_help",

        answer,

        url,

        productName: result.productName,

        category: result.category,

        shipFrom: result.shipFrom,

        shipTo: result.shipTo,
      }),
    });
  }

  return (
    <div
      className="
        mt-6
        border
        border-gray-200
        rounded-2xl
        p-6
        bg-white
        shadow-sm
        space-y-5
      "
    >
      <div>
        <h2 className="text-2xl font-bold">
          {result.productName}
        </h2>

        <div className="text-sm text-gray-500 mt-1">
          {result.shipFrom} → {result.shipTo}
        </div>

        <div className="text-sm text-gray-500 mt-1">
          Category: {result.category}
        </div>
      </div>

      <div>
        <div className="text-sm text-gray-500 mb-1">
          Estimated landed cost
        </div>

        <div className="text-3xl font-bold">
          ${result.totalLow} – $
          {result.totalHigh} USD
        </div>
        <div className="text-sm text-gray-500 mt-1">Based on item category, weight estimate, and courier pricing bands</div>
      </div>

      <div>
        <div className="text-sm text-gray-500 mb-1">
          Risk level
        </div>

        <div className="flex items-center gap-2">
          <div
            className={`
              w-3 h-3 rounded-full
              ${
                result.risk === "low"
                  ? "bg-green-500"
                  : result.risk === "medium"
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }
            `}
          />

          <div className="capitalize font-medium">
            {result.risk}
          </div>
        </div>
      </div>

      <div>
        <div className="text-sm text-gray-500 mb-1">
          Recommended route
        </div>

        <div className="font-medium">
          {result.routeRecommendation}
        </div>
      </div>

      <div>
        <div className="text-sm text-gray-500 mb-2">
          Why this route?
        </div>

        <ul className="space-y-2">
          {result.reasons.map(
            (
              reason: string,
              index: number
            ) => (
              <li
                key={index}
                className="text-sm"
              >
                • {reason}
              </li>
            )
          )}
        </ul>
      </div>

      <div>
        <div className="text-sm text-gray-500 mb-2">
          Suggested shipping methods
        </div>

        <div className="flex flex-wrap gap-2">
          {result.shippingOptions.map(
            (
              option: string,
              index: number
            ) => (
              <div
                key={index}
                className="
                  border
                  border-gray-200
                  rounded-full
                  px-3
                  py-1
                  text-sm
                "
              >
                {option}
              </div>
            )
          )}
        </div>
      </div>

      <div>
        <div className="text-sm text-gray-500 mb-2">
          Potential issues
        </div>

        <ul className="space-y-2">
          {result.risks.map(
            (
              risk: string,
              index: number
            ) => (
              <li
                key={index}
                className="text-sm"
              >
                ⚠ {risk}
              </li>
            )
          )}
        </ul>
      </div>

      <div>
        <div className="text-sm text-gray-500 mb-1">
          Confidence score
        </div>

        <div className="font-medium">
          {result.confidence}%
        </div>
      </div>

      <div className="border-t pt-5">
        <div className="font-medium mb-2">
          Payment compatibility
        </div>

        <p className="text-sm text-gray-600 mb-3">
          Some international retailers reject
          foreign cards or payment methods.
        </p>

        <div className="text-sm mb-3">
          Would you need help if checkout
          blocks your payment method?
        </div>

        <div className="flex gap-3">
          <button
            onClick={() =>
              sendPaymentSignal("yes")
            }
            className={`
              border
              px-4
              py-2
              rounded-xl
              transition
              ${
                paymentHelp === "yes"
                  ? "bg-black text-white"
                  : "bg-white"
              }
            `}
          >
            Yes
          </button>

          <button
            onClick={() =>
              sendPaymentSignal("no")
            }
            className={`
              border
              px-4
              py-2
              rounded-xl
              transition
              ${
                paymentHelp === "no"
                  ? "bg-black text-white"
                  : "bg-white"
              }
            `}
          >
            No
          </button>
        </div>
      </div>

      <div className="border-t pt-5">
        <div className="text-sm text-gray-600 mb-3">
          Was this recommendation helpful?
        </div>

        <div className="flex gap-3">
          <button
            onClick={() =>
              sendFeedback("up")
            }
            className="
              border
              px-4
              py-2
              rounded-xl
              hover:bg-gray-50
              transition
            "
          >
            👍 Helpful
          </button>

          <button
            onClick={() =>
              sendFeedback("down")
            }
            className="
              border
              px-4
              py-2
              rounded-xl
              hover:bg-gray-50
              transition
            "
          >
            👎 Not helpful
          </button>
        </div>
      </div>

      <div className="border-t pt-5">
        <a
          href={result.partnerLink}
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex
            items-center
            bg-black
            text-white
            px-5
            py-3
            rounded-xl
            hover:bg-gray-800
            transition
          "
        >
          View forwarding options
        </a>
      </div>
    </div>
  );
}