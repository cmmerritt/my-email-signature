import { json, LoaderFunction } from "@remix-run/node";
import { useLayoutEffect, useEffect, useState } from "react";
import { useLoaderData, useNavigation } from "@remix-run/react";
import { SelectChangeEvent, Container, Box, Button } from "@mui/material";
import { getSignature } from "../models/signature.server";
import type { Signature as SignatureType } from "../models/signature.server";
import { getMaxOffset, getGiphy } from "../models/giphy.server";
import { useFetchGif } from "../hooks/useFetchGif";
import Signature from "../components/Signature"; 
import Gif from "../components/Gif";
import Picker from "../components/Picker";
import authors from "~/shared/authors";

export const loader: LoaderFunction = async () => {
  const quoteRes: SignatureType =
    (await getSignature()) ?? {
      author: "Unknown",
      category: "General",
      quote: "No quote available.",
    };

  const randomAuthor = authors[Math.floor(Math.random() * authors.length)];

  const maxOffset = await getMaxOffset(quoteRes.category || "fun");
  const gifUrl = await getGiphy(quoteRes.category || "fun", maxOffset);
  
  const API_GIPHY_BASE_PATH = process.env.API_GIPHY_BASE_PATH;
  const API_GIPHY_KEY = process.env.API_GIPHY_KEY;

  return json({
    quoteRes,
    randomAuthor,
    gifUrl,
    API_GIPHY_BASE_PATH,
    API_GIPHY_KEY
  });
};

export default function SignaturePage() {
  const { quoteRes, randomAuthor, gifUrl: initialGifUrl, API_GIPHY_BASE_PATH, API_GIPHY_KEY } = useLoaderData<typeof loader>();
  const [userFont, setUserFont] = useState<string>("Papyrus");
  const [userColor, setUserColor] = useState<string>("Black");
  const [showAuthor, setShowAuthor] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [category, setCategory] = useState<string>(quoteRes.category);
  const { gifUrl, fetchGif } = useFetchGif(initialGifUrl, API_GIPHY_BASE_PATH, API_GIPHY_KEY);

  const navigation = useNavigation();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const savedFont = window.localStorage.getItem("userFont");
      const savedColor = window.localStorage.getItem("userColor");

      if (savedFont) {
        setUserFont(savedFont);
      }

      if (savedColor) {
        setUserColor(savedColor);
      }
    }
  }, []);

  const fontArray = ["Papyrus", "Cursive", "Times New Roman"];
  const colorArray = ["Black", "Blue", "Purple", "Orange", "Pink", "Red"];

  const handleUserFontChange = (e: SelectChangeEvent<string>) => {
    const nextFont = e.target.value;
    setUserFont(nextFont);
    window.localStorage.setItem("userFont", nextFont);
  };

  const handleUserColorChange = (e: SelectChangeEvent<string>) => {
    const nextColor = e.target.value;
    setUserColor(nextColor);
    window.localStorage.setItem("userColor", nextColor);
  };

  const handleReload = () => {
    window.location.reload();
  };

  const handleKeywordClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const nextCategory = (event.target as HTMLButtonElement).value;
    setCategory(nextCategory);
    fetchGif(nextCategory); 
  };

  return (
    <Container>
      <main>
        {navigation.state !== "idle" ? <div>Loading...</div> : null}

        <h1>Your New Email Signature</h1>

        <Picker
          type="font"
          typeArray={fontArray}
          value={userFont}
          onChange={handleUserFontChange}
        />

        <Picker
          type="color"
          typeArray={colorArray}
          value={userColor}
          onChange={handleUserColorChange}
        />

        <div
          style={{
            fontFamily: isClient ? userFont : "Papyrus",
            color: isClient ? userColor : "Black",
          }}
        >
          <Signature
            quoteRes={quoteRes}
            randomAuthor={randomAuthor}
            font={userFont}
            color={userColor}
            onClick={handleKeywordClick}
          />
        </div>

        <Button
          variant="outlined"
          onClick={() => setShowAuthor((prev) => !prev)}
        >
          Click to reveal/hide the real author
        </Button>

        <div
          style={{
            fontFamily: isClient ? userFont : "Papyrus",
            color: isClient ? userColor : "Black",
          }}
        >
          {showAuthor && <Box>{quoteRes.author}</Box>}
        </div>

        <br />

        <Button variant="outlined" onClick={handleReload}>
          Click to get a new quote
        </Button>

        <Gif gifUrl={gifUrl} category={category} />
      </main>
    </Container>
  );
}