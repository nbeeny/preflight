export default function ActionPanel({
  result,
}: {
  result: any;
}) {
  return (
    <div className="mt-6 border-t pt-5">

      <h3 className="font-semibold text-lg">
        Recommended fulfillment partner
      </h3>

      <div className="mt-3 flex gap-3">

        <a
          href={result.partnerLink}
          target="_blank"
          className="bg-black text-white px-4 py-2 rounded"
        >
          Continue to Forwarder
        </a>

        <button className="border px-4 py-2 rounded">
          Request Proxy Shopper
        </button>

      </div>

    </div>
  );
}