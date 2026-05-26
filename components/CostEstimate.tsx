export default function CostEstimate({
  result,
}: {
  result: any;
}) {
  return (
    <div className="mt-5">
      <h3 className="font-semibold text-lg">
        Estimated total cost
      </h3>

      <div className="text-2xl font-bold mt-1">
        ${result.totalLow} – ${result.totalHigh} USD
      </div>

      <div className="text-sm text-gray-500 mt-2">
        Includes estimated shipping and handling.
      </div>
    </div>
  );
}