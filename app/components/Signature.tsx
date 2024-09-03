import React from "react";
import type { Signature as SignatureType } from "../models/signature.server";

interface SignatureProps {
  quoteRes: SignatureType;
  randomAuthor: string;
  font: string;
  color: string;
}

const Signature: React.FC<SignatureProps> = ({ quoteRes, randomAuthor, font, color }) => {
  const authorMatch = quoteRes.author === randomAuthor;

  return (
    <>
      <div style={{ fontFamily: font, fontSize: "2em", color: color }}>
        {quoteRes.quote}
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