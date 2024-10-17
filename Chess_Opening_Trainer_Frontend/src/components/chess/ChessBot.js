import * as Chess from "chess.js";
import { BehaviorSubject } from "rxjs";

const BOT_TIMEOUT = 500;

const chess = new Chess();
var bot = null;

class Bot {
  constructor(opening, isWhite) {
    this.openingMoves = opening.moves;
    this.isWhite = isWhite;
    this.step = 0;
  }
}

export const chessBotSubject = new BehaviorSubject({
  board: new Chess().board(),
  isFinished: false,
});

// try move takes the dnd input, validates the move and executes it (board update, step increment)
// after that the bot will play the next move from the opening array and also update
export const tryMove = async (from, to) => {
  const legalMove = chess.move({ from, to });
  if (legalMove) {
    // check if move is correct for this opening
    if (!compareMoves({ from, to }, bot.openingMoves[bot.step])) {
      //alert("Zug war nicht korrekt für diese Eröffnung");
      console.log(`Move: from: ${from} to: ${to} was incorrect.`);
      console.log(
        `Correct move is from: ${bot.openingMoves[bot.step].from} to: ${
          bot.openingMoves[bot.step].to
        }.`
      );
      chess.undo();
      return { isFinished: false, illegalMove: false, wrongMove: true };
    } else {
      const step = bot.step;
      // if player performed the last move
      if (step === bot.openingMoves.length - 1) {
        chessBotSubject.next({ board: chess.board(), isFinished: true });
        await new Promise(r => setTimeout(r, BOT_TIMEOUT));
        return { isFinished: true, illegalMove: false, wrongMove: false };
      }
      bot.step++;
      chessBotSubject.next({ board: chess.board(), isFinished: false });
      return await performBotMove();
    }
  } else {
    //alert("illegal move");
    return { isFinished: false, illegalMove: true, wrongMove: false };
  }
};

const compareMoves = (triedMove, openingMove) => {
  if (triedMove.from === openingMove.from && triedMove.to === openingMove.to) {
    return true;
  }
  return false;
};

export const resetBot = () => {
  chess.reset();
  chessBotSubject.next({
    board: chess.board(),
  });
};

const performBotMove = async () => {
  if (bot.step < bot.openingMoves.length) {
    await new Promise(r => setTimeout(r, BOT_TIMEOUT));
    const move = bot.openingMoves[bot.step];
    chess.move({ from: move.from, to: move.to });
    bot.step++;
    chessBotSubject.next({ board: chess.board });
    const step = bot.step;
    // if bot performed the last move
    if (step === bot.openingMoves.length) {
      await new Promise(r => setTimeout(r, BOT_TIMEOUT));
      return { isFinished: true, illegalMove: false, wrongMove: false };
    }
  }
  return { isFinished: false, illegalMove: false, wrongMove: false };
};

export const startBot = async (opening, isWhite) => {
  bot = new Bot(opening, isWhite);
  bot.step = 0;
  if (!isWhite) {
    await performBotMove();
  }
};

export const getCorrectMove = () => {
  if (bot.openingMoves[bot.step]) {
    return {
      from: bot.openingMoves[bot.step].from,
      to: bot.openingMoves[bot.step].to,
    };
  }
};
