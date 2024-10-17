import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";

import Square from "./Square";
import Piece from "./Piece";
import Alert from "../Alert";

import { tryMove } from "./ChessBot";

const BoardSquare = ({ piece, black, position, setIsFinished }) => {
  const [illegalMove, setIllegalMove] = useState(false);
  const [wrongMove, setWrongMove] = useState(false);

  const [collect, drop] = useDrop({
    accept: "piece",
    drop: async item => {
      const [fromPosition, type, color] = item.id.split("_");
      const { isFinished, illegalMove, wrongMove } = await tryMove(
        fromPosition,
        position
      );
      if (isFinished) {
        setIsFinished(true);
      }
      if (illegalMove) {
        setIllegalMove(true);
      }
      if (wrongMove) {
        setWrongMove(true);
      }
    },
  });

  // hide illegal move alert after 2 seconds
  useEffect(() => {
    if (illegalMove) {
      setTimeout(() => setIllegalMove(false), 2000);
    }
  }, [illegalMove]);

  // hide wrong move alert after 2 seconds
  useEffect(() => {
    if (wrongMove) {
      setTimeout(() => setWrongMove(false), 2000);
    }
  }, [wrongMove]);

  return (
    <div className="board-square" ref={drop}>
      <Square black={black}>
        {piece && <Piece piece={piece} position={position} />}
      </Square>
      {illegalMove && (
        <Alert
          text={"Illegaler Schachzug"}
          onClose={setIllegalMove}
          severity={"error"}
        />
      )}
      {wrongMove && (
        <Alert
          text={"Falscher Eröffnungszug"}
          onClose={setWrongMove}
          severity={"warning"}
        />
      )}
    </div>
  );
};

export default BoardSquare;
