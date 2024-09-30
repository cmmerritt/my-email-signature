import React from "react";

interface GifProps {
  gifUrl: string;
  category: string;
}

const Gif: React.FC<GifProps> = ({ gifUrl, category }) => {
  return (
    <div>
      {gifUrl ? (
        <img src={gifUrl} alt={`GIF for category ${category}`} />
      ) : (
        <div>No GIF found</div>
      )}
    </div>
  );
};

export default Gif;