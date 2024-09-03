import { json } from "@remix-run/node";
import { useState } from "react";
import { useLoaderData } from "@remix-run/react";
import { SelectChangeEvent } from "@mui/material";
import { getSignature } from "../models/signature.server";
import type { Signature as SignatureType } from "../models/signature.server";
import Signature from "../components/Signature"; 
import Picker from "../components/Picker";
import authors from "shared/authors";
export const loader = async () => {
  const quoteRes: SignatureType = await getSignature();
  const randomAuthor = authors[Math.floor(Math.random()*authors.length)];

  return json({
    quoteRes,
    randomAuthor
  });
};

export default function SignaturePage() {
  const { quoteRes, randomAuthor } = useLoaderData<typeof loader>();
  const [userFont, setUserFont] = useState("Papyrus");
  const [userColor, setUserColor] = useState("Black");

  const fontArray = ["Papyrus", "Cursive", "Times New Roman"];
  const colorArray = ["Black", "Blue", "Purple", "Orange", "Pink", "Red"];

  const handleUserFontChange = (e: SelectChangeEvent<string>) => {
    const nextFont = e.target.value;
    console.log('nextFont', nextFont);
    setUserFont(nextFont);
  };

  const handleUserColorChange = (e: SelectChangeEvent<string>) => {
    const nextColor = e.target.value;
    console.log('nextColor', nextColor);
    setUserColor(nextColor);
  };

  console.log('Current Font:', userFont);

  return (
    <main>
      <h1>Your New Email Signature</h1>
      <Picker type="font" typeArray={fontArray} value={userFont} onChange={handleUserFontChange} />
      <Picker type="color" typeArray={colorArray} value={userColor} onChange={handleUserColorChange} />
      <div style={{ fontFamily: "Cursive" }}>
        <Signature quoteRes={quoteRes} randomAuthor={randomAuthor} font={userFont} color={userColor} />;
      </div>
    </main>
  );
}