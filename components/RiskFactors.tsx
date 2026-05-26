export default function RiskFactors({
  risks,
}: {
  risks: string[];
}) {
  return (
    <div className="mt-5">
      <h3 className="font-semibold">
        Risk factors
      </h3>

      <ul className="list-disc ml-5 mt-2">
        {risks.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>
    </div>
  );
}