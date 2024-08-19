export interface Signature {
  author: string;
  category: string;
  quote: string;
}

export async function getSignature():Promise<Signature> {
  const response = await fetch(
    `${process.env.API_NINJAS_QUOTES_BASE_PATH}/`,
    {
      headers: {
        "X-Api-Key": `${process.env.API_NINJAS_KEY}`,
      },
    }
  );
  const signature: Signature[] = await response.json();
  return signature[0];
}