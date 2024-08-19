import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import authors from "shared/authors";

export const loader = async () => {
  const quoteRes = await fetch(
    `${process.env.API_NINJAS_QUOTES_BASE_PATH}/`,
    {
      headers: {
        "X-Api-Key": `${process.env.API_NINJAS_KEY}`,
      },
    }
  );

  return json({
    quoteRes: await quoteRes.json(),
  });
};

export default function Signature() {
  const { quoteRes } = useLoaderData<typeof loader>();
  const randomAuthor = authors[Math.floor(Math.random()*authors.length)];
  console.log(quoteRes)
  return (
    <main>
      <h1>Your New Email Signature</h1>
      <div>
        {quoteRes[0].quote}
      </div>
      <div>
        ~{randomAuthor}
      </div>
    </main>
  );
}