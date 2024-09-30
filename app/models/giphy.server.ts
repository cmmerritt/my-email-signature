export async function getMaxOffset(category: string): Promise<number> {
  try {
    if (!process.env.API_GIPHY_BASE_PATH || !process.env.API_GIPHY_KEY) {
      throw new Error("Missing API base path or API key.");
    }

    const response = await fetch(
      `${process.env.API_GIPHY_BASE_PATH}?q=${category}&api_key=${process.env.API_GIPHY_KEY}&limit=1&offset=0&rating=pg-13`
    );

    if (!response.ok) {
      throw new Error(`Error fetching Giphy: ${response.status} - ${response.statusText}`);
    }
    
    const data = await response.json();

    const totalCount = data?.pagination?.total_count;
    if (!totalCount) {
      throw new Error("Unable to fetch total count of GIFs.");
    }
    
    const maxOffset = Math.min(totalCount - 1, 4999);
    return maxOffset;

  } catch (error) {
    console.error("Failed to get max offset:", error);
    throw error; 
  }
}

export async function getGiphy(quoteCategory: string, maxOffset: number): Promise<string> {
  try {
    if (!process.env.API_GIPHY_BASE_PATH || !process.env.API_GIPHY_KEY) {
      throw new Error("Missing API base path or API key.");
    }

    const randomOffset = Math.floor(Math.random() * maxOffset);

    const response = await fetch(
      `${process.env.API_GIPHY_BASE_PATH}?q=${quoteCategory}&api_key=${process.env.API_GIPHY_KEY}&limit=1&offset=${randomOffset}&rating=pg-13`
    );

    if (!response.ok) {
      throw new Error(`Error fetching Giphy: ${response.status} - ${response.statusText}`);
    }

    const { data } = await response.json();
    return data[0]?.images?.original?.url || "No gif found";

  } catch (error) {
    console.error("Failed to fetch Giphy:", error);
    throw error;
  }
}