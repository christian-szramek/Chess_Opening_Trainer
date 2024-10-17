import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@material-ui/core";

import Board from "./Board";
import AfterBotModal from "./AfterBotModal";
import Alert from "../Alert";

import "../../styles/global.css";

import chess_icon from "../../assets/chess_icon.png";

import { getOpening } from "../../api/services/ChessOpenings";

// import chess observer
import {
  chessBotSubject,
  startBot,
  resetBot,
  getCorrectMove,
} from "./ChessBot";

const ChessBotViewer = () => {
  const [opening, setOpening] = useState({});
  // state to start bot after opening got fetched
  const [openingFetched, setOpeningFetched] = useState(false);
  const [board, setBoard] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showCorrectMove, setShowCorrectMove] = useState(false);
  // state to block the change of the move alert when the bot makes its move an
  // this way rerenderes the ChessBotViewer component and also the alert message
  const [changeAlertMessage, setChangeAlertMessage] = useState(true);
  const [alertMessage, setAlertMessage] = useState({ from: "", to: "" });

  // get id and  color from url
  const params = useParams();

  // fetch opening
  useEffect(async () => {
    await getOpening(params.id, setOpening);
    setOpeningFetched(true);
  }, []);

  // start and init chess bot
  useEffect(() => {
    const subscribe = chessBotSubject.subscribe(chessBot => {
      setBoard(chessBot.board);
    });

    const isWhite = params.color === "w" ? true : false;

    if (opening.moves) {
      startBot(opening, isWhite);
    }

    return () => {
      resetBot();
      subscribe.unsubscribe();
    };
  }, [openingFetched]);

  // show after bot modal when opening is completed
  useEffect(() => {
    if (isFinished) {
      setShowModal(true);
    }
  }, [isFinished]);

  // hide help alert after 3 seconds
  useEffect(() => {
    // only change the alert message when the button was clicked, no rerender after that
    if (showCorrectMove && changeAlertMessage) {
      setAlertMessage(getCorrectMove());
      setChangeAlertMessage(false);
      setTimeout(() => {
        setShowCorrectMove(false);
        setChangeAlertMessage(true);
      }, 3000);
    }
  }, [showCorrectMove]);

  return (
    <React.Fragment>
      {showCorrectMove && (
        <Alert
          text={`Nächster Zug ist von ${alertMessage.from} nach ${alertMessage.to}.`}
          onClose={setShowCorrectMove}
          severity={"info"}
        />
      )}
      <Link to="/">
        <img src={chess_icon} alt="icon" className="icon" />
      </Link>
      <div className="help-button">
        <Button variant="outlined" onClick={() => setShowCorrectMove(true)}>
          ?
        </Button>
      </div>
      <div className="container">
        <div className="board-container">
          <Board
            board={board}
            perspective={params.color}
            setIsFinished={setIsFinished}
          />
        </div>
        <AfterBotModal
          showModal={showModal}
          setShowModal={setShowModal}
          openingId={opening.id}
        />
      </div>
    </React.Fragment>
  );
};

export default ChessBotViewer;
