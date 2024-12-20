import type { MetaFunction } from "@remix-run/node";
import { json, LoaderFunction } from "@remix-run/node";
import React, { useLayoutEffect, useEffect, useState } from "react";
import { useLoaderData, useNavigation } from "@remix-run/react";
import { SelectChangeEvent, Container, Box, Button } from "@mui/material";
import { getSignature } from "../models/signature.server";
import type { Signature as SignatureType } from "../models/signature.server";
import { getMaxOffset, getGiphy } from "../models/giphy.server";
import { useFetchGif } from "../hooks/useFetchGif";
import Signature from "../components/Signature"; 
import Gif from "../components/Gif";
import Picker from "../components/Picker";
import Header from "../components/Header";
import authors from "../shared/authors"

export const meta: MetaFunction = () => {
  return [
    { title: "Email Signature Generator" },
    { name: "description", content: "Create your own custom email signature with a random quote and GIF." },
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width,initial-scale=1" },
  ];
};

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
  const [userFont, setUserFont] = useState<string>("");
  const [userColor, setUserColor] = useState<string>("");
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
      } else {
        setUserFont("Papyrus");
      }

      if (savedColor) {
        setUserColor(savedColor);
      } else {
        setUserColor("Black");
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

  if(userFont === "" || userColor === "") return null;

  return (
    <Container>
      <Header />
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
          variant="contained"
          style={{
            color: ["Black", "Blue", "Purple"].includes(userColor) ? "white" : "black",
            backgroundColor: userColor.toLowerCase(),
            borderRadius: "12px",
            fontFamily: userFont,
            padding: "10px 20px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            textTransform: "none",
            transition: "transform 0.2s ease, background-color 0.2s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = userColor.toLowerCase())
          }
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

        <Button
          variant="contained"
          style={{
            backgroundColor: userColor.toLowerCase(),
            color: ["Black", "Blue", "Purple"].includes(userColor) ? "white" : "black",
            fontFamily: userFont,
            borderRadius: "12px",
            padding: "10px 20px",
            textTransform: "none",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.2s ease, background-color 0.2s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = userColor.toLowerCase())
          }
          onClick={handleReload}
        >
          Click to get a new quote
        </Button>

        <Gif gifUrl={gifUrl} category={category} />
      </main>
    </Container>
  );
}