export interface Signature {
  slug: string;
  title: string;
}

export async function getSignatures(): Promise<Signature[]> {
  return [
    {
      slug: "my-signature",
      title: "My Signature",
    },
  ];
}