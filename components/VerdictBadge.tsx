export default function VerdictBadge({
  risk,
}: {
  risk: string;
}) {
  let text = "";
  let color = "";

  if (risk === "low") {
    text = "🟢 Recommended — Easy international purchase";
    color = "text-green-700";
  } else if (risk === "medium") {
    text = "🟡 Possible — Some restrictions apply";
    color = "text-yellow-700";
  } else {
    text = "🔴 High friction — Proxy may be required";
    color = "text-red-700";
  }

  return (
    <div className={`mt-3 font-medium ${color}`}>
      {text}
    </div>
  );
}