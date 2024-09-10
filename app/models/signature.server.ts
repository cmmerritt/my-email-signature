export interface Signature {
  author: string;
  category: string;
  quote: string;
}

export async function getSignature(): Promise<Signature | null> {
  try {
    if (!process.env.API_NINJAS_QUOTES_BASE_PATH || !process.env.API_NINJAS_KEY) {
      throw new Error("Missing API base path or API key.");
    }

    const response = await fetch(
      `${process.env.API_NINJAS_QUOTES_BASE_PATH}/`,
      {
        headers: {
          "X-Api-Key": `${process.env.API_NINJAS_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching quote API: ${response.status} - ${response.statusText}`);
    }

    const signatures: Signature[] = await response.json();

    if (!Array.isArray(signatures) || signatures.length === 0) {
      throw new Error("Invalid quote API response format.");
    }

    return signatures[0];
  } catch (error) {
    console.error("Failed to fetch signature:", error);
    return null; 
  }
}