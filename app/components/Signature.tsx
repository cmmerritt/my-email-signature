import React from "react";
import type { Signature as SignatureType } from "../models/signature.server";

interface SignatureProps {
  quoteRes: SignatureType;
  randomAuthor: string;
}

const Signature: React.FC<SignatureProps> = ({ quoteRes, randomAuthor }) => {
  const authorMatch = quoteRes.author === randomAuthor;

  return (
    <>
      <div style={{ fontFamily: "Papyrus", fontSize: "2em" }}>
        {quoteRes.quote}
      </div>
      <div style={{ fontFamily: "cursive", fontSize: "1.5em" }}>
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