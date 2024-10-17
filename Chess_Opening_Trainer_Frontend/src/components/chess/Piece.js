import React from "react";
import { useDrag, DragPreviewImage } from "react-dnd";

const Piece = ({ piece: { type, color }, position }) => {
  const [{ isDragging }, drag, dragPreview] = useDrag({
    type: "piece",
    item: {
      id: `${position}_${type}_${color}`,
    },
    collect: monitor => {
      return {
        isDragging: !!monitor.isDragging(),
      };
    },
  });

  const PIECE_IMG_URL = `http://localhost:3000/chesspieces/Chess_${type}${
    color === "b" ? "d" : "l"
  }t45.svg`;

  return (
    <React.Fragment>
      <DragPreviewImage
        connect={dragPreview}
        src={PIECE_IMG_URL}
        className="piece"
        alt="chess piece image"
      />
      <div
        className="piece-container"
        ref={drag}
        style={{ opacity: isDragging ? 0 : 1 }}
      >
        <img className="piece" src={PIECE_IMG_URL} alt="chess piece image" />
      </div>
    </React.Fragment>
  );
};

export default Piece;
