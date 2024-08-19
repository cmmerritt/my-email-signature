import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getSignature } from "../models/signature.server";
import type { Signature as SignatureType } from "../models/signature.server";
import Signature from "../components/Signature"; 
import authors from "shared/authors";

export const loader = async () => {
  const quoteRes: SignatureType = await getSignature();
  const randomAuthor = authors[Math.floor(Math.random()*authors.length)];

  return json({
    quoteRes,
    randomAuthor
  });
};

export default function SignaturePage() {
  const { quoteRes, randomAuthor } = useLoaderData<typeof loader>();

  return (
    <main>
      <h1>Your New Email Signature</h1>
      <Signature quoteRes={quoteRes} randomAuthor={randomAuthor} />;
    </main>
  );
}