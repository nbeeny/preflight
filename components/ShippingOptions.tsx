export default function ShippingOptions({
  options,
}: {
  options: string[];
}) {
  return (
    <div className="mt-5">
      <h3 className="font-semibold">
        Typical shipping methods
      </h3>

      <ul className="list-disc ml-5 mt-2">
        {options.map((o) => (
          <li key={o}>{o}</li>
        ))}
      </ul>
    </div>
  );
}