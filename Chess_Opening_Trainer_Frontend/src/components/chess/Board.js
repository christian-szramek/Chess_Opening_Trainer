import React, { useState, useEffect } from "react";

import "../../styles/board.css";
import BoardSquare from "./BoardSquare";

const Board = ({ board, perspective, setIsFinished, dnd }) => {
  const getXYPosition = i => {
    const x = perspective === "w" ? i % 8 : Math.abs((i % 8) - 7);
    const y =
      perspective === "w" ? Math.abs(Math.floor(i / 8) - 7) : Math.floor(i / 8);

    return { x, y };
  };

  const isBlack = i => {
    const { x, y } = getXYPosition(i);
    return (x + y) % 2 === 0;
  };

  const getPosition = i => {
    const { x, y } = getXYPosition(i);
    const letter = ["a", "b", "c", "d", "e", "f", "g", "h"][x];
    return `${letter}${y + 1}`;
  };

  const addLabelNumberBlack = key => {
    switch (key) {
      case 7:
        return <div className="square board-label">1</div>;
      case 15:
        return <div className="square board-label">2</div>;
      case 23:
        return <div className="square board-label">3</div>;
      case 31:
        return <div className="square board-label">4</div>;
      case 39:
        return <div className="square board-label">5</div>;
      case 47:
        return <div className="square board-label">6</div>;
      case 55:
        return <div className="square board-label">7</div>;
      case 63:
        return <div className="square board-label">8</div>;

      default:
        return;
    }
  };

  const addLabelNumberWhite = key => {
    switch (key) {
      case 63:
        return <div className="square board-label">1</div>;
      case 55:
        return <div className="square board-label">2</div>;
      case 47:
        return <div className="square board-label">3</div>;
      case 39:
        return <div className="square board-label">4</div>;
      case 31:
        return <div className="square board-label">5</div>;
      case 23:
        return <div className="square board-label">6</div>;
      case 15:
        return <div className="square board-label">7</div>;
      case 7:
        return <div className="square board-label">8</div>;
      default:
        return;
    }
  };

  const addEmptySquare = key => {
    switch (key) {
      case 0:
        return <div className="square"></div>;
      case 8:
        return <div className="square"></div>;
      case 16:
        return <div className="square"></div>;
      case 24:
        return <div className="square"></div>;
      case 32:
        return <div className="square"></div>;
      case 40:
        return <div className="square"></div>;
      case 48:
        return <div className="square"></div>;
      case 56:
        return <div className="square"></div>;

      default:
        return;
    }
  };

  const emptyRow = () => {
    return (
      <React.Fragment>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
      </React.Fragment>
    );
  };

  // return board from black blayers perspective
  if (perspective === "b") {
    return (
      <div className="board">
        <div className="square"></div>
        <div className="square board-label">H</div>
        <div className="square board-label">G</div>
        <div className="square board-label">F</div>
        <div className="square board-label">E</div>
        <div className="square board-label">D</div>
        <div className="square board-label">C</div>
        <div className="square board-label">B</div>
        <div className="square board-label">A</div>
        <div className="square"></div>
        {board
          .flat()
          .reverse()
          .map((piece, i) => (
            <React.Fragment>
              {addEmptySquare(i)}
              <div key={i} className="square" id={i}>
                <BoardSquare
                  piece={piece}
                  black={isBlack(i)}
                  position={getPosition(i)}
                  setIsFinished={setIsFinished}
                />
              </div>
              {addLabelNumberBlack(i)}
            </React.Fragment>
          ))}
        {emptyRow()}
      </div>
    );
  } else {
    // return board from white players perspective
    return (
      <div className="board">
        <div className="square"></div>
        <div className="square board-label">A</div>
        <div className="square board-label">B</div>
        <div className="square board-label">C</div>
        <div className="square board-label">D</div>
        <div className="square board-label">E</div>
        <div className="square board-label">F</div>
        <div className="square board-label">G</div>
        <div className="square board-label">H</div>
        <div className="square"></div>
        {board.flat().map((piece, i) => (
          <React.Fragment>
            {addEmptySquare(i)}
            <div key={i} className="square" id={i}>
              <BoardSquare
                piece={piece}
                black={isBlack(i)}
                position={getPosition(i)}
                setIsFinished={setIsFinished}
              />
            </div>
            {addLabelNumberWhite(i)}
          </React.Fragment>
        ))}
        {emptyRow()}
      </div>
    );
  }
};

export default Board;
