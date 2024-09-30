export async function fetchRandomGif(category: string, API_GIPHY_BASE_PATH: string, API_GIPHY_KEY: string): Promise<string> {
  try {
    const countResponse = await fetch(
      `${API_GIPHY_BASE_PATH}?q=${category}&api_key=${API_GIPHY_KEY}&limit=1&offset=0&rating=pg-13`
    );

    if (!countResponse.ok) {
      throw new Error(`Error fetching Giphy: ${countResponse.status} - ${countResponse.statusText}`);
    }

    const { pagination: { total_count: totalCount = 0 } = {} } = await countResponse.json();

    if (!totalCount) {
      throw new Error("Unable to fetch total count of GIFs.");
    }

    const randomOffset = Math.floor(Math.random() * Math.min(totalCount - 1, 4999));

    const gifResponse = await fetch(
      `${API_GIPHY_BASE_PATH}?q=${category}&api_key=${API_GIPHY_KEY}&limit=1&offset=${randomOffset}&rating=pg-13`
    );

    if (!gifResponse.ok) {
      throw new Error(`Error fetching Giphy: ${gifResponse.status} - ${gifResponse.statusText}`);
    }

    const { data: gifData } = await gifResponse.json();
    return gifData[0]?.images?.original?.url || "No gif found";
  } catch (error) {
    console.error("Failed to fetch GIF:", error);
    throw error; 
  }
}