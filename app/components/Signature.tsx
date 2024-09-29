import React from "react";
import { Button } from "@mui/material";
import type { Signature as SignatureType } from "../models/signature.server";
import { getQuoteKeywords } from "~/utils/quote";

interface SignatureProps {
  quoteRes: SignatureType;
  randomAuthor: string;
  font: string;
  color: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const Signature: React.FC<SignatureProps> = ({ quoteRes, randomAuthor, font, color, onClick }) => {
  const authorMatch = quoteRes.author === randomAuthor;

  const quoteWords = quoteRes.quote.split(" ");
  const keywords = getQuoteKeywords(quoteRes.quote);
  const renderedQuote: JSX.Element[] = [];
  quoteWords.forEach((word, i) => {
    if(keywords.includes(word)) {
      renderedQuote.push(
      <Button
      variant="outlined" 
      key={i} 
      style={{ fontWeight: 'bold' }} 
      value={word} 
      onClick={onClick}
      >
        {word}
      </Button>
    );
    } else {
    renderedQuote.push(<span key={i}>{word} </span>);
    }
  });

  return (
    <>
      <div style={{ fontFamily: font, fontSize: "2em", color: color }}>
        {renderedQuote}
      </div>
      <div style={{ fontFamily: font, fontSize: "1.5em", color: color }}>
        ~{randomAuthor}
      </div>
      {authorMatch && (
        <div>
          Whoa! This is the real author! (Allegedly.)
        </div>
      )}
    </>
  );
};

export default Signature;