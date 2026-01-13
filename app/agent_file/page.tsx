import { Suspense } from "react";
import AgentPageClient from "./agentPageClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-white p-10">Loading agent...</div>}>
      <AgentPageClient />
    </Suspense>
  );
}
