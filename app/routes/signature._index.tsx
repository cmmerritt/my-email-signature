import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getSignatures } from "../models/signature.server";

export const loader = async () => {
  return json({ signatures: await getSignatures() });
};

export default function Signature() {
  const { signatures } = useLoaderData<typeof loader>();
  return (
    <main>
      <h1>Signature</h1>
      <ul>
        {signatures.map((signature) => (
          <li key={signature.slug}>
              {signature.title}
          </li>
        ))}
      </ul>
    </main>
  );
}