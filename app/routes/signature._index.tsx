import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getSignature } from "../models/signature.server";
import type { Signature } from "../models/signature.server"; 
import authors from "shared/authors";

export const loader = async () => {
  const quoteRes: Signature = await getSignature();
  const randomAuthor = authors[Math.floor(Math.random()*authors.length)];

  return json({
    quoteRes: quoteRes,
    randomAuthor
  });
};

export default function Signature() {
  const { quoteRes, randomAuthor } = useLoaderData<typeof loader>();

  return (
    <main>
      <h1>Your New Email Signature</h1>
      <div>
        {quoteRes.quote}
      </div>
      <div>
        ~{randomAuthor}
      </div>
    </main>
  );
}