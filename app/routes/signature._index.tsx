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

  let authorMatch = false;
  if (quoteRes.author === randomAuthor) {
    authorMatch = true;
  }

  return (
    <main>
      <h1>Your New Email Signature</h1>
      <div style={{ fontFamily: "Papyrus", fontSize: "2em" }}>
        {quoteRes.quote}
      </div>
      <div style={{ fontFamily: "cursive", fontSize: "1.5em" }}>
        ~{randomAuthor}
      </div>
      { authorMatch && 
        <div>
          Whoa! This is the real author! (Allegedly.)
        </div>
      }

    </main>
  );
}