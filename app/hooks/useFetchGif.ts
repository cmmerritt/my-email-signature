import { useState } from "react";
import { fetchRandomGif } from "../utils/giphyClient";

export function useFetchGif(initialGifUrl: string, API_GIPHY_BASE_PATH: string, API_GIPHY_KEY: string) {
  const [gifUrl, setGifUrl] = useState<string>(initialGifUrl);

  const fetchGif = async (category: string) => {
    try {
      const newGifUrl = await fetchRandomGif(category, API_GIPHY_BASE_PATH, API_GIPHY_KEY);
      setGifUrl(newGifUrl);
    } catch (error) {
      console.error("Error fetching GIF: ", error);
    }
  };

  return { gifUrl, fetchGif };
}